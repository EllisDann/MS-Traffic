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
Create a `.env.local` file in the `internal-tool` directory with:
```
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
```
