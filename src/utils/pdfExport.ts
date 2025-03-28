
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

export interface ExportPdfOptions {
  filename?: string;
  quality?: number;
  scale?: number;
}

export const exportElementAsPdf = async (
  element: HTMLElement,
  options: ExportPdfOptions = {}
): Promise<boolean> => {
  try {
    const { 
      filename = 'resume.pdf',
      quality = 2, // Higher quality
      scale = 2 // Better resolution for retina displays
    } = options;
    
    toast.info('Preparing your resume for download...', { duration: 3000 });
    
    // Wait a moment for any rendering to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    // Get dimensions for A4 PDF (210mm x 297mm)
    const imgData = canvas.toDataURL('image/jpeg', quality);
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF with A4 dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add image to PDF
    let heightLeft = imgHeight;
    let position = 0;
    
    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Save the PDF
    pdf.save(filename);
    toast.success('Resume downloaded successfully!');
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    toast.error('Failed to download resume. Please try again.');
    return false;
  }
};
