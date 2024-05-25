// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';


const Resume = () => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
    <div
      style={{
        border: '5px solid #2566e8',
        height: '90vh',
      }}
    >
      <Viewer fileUrl="/resume.pdf" />
    </div>
    </Worker>
  )
};

export default Resume;
