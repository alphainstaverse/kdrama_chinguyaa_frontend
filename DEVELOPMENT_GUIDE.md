# Development Guide

This guide provides an overview of the project structure and instructions on where to make changes for different aspects of the application.

## Project Structure

-   `.gitignore`: Specifies intentionally untracked files that Git should ignore.
-   `.prettierrc`: Configuration file for Prettier, a code formatter.
-   `next.config.mjs`: Configuration file for Next.js.
-   `package-lock.json`: Records the exact versions of dependencies used in the project.
-   `package.json`: Contains metadata about the project, including dependencies and scripts.
-   `postcss.config.mjs`: Configuration file for PostCSS, a CSS processing tool.
-   `README.md`: Provides an overview of the project and instructions on how to get started.
-   `tsconfig.json`: Configuration file for TypeScript.
-   `data/`: Contains data files used in the project.
    -   `blogs/`: Contains Markdown files for blog posts.
-   `public/`: Contains static assets such as images and fonts.
-   `src/`: Contains the source code for the application.
    -   `app/`: Contains the main application components and pages.
    -   `appData/`: Contains data used throughout the application.
    -   `components/`: Contains reusable UI components.
    -   `services/`: Contains services for fetching data.
    -   `utils/`: Contains utility functions.

## Key Areas for Modification

### Components

The `src/components/` directory contains reusable UI components. To modify or add components, make changes to the files in this directory.

### Data

The `data/` and `src/appData/` directories contain data used in the application. To modify or add data, make changes to the files in these directories.

### Services

The `src/services/` directory contains services for fetching data. To modify or add services, make changes to the files in this directory.

### Styles

The `src/app/globals.css` file contains global styles for the application. To modify or add styles, make changes to this file. This file uses CSS modules.

### Blog Posts

The `data/blogs/` directory contains Markdown files for blog posts. To add a new blog post, create a new Markdown file in this directory. To modify an existing blog post, edit the corresponding Markdown file.

### Configuration

The `next.config.mjs` file contains the configuration for the Next.js application. To modify the application's configuration, make changes to this file.

### Removing the "Resources Library" Section

To remove the "Resources Library" section from the home page, follow these steps:

1.  Open the `src/app/page.tsx` file.
2.  Remove the following line:

    ```
    <Banner title={title} description={description} />
    ```

### Modifying the Layout

To modify the layout to include a large square post and move the "Popular Articles" section, follow these steps:

1.  Create a new component named `FeaturedBlogCard.tsx` in the `src/components/blog/` directory with the following content:

    ```typescript
    import React from 'react'
    import Image from 'next/image'
    import Link from 'next/link'

    interface FeaturedBlogCardProps {
      post: {
        slug: string
        title: string
        shortDescription: string
        cover: string
      }
    }

    const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({ post }) => {
      return (
        <div className="relative h-96 w-full">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6 text-white">
            <Link href={`/blogs/${post.slug}`}>
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm">{post.shortDescription}</p>
            </Link>
          </div>
        </div>
      )
    }

    export default FeaturedBlogCard
    ```

2.  Modify the `src/app/page.tsx` file with the following changes:

    ```typescript
    import { categories, description, faqs, title } from '@/appData'
    import Banner from '@/components/banner/SimpleBanner'
    import BlogList from '@/components/blog/BlogList'
    import BlogCard from '@/components/blog/MinimalCard'
    import CategoryList from '@/components/category/CategoryList'
    import Faq from '@/components/faq/Faq'
    import Footer from '@/components/footer/Footer'
    import Navbar from '@/components/navbar/BlogNavbar'
    import Newsletter from '@/components/newsletter/Newsletter'
    import SectionHeading from '@/components/sectionHeading/ColoredSectionHeading'
    import { getBlogs } from '@/services/blogs'
    import FeaturedBlogCard from '@/components/blog/FeaturedBlogCard'

    export default async function Home() {
      const posts = await getBlogs()

      const featuredPost = posts[0]

      return (
        <>
          <Navbar />

          <div className="mx-auto max-w-6xl px-3">
            <CategoryList categories={categories} />

            <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <SectionHeading
                  title={['Featured', 'Article']}
                  subtitle="Check out our top article"
                />
                {featuredPost && <FeaturedBlogCard post={featuredPost} />}
              </div>

              <div>
                <SectionHeading
                  title={['Popular', 'Articles']}
                  subtitle="Diverse Range of articles related to Artificial Intelligence"
                />

                <BlogList posts={posts} type="horizontal" />
              </div>
            </section>

            <Faq items={faqs} />
            <Newsletter />
          </div>

          <Footer />
        </>
      )
    }
    ```

## Instructions

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Run the development server: `npm run dev`
4.  Open the application in your browser: `http://localhost:3000`
