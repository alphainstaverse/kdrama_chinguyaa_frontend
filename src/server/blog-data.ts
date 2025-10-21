import { promises as fs } from 'fs';
import path from 'path';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

let googleClients: { drive?: any; sheets?: any } = {};

// Lazy initialization (only once per server instance)
export async function getGoogleClients() {
  if (googleClients.drive && googleClients.sheets) return googleClients;

  try {

    const auth = new JWT({
      email: "chat-657@gen-lang-client-0579746492.iam.gserviceaccount.com",
      key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDqDOYtIutBL9g3\nytqbbYk+cSs41LXUve6bvqil6BZrc9LQFGeM07L55iV+HYEtAgYj7XVH9TgG+s5W\nZZGnwTpjWa3xF+RXpnrncm+fu2hxkUWu3j0HxmXGEEuVx+L3lQq4UGEPokjYv6bS\nK20uus6duyQM58TvGU3TwTQWHInxmMV20A4rPNkm83scbfEVbG+qyPJsBql4lt9C\nkoWEnGyEKYaYN20gVb2v0s4wQTV4xCR12saVVeQmkxO4uIje3XfMgYZ5hMyG8X/D\nS7LkHAQoKMXj/LJokQHC+XnOQjp4ifDAh01xoUHukUNz4Ge5T5OYXJarG7IYO0HU\nseuDGrnZAgMBAAECggEAA4B7nuONuGmu2V22fnzZpWoZxuIxBAAlyvNWMqVInk5k\nMj1lDz03Epz8pOi1PzlvYqfxwCQo2U1QhHXXcTaMD/UOZ30RvZBG+MZo/AG0HlpQ\nYJjbzFaN4Y+hbVDbv+9vhQ3lrwYzJ6+kH1fCbLv+zbQ4QUt2dt1eoU7AceaJILH1\nuCejUSSlkjNNRGYkvuhDJXdAvun3n3ih+GbkSASGYn7l1tuKfToqHiWGYHbjkcPg\ni/DGSQIqr0ascwWiRhXQo3FAw3DsAE5+gSzq9ggDbhKA+1QQTgfabgo36M9WWIEH\npC0GL5tsctOIH8LmcxDBg/1PRng0uEBamI3o2MVDwQKBgQD4ZjmeZGuosAew0xBN\nSVKGD26/sR39xQZ7uYGni7XNT0LlGkoy3x8cR0HYyeFiv0/3O+wUS2h13SQwj660\nYLYDZGCt/vNvaZxFnSCk1kR3Fw5e+YP9XqfXE2NWP8vloLeAZ9D7rPvfdix7Lxkj\n2EFDpZddzjErXCVKaHieKYmXXwKBgQDxNkZ2b2ear653HrQqiNq4EvfnuLVvWpVi\nEmN8ZGa9mPeM5M0/uSLPkwcf/qjD7wGYr73HmqrTWvsK/1HYmBbH64NnERopeXlX\nebaBpdR79n21Dr+qWO/osyWXuewb5WlgEa0M1FZzosRij3nbrtbQM4ZPJibb8tq+\nMoG8/F9RxwKBgDUrTHIG9LRq2XqT8w1YAH4Jl58Yfl7vaW/aSVJfqU6FBMCdW/x/\nnd0js4h/zeqhILC+9s1xRq7T4wcx+idJ/CvFtJwJ0nmqlXShKXefFZCYMs9JgWMe\ne7ahw8WWakKAoEav8h+s60ztsp+7eRofE/ky3K+LjyLE2oaOziKsqXLpAoGAbUWS\nLCsRuzClD4+YPMCcnNDy/0Vc5CIcFD6SVRLCvFdkpa4tERYUoAZSLvtVhtVqWroa\ndicqBe9sVLIPaNiVUWHuuC02Nd2yy572v8rY9INYtUIGL+x0Wm11tUNjo8uMrhmz\n1GEI/P+aia/Hm26cH9uHl6mH5xIgaBNHVM7be5cCgYEAqhjgZ3WsmtCZJq2KDZc7\nDSAi/1koenB+J/lxFN49L9IYd97MnNWp5leDiboKLw2RQDEGHT4HIjDDIx2LanLg\n3eEo9ycrUroha9u96Oqjc3nAegLgR4bqzkCQRSxHbVUUhLsNsO91oukrvYEkdFkE\n1FTtWC4NRMGagp26BB0GpVY=\n-----END PRIVATE KEY-----\n",
      scopes: [
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/spreadsheets.readonly',
      ],
    });

    googleClients.drive = google.drive({ version: 'v3', auth });
    googleClients.sheets = google.sheets({ version: 'v4', auth });
    return googleClients;
  } catch (error) {
    console.error('Failed to initialize Google clients:', error);
    throw new Error('Google API initialization failed.');
  }
}

const SPREADSHEET_ID = '1U1b9OeiGvNGOan3bWzRIkLwQQPi20Va4-TP0YgWp9K4';
const SHEET_RANGE = 'Sheet1!A:G'; // Assuming headers are in row 1, data starts from row 2

export async function getAllBlogMetadataFromSheet() {
  try {
    const { sheets } = await getGoogleClients();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    const headers = rows[0];
    const allBlogsMetadata = rows.slice(1).map((row: string[]) => {
      const blog: any = {};
      headers.forEach((header: string, index: number) => {
        blog[header] = row[index];
      });
      blog.isGoogleDriveFile = !!blog.bodyContentFile;
      return blog;
    });

    return allBlogsMetadata;
  } catch (error) {
    console.error('Error fetching all blog metadata from Google Sheet:', error);
    throw new Error('Failed to fetch blog metadata.');
  }
}
