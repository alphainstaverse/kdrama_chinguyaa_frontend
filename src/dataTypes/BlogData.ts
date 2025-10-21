export class BlogData {
  title: string;
  shortDescription: string;
  publishedDate: string;
  slug: string;
  category: string;
  coverImage?: string;
  bodyContentFile?: string; // New field to store the markdown file name
  bodyContent?: string; // Optional field for the actual content
  estimatedTimeToRead?: string;
  isDirectusContent?: boolean; // New field to indicate if content is from Directus

  constructor(data: {
    title: string;
    shortDescription: string;
    publishedDate: string;
    slug: string;
    category: string;
    coverImage?: string;
    bodyContentFile?: string;
    bodyContent?: string;
    estimatedTimeToRead?: string;
    isDirectusContent?: boolean;
  }) {
    this.title = data.title;
    this.shortDescription = data.shortDescription;
    this.publishedDate = data.publishedDate;
    this.slug = data.slug;
    this.category = data.category;
    this.coverImage = data.coverImage;
    this.bodyContentFile = data.bodyContentFile;
    this.bodyContent = data.bodyContent;
    this.estimatedTimeToRead = data.estimatedTimeToRead;
    this.isDirectusContent = data.isDirectusContent;
  }
}
