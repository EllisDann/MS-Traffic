import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Dashboard({ isLoggedIn, logout }) {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF or DOCX file');
        setFile(null);
        return;
      }
      
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError('');
      setReport('');
    }
  };

  const handleProcess = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsProcessing(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/process-report', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setReport(data.report);
      } else {
        setError(data.error || 'Failed to process the file');
      }
    } catch (err) {
      setError('An error occurred while processing the file');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(report);
  };

  const downloadReport = () => {
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'road-safety-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isLoggedIn) {
    return null; // Will redirect immediately
  }

  return (
    <div className="dashboard-container">
      <Head>
        <title>Dashboard - M&S Traffic AI Report Tool</title>
        <meta name="description" content="Generate professional road safety reports" />
      </Head>

      <header className="dashboard-header">
        <div className="header-content">
          <h1>M&S Traffic AI Report Tool</h1>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="upload-section">
          <h2>Upload Audit File</h2>
          <div className="upload-card">
            <div className="file-input-wrapper">
              <input 
                type="file" 
                id="file-upload" 
                accept=".pdf,.docx" 
                onChange={handleFileChange}
                disabled={isProcessing}
              />
              <label htmlFor="file-upload" className="file-input-label">
                {file ? file.name : 'Choose PDF or DOCX file'}
              </label>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              onClick={handleProcess} 
              disabled={isProcessing || !file}
              className="process-button"
            >
              {isProcessing ? 'Processing...' : 'Generate Report'}
            </button>
          </div>
        </div>

        {report && (
          <div className="report-section">
            <h2>Generated Report</h2>
            <div className="report-actions">
              <button onClick={copyToClipboard} className="action-button">
                Copy to Clipboard
              </button>
              <button onClick={downloadReport} className="action-button">
                Download as Text
              </button>
            </div>
            <div className="report-output">
              <pre>{report}</pre>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background-color: #f8f9fa;
        }
        
        .dashboard-header {
          background: linear-gradient(135deg, #2c3e50, #4a6491);
          color: white;
          padding: 20px 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .header-content h1 {
          margin: 0;
        }
        
        .logout-button {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s;
        }
        
        .logout-button:hover {
          background-color: #c0392b;
        }
        
        .dashboard-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        
        .upload-section, .report-section {
          margin-bottom: 40px;
        }
        
        .upload-section h2, .report-section h2 {
          color: #2c3e50;
          margin-bottom: 20px;
        }
        
        .upload-card {
          background: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        
        .file-input-wrapper {
          margin-bottom: 20px;
        }
        
        .file-input-wrapper input {
          display: none;
        }
        
        .file-input-label {
          display: block;
          padding: 15px;
          border: 2px dashed #ddd;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.3s;
        }
        
        .file-input-label:hover {
          border-color: #4a6491;
        }
        
        .error-message {
          color: #e74c3c;
          margin-bottom: 15px;
          text-align: center;
        }
        
        .process-button {
          width: 100%;
          padding: 15px;
          background-color: #4a6491;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .process-button:disabled {
          background-color: #bdc3c7;
          cursor: not-allowed;
        }
        
        .process-button:hover:not(:disabled) {
          background-color: #3a5070;
        }
        
        .report-actions {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .action-button {
          padding: 10px 15px;
          background-color: #2c3e50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s;
        }
        
        .action-button:hover {
          background-color: #1a252f;
        }
        
        .report-output {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          max-height: 500px;
          overflow-y: auto;
        }
        
        .report-output pre {
          white-space: pre-wrap;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </div>
  );
}