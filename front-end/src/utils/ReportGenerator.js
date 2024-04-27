import { useUserContext } from "../userContext";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportGenerator = () => {
    const user_val = useUserContext();
    const {user} = user_val;

    const generateReport = () => {
        const doc = new jsPDF();
        const tableRows = Object.entries(user).map(([key, val]) => [key, val.toString()])
        // Add heading to PDF
        doc.text('User Report', 10, 10);
    
        // Add table rows to PDF without the heading
        doc.autoTable({
            body: tableRows,
            startY: 20 // Start after the heading
        });
    
        // Save PDF
        doc.save(`${user.first_name}_report.pdf`);
    }    

    return <div className="report-button">
        <a onClick={() => generateReport()}>Generate Report</a>
    </div>
}

export default ReportGenerator;