# 🛍️ My Marketplace

![App Preview](https://imgix.cosmicjs.com/896f9970-453d-11f1-a3ff-65bbafb72c6d-autopilot-photo-1588850561407-ed78c282e89b-1777626602577.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, fully responsive e-commerce marketplace built with Next.js 16 and Cosmic CMS. Inspired by The Souled Store's mobile shopping experience, this application features product listings with variants, category browsing, seller profiles, and customer reviews.

## ✨ Features

- 🛒 **Product Catalog** — Browse products with sizes, colors, and pricing
- 🏷️ **Category Browsing** — Shop by category with beautiful category pages
- 👤 **Seller Profiles** — Verified seller pages with bios and product listings
- ⭐ **Customer Reviews** — Star ratings and authentic customer feedback
- 🎨 **Modern UI** — Bold, mobile-first design inspired by The Souled Store
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🔥 **Sale Prices** — Highlighted discounts on selected products
- ⚡ **Server-Rendered** — Fast page loads with Next.js Server Components

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69f46d7ec27d356ff5002577&clone_repository=69f46eafc27d356ff50025c4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online marketplace with product listings, seller profiles, categories, and customer reviews. User instructions: An fully functional and responsive e-commerce store with products, categories, variants, and customer reviews, The user is rebuilding an existing website and provided these design notes: inspired by the souled store mobile store design. Factor these preferences into the content structure."

### Code Generation Prompt

> Build a Next.js application for an online business called "My Marketplace". The content is managed in Cosmic CMS with the following object types: categories, sellers, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: An fully functional and responsive e-commerce store with products, categories, variants, and customer reviews. The user is rebuilding an existing website and wants these design improvements: inspired by the souled store mobile store design.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Next.js 16** — React framework with App Router
- **React 19** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Cosmic CMS** — Headless content management
- **Bun** — Package manager and runtime

## 🚀 Getting Started

### Prerequisites

- Bun installed ([install](https://bun.sh))
- Cosmic account ([sign up](https://www.cosmicjs.com))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-marketplace

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Add your Cosmic credentials

# Run the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💎 Cosmic SDK Examples

```typescript
// Fetch all products with related data
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1);

// Fetch a single product by slug
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'product-slug' })
  .depth(1);

// Fetch reviews for a specific product
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .depth(1);
```

## 🌐 Cosmic CMS Integration

This app integrates with the following Cosmic object types:

- **Categories** — Product categorization
- **Sellers** — Verified seller profiles
- **Products** — Full product catalog with variants
- **Reviews** — Customer ratings and feedback

Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## 📦 Deployment

### Vercel
1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Connect to [Netlify](https://netlify.com)
3. Add environment variables in site settings
4. Deploy!

<!-- README_END -->