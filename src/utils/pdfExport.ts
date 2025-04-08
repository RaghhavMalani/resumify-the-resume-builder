
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

export interface ExportPdfOptions {
  filename?: string;
  quality?: number;
  scale?: number;
  format?: string;
  pdfOptions?: any;
}

export const exportElementAsPdf = async (
  element: HTMLElement,
  options: ExportPdfOptions = {}
): Promise<boolean> => {
  try {
    const { 
      filename = 'resume.pdf',
      quality = 4, // Higher quality (increased from 2)
      scale = 3, // Better resolution for retina displays (increased from 2)
      format = 'a4',
      pdfOptions = {}
    } = options;
    
    toast.info('Preparing your resume for download...', { duration: 3000 });
    
    // Wait a moment for any rendering to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create canvas from the element with improved settings
    const canvas = await html2canvas(element, {
      scale,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      imageTimeout: 15000, // Increased timeout for better image rendering
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (document, clonedElement) => {
        // Make adjustments to the clone for better printing
        const adjustStyles = (el: Element) => {
          if (el instanceof HTMLElement) {
            // Ensure text is rendered at full quality
            if (window.getComputedStyle(el).fontSize) {
              // Using setAttribute instead of directly setting properties that don't exist on CSSStyleDeclaration
              el.style.setProperty('font-smoothing', 'antialiased');
              el.style.setProperty('-webkit-font-smoothing', 'antialiased');
              el.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
            }
          }
          
          // Process child elements
          Array.from(el.children).forEach(adjustStyles);
        };
        
        adjustStyles(clonedElement);
      }
    });
    
    // Get dimensions for PDF
    const imgData = canvas.toDataURL('image/jpeg', quality);
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF with specified dimensions and improved settings
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      ...pdfOptions
    });
    
    // Add image to PDF
    let heightLeft = imgHeight;
    let position = 0;
    
    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }
    
    // Set PDF metadata for better ATS compatibility
    pdf.setProperties({
      title: filename.replace('.pdf', ''),
      subject: 'Professional Resume',
      creator: 'Resumify',
      keywords: 'resume, curriculum vitae, professional',
      author: 'Resumify Resume Builder'
    });
    
    // Save the PDF with enhanced quality
    pdf.save(filename);
    toast.success('Resume downloaded successfully!');
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    toast.error('Failed to download resume. Please try again.');
    return false;
  }
};
