
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
    
    // Wait for rendering to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Hide all UI controls, tooltips, and non-resume elements before capturing
    const elementsToHide = element.querySelectorAll('.resume-controls, button, .tooltip, [role="tooltip"], [data-radix-popper-content-wrapper], .ai-enhancer, .popup');
    
    // Save original display states
    const originalDisplayStates = new Map<HTMLElement, string>();
    elementsToHide.forEach(el => {
      if (el instanceof HTMLElement) {
        originalDisplayStates.set(el, el.style.display);
        el.style.display = 'none';
      }
    });
    
    // Create canvas with improved settings
    const canvas = await html2canvas(element, {
      scale,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      imageTimeout: 15000,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (document, clonedElement) => {
        // In the clone, remove any UI elements that shouldn't be in the PDF
        const elementsToRemove = clonedElement.querySelectorAll(
          '.controls, .action-buttons, .zoom-controls, button, .tooltip, ' +
          '[role="tooltip"], [data-radix-popper-content-wrapper], .ai-enhancer, ' +
          '.popup, .preview-header, .preview-controls'
        );
        
        elementsToRemove.forEach(el => {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
        
        // Make sure the resume has proper styling
        clonedElement.style.backgroundColor = '#ffffff';
        
        // Find the actual resume document in the clone
        const resumeDocument = clonedElement.querySelector('.resume-document');
        if (resumeDocument instanceof HTMLElement) {
          // Ensure the resume document takes up the full page
          resumeDocument.style.width = '100%';
          resumeDocument.style.height = 'auto';
          resumeDocument.style.margin = '0';
          resumeDocument.style.padding = '0';
          resumeDocument.style.overflow = 'hidden';
        }
        
        // Adjust text styling for better quality
        const adjustStyles = (el: Element) => {
          if (el instanceof HTMLElement) {
            if (window.getComputedStyle(el).fontSize) {
              el.style.setProperty('font-smoothing', 'antialiased');
              el.style.setProperty('-webkit-font-smoothing', 'antialiased');
              el.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
              
              // Ensure proper text rendering
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
    
    // Restore original display states
    originalDisplayStates.forEach((display, element) => {
      element.style.display = display;
    });
    
    // Calculate dimensions for PDF
    const imgData = canvas.toDataURL('image/jpeg', quality / 10);
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF with specified dimensions
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
