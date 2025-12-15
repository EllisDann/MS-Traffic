import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import OpenAI from 'openai';

// Configure formidable to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the form data
    const form = formidable({ multiples: false });
    
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Check if a file was uploaded
    if (!files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadedFile = files.file;
    
    // Read the file
    const fileBuffer = await fs.readFile(uploadedFile.filepath);
    
    // Extract text from the file based on its type
    let extractedText = '';
    
    if (uploadedFile.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(fileBuffer);
      extractedText = pdfData.text;
    } else if (uploadedFile.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      extractedText = result.value;
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Please upload a PDF or DOCX file.' });
    }

    // Validate that we have text to process
    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract text from the uploaded file' });
    }

    // Limit the length of text to prevent excessive API usage
    if (extractedText.length > 50000) {
      extractedText = extractedText.substring(0, 50000);
    }

    // Process the text with OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
      Act as a professional road safety audit expert in Australia. 
      Review the following road safety audit content and rewrite it as a professional, structured report.
      
      Requirements:
      - Use clear, formal language appropriate for professional reports
      - Structure the content logically with headings and sections
      - Improve clarity, tone, and compliance language
      - Do not hallucinate facts - base all output strictly on the provided content
      - Format the report professionally
      
      Content to review:
      ${extractedText}
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a professional road safety audit expert in Australia.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.3,
    });

    const report = completion.choices[0].message.content;

    res.status(200).json({ report });
  } catch (error) {
    console.error('Error processing report:', error);
    res.status(500).json({ error: 'Failed to process the file. Please try again.' });
  }
}