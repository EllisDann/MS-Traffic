# M&S Traffic Internal AI Report Tool

This is the private internal tool for M&S Traffic to generate professional road safety reports using AI.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file in the root directory with the following environment variables:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Access the application at `http://localhost:3000`

## Deployment

To deploy to Vercel:

1. Push the code to a GitHub repository
2. Connect the repository to Vercel
3. Set the environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
4. Configure the domain to use `ai.mstraffic.co.uk`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key for accessing GPT models | Yes |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Password for accessing the admin dashboard | Yes |

## Usage

1. Navigate to the login page
2. Enter the admin password
3. Upload a PDF or DOCX file containing road safety audit information
4. Click "Generate Report" to process the file with AI
5. View, copy, or download the generated professional report

## Security

- All API keys are stored securely in environment variables
- File uploads are validated for type and size
- Authentication is required to access the dashboard
- HTTPS is enforced in production