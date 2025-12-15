# M&S Traffic - Road Safety Audits

This repository contains two separate systems for M&S Traffic:

## 1. Public Website (`public-website` directory)

A one-page marketing website for M&S Traffic that explains their road safety audit services and allows visitors to contact the business.

Features:
- Static HTML/CSS/JS implementation
- Mobile-responsive design
- SEO-friendly markup
- Netlify Forms integration for contact submissions
- Deployable to Netlify

## 2. Internal AI Report Tool (`internal-tool` directory)

A private internal tool for the business owner to upload audit files and generate professional road safety reports using AI.

Features:
- Next.js frontend with protected routes
- Single-user authentication system
- PDF and DOCX file upload processing
- AI-powered report generation using OpenAI
- Secure environment variable management
- Deployable to Vercel

## Setup Instructions

### Public Website
1. Upload the contents of the `public-website` directory to Netlify
2. Configure Netlify Forms for the contact form
3. Point DNS from Fasthosts to Netlify

### Internal AI Report Tool
1. Navigate to the `internal-tool` directory
2. Install dependencies: `npm install`
3. Create a `.env.local` file with required environment variables
4. Run the development server: `npm run dev`
5. For production deployment, push to GitHub and connect to Vercel

## Environment Variables (Internal Tool)

Create a `.env.local` file in the `internal-tool` directory with:
```
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
```