import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { TestResult } from '../types/testTypes';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export class PDFReportService {
  private static addHeader(pdf: jsPDF, testName: string, completedAt: Date): void {
    // Add logo/branding area
    pdf.setFillColor(59, 130, 246); // Blue color
    pdf.rect(0, 0, 210, 25, 'F');
    
    // Company name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Z+ Counselling', 15, 16);
    
    // Test name
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${testName} - Assessment Report`, 105, 16, { align: 'center' });
    
    // Date
    pdf.setFontSize(10);
    pdf.text(`Generated: ${completedAt.toLocaleDateString()}`, 195, 16, { align: 'right' });
    
    // Reset colors
    pdf.setTextColor(0, 0, 0);
  }

  private static addFooter(pdf: jsPDF, pageNumber: number): void {
    const pageHeight = pdf.internal.pageSize.height;
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Page ${pageNumber}`, 105, pageHeight - 10, { align: 'center' });
    pdf.text('© 2025 Z+ Counselling - Confidential Assessment Report', 105, pageHeight - 5, { align: 'center' });
  }

  private static addPerformanceOverview(pdf: jsPDF, result: TestResult): number {
    let yPosition = 35;
    
    // Title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 51, 51);
    pdf.text('Performance Overview', 15, yPosition);
    yPosition += 15;
    
    // Overall score box
    pdf.setFillColor(245, 245, 245);
    pdf.rect(15, yPosition, 180, 30, 'F');
    pdf.setDrawColor(200, 200, 200);
    pdf.rect(15, yPosition, 180, 30);
    
    // Score details
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(59, 130, 246);
    pdf.text(`${result.percentage.toFixed(1)}%`, 25, yPosition + 20);
    
    pdf.setFontSize(12);
    pdf.setTextColor(51, 51, 51);
    pdf.text('Overall Score', 25, yPosition + 28);
    
    // Grade
    const gradeColor = this.getGradeColor(result.grade);
    pdf.setFillColor(gradeColor.r, gradeColor.g, gradeColor.b);
    pdf.rect(80, yPosition + 8, 30, 15, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Grade: ${result.grade}`, 95, yPosition + 18, { align: 'center' });
    
    // Status
    pdf.setTextColor(51, 51, 51);
    pdf.setFontSize(12);
    pdf.text(`Status: ${result.isPassed ? 'PASSED' : 'FAILED'}`, 120, yPosition + 15);
    pdf.text(`Total Questions: ${result.totalQuestions}`, 120, yPosition + 25);
    
    yPosition += 40;
    
    // Quick stats
    const stats = [
      { label: 'Correct Answers', value: result.correctAnswers.toString(), color: { r: 16, g: 185, b: 129 } },
      { label: 'Incorrect Answers', value: result.incorrectAnswers.toString(), color: { r: 239, g: 68, b: 68 } },
      { label: 'Time Taken', value: this.formatTime(result.timeSpent), color: { r: 139, g: 92, b: 246 } },
      { label: 'Points Earned', value: `${result.pointsEarned}/${result.totalPoints}`, color: { r: 245, g: 158, b: 11 } }
    ];
    
    const boxWidth = 42;
    const boxHeight = 25;
    const spacing = 5;
    
    stats.forEach((stat, index) => {
      const xPos = 15 + (index * (boxWidth + spacing));
      
      // Box background
      pdf.setFillColor(stat.color.r, stat.color.g, stat.color.b, 0.1);
      pdf.rect(xPos, yPosition, boxWidth, boxHeight, 'F');
      pdf.setDrawColor(stat.color.r, stat.color.g, stat.color.b);
      pdf.rect(xPos, yPosition, boxWidth, boxHeight);
      
      // Value
      pdf.setTextColor(stat.color.r, stat.color.g, stat.color.b);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(stat.value, xPos + boxWidth/2, yPosition + 12, { align: 'center' });
      
      // Label
      pdf.setTextColor(51, 51, 51);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(stat.label, xPos + boxWidth/2, yPosition + 20, { align: 'center' });
    });
    
    return yPosition + 35;
  }

  private static addCategoryAnalysis(pdf: jsPDF, result: TestResult, startY: number): number {
    let yPosition = startY;
    
    // Title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 51, 51);
    pdf.text('Category Analysis', 15, yPosition);
    yPosition += 10;
    
    // Table data
    const tableData = result.categoryResults.map(category => [
      category.category.replace(/([A-Z])/g, ' $1').trim(),
      category.totalQuestions.toString(),
      category.correctAnswers.toString(),
      category.incorrectAnswers.toString(),
      `${category.percentage.toFixed(1)}%`,
      this.formatTime(category.timeSpent)
    ]);
    
    // Create table
    pdf.autoTable({
      startY: yPosition,
      head: [['Category', 'Total', 'Correct', 'Incorrect', 'Score %', 'Time']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [51, 51, 51]
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 25, halign: 'center' },
        5: { cellWidth: 25, halign: 'center' }
      },
      margin: { left: 15, right: 15 }
    });
    
    return (pdf as any).lastAutoTable.finalY + 10;
  }

  private static addInsights(pdf: jsPDF, result: TestResult, startY: number): number {
    let yPosition = startY;
    
    // Check if we need a new page
    if (yPosition > 200) {
      pdf.addPage();
      this.addHeader(pdf, result.testName, result.completedAt);
      this.addFooter(pdf, 2);
      yPosition = 35;
    }
    
    // Strengths section
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(16, 185, 129);
    pdf.text('✓ Strengths', 15, yPosition);
    yPosition += 8;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(51, 51, 51);
    
    result.strengths.forEach(strength => {
      const lines = pdf.splitTextToSize(`• ${strength}`, 170);
      pdf.text(lines, 20, yPosition);
      yPosition += lines.length * 4 + 2;
    });
    
    yPosition += 5;
    
    // Weaknesses section
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(239, 68, 68);
    pdf.text('⚠ Areas for Improvement', 15, yPosition);
    yPosition += 8;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(51, 51, 51);
    
    result.weaknesses.forEach(weakness => {
      const lines = pdf.splitTextToSize(`• ${weakness}`, 170);
      pdf.text(lines, 20, yPosition);
      yPosition += lines.length * 4 + 2;
    });
    
    yPosition += 5;
    
    // Recommendations section
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(59, 130, 246);
    pdf.text('💡 Recommendations', 15, yPosition);
    yPosition += 8;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(51, 51, 51);
    
    result.recommendations.forEach(recommendation => {
      const lines = pdf.splitTextToSize(`• ${recommendation}`, 170);
      pdf.text(lines, 20, yPosition);
      yPosition += lines.length * 4 + 2;
    });
    
    return yPosition;
  }

  private static addDetailedAnswers(pdf: jsPDF, result: TestResult, startY: number): void {
    let yPosition = startY + 10;
    
    // Check if we need a new page
    if (yPosition > 220) {
      pdf.addPage();
      this.addHeader(pdf, result.testName, result.completedAt);
      this.addFooter(pdf, 3);
      yPosition = 35;
    }
    
    // Title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 51, 51);
    pdf.text('Detailed Answer Review', 15, yPosition);
    yPosition += 10;
    
    // Table data
    const tableData = result.detailedAnswers.slice(0, 10).map((answer, index) => [
      (index + 1).toString(),
      answer.question.substring(0, 50) + (answer.question.length > 50 ? '...' : ''),
      answer.userAnswer.substring(0, 30) + (answer.userAnswer.length > 30 ? '...' : ''),
      answer.isCorrect ? '✓' : '✗',
      answer.pointsEarned.toString(),
      this.formatTime(answer.timeSpent)
    ]);
    
    // Create table
    pdf.autoTable({
      startY: yPosition,
      head: [['#', 'Question', 'Your Answer', 'Result', 'Points', 'Time']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [51, 51, 51],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [51, 51, 51]
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 70 },
        2: { cellWidth: 50 },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 15, halign: 'center' },
        5: { cellWidth: 20, halign: 'center' }
      },
      margin: { left: 15, right: 15 }
    });
  }

  private static getGradeColor(grade: string): { r: number; g: number; b: number } {
    const gradeColors = {
      'A+': { r: 16, g: 185, b: 129 },
      'A': { r: 16, g: 185, b: 129 },
      'B+': { r: 59, g: 130, b: 246 },
      'B': { r: 59, g: 130, b: 246 },
      'C+': { r: 245, g: 158, b: 11 },
      'C': { r: 245, g: 158, b: 11 },
      'D': { r: 249, g: 115, b: 22 },
      'F': { r: 239, g: 68, b: 68 }
    };
    return gradeColors[grade as keyof typeof gradeColors] || { r: 128, g: 128, b: 128 };
  }

  private static formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  public static async generatePDFReport(result: TestResult): Promise<void> {
    const pdf = new jsPDF();
    
    // Add header
    this.addHeader(pdf, result.testName, result.completedAt);
    
    // Add performance overview
    let currentY = this.addPerformanceOverview(pdf, result);
    
    // Add category analysis
    currentY = this.addCategoryAnalysis(pdf, result, currentY);
    
    // Add insights
    currentY = this.addInsights(pdf, result, currentY);
    
    // Add detailed answers
    this.addDetailedAnswers(pdf, result, currentY);
    
    // Add footer to first page
    this.addFooter(pdf, 1);
    
    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 10);
    const testNameClean = result.testName.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${testNameClean}_Report_${timestamp}.pdf`;
    
    // Download the PDF
    pdf.save(filename);
  }

  public static async generateDashboardScreenshot(result: TestResult): Promise<void> {
    const dashboardElement = document.getElementById('test-result-dashboard');
    if (!dashboardElement) {
      console.error('Dashboard element not found');
      return;
    }

    try {
      const canvas = await html2canvas(dashboardElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add header
      this.addHeader(pdf, `${result.testName} - Dashboard View`, result.completedAt);
      
      // Add the screenshot
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 25, imgWidth, imgHeight);
      
      // Add footer
      this.addFooter(pdf, 1);
      
      // Generate filename
      const timestamp = new Date().toISOString().slice(0, 10);
      const testNameClean = result.testName.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `${testNameClean}_Dashboard_${timestamp}.pdf`;
      
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating dashboard screenshot:', error);
      // Fallback to regular report
      this.generatePDFReport(result);
    }
  }
}

export default PDFReportService;