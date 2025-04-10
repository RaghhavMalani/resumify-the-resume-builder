
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
      quality = 5, // Higher quality
      scale = 4, // Better resolution for retina displays
      format = 'a4',
      pdfOptions = {}
    } = options;
    
    toast.info('Preparing your resume for download...', { duration: 3000 });
    
    // Wait a moment for any rendering to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Hide any tooltips or popups before capturing
    const tooltips = document.querySelectorAll('.tooltip, [role="tooltip"], [data-radix-popper-content-wrapper]');
    tooltips.forEach(tooltip => {
      if (tooltip instanceof HTMLElement) {
        tooltip.style.display = 'none';
      }
    });
    
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
        // Remove any popups or tooltips from the clone
        const popups = clonedElement.querySelectorAll('.popup, .tooltip, [role="tooltip"], [data-radix-popper-content-wrapper]');
        popups.forEach(popup => {
          if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
          }
        });
        
        // Add a white background to ensure it prints properly
        clonedElement.style.backgroundColor = '#ffffff';
        
        // Make adjustments to the clone for better printing
        const adjustStyles = (el: Element) => {
          if (el instanceof HTMLElement) {
            // Ensure text is rendered at full quality
            if (window.getComputedStyle(el).fontSize) {
              el.style.setProperty('font-smoothing', 'antialiased');
              el.style.setProperty('-webkit-font-smoothing', 'antialiased');
              el.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
              
              // Add extra spacing to prevent text overlap
              if (el.tagName === 'DIV' && el.classList.contains('resume-section')) {
                el.style.setProperty('margin-bottom', '15px');
              }
              
              // Fix text overlap by enforcing line height
              el.style.setProperty('line-height', '1.5');
              el.style.setProperty('letter-spacing', '0.02em');
            }
          }
          
          // Process child elements
          Array.from(el.children).forEach(adjustStyles);
        };
        
        adjustStyles(clonedElement);
      }
    });
    
    // Restore any hidden tooltips
    tooltips.forEach(tooltip => {
      if (tooltip instanceof HTMLElement) {
        tooltip.style.display = '';
      }
    });
    
    // Get dimensions for PDF
    const imgData = canvas.toDataURL('image/jpeg', quality / 10); // Normalize quality to be between 0-1
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
      keywords: 'resume, curriculum vitae, professional, career, job application',
      author: 'Resumify Resume Builder'
    });
    
    // Add custom ATS-friendly metadata
    pdf.setDocumentProperties({
      title: filename.replace('.pdf', ''),
      subject: 'Professional Resume',
      creator: 'Resumify',
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
