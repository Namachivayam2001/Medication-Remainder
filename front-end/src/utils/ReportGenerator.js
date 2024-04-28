import { useUserContext } from "../userContext";
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportGenerator = () => {
    const user_val = useUserContext();
    const {user} = user_val;

    const generateReport = async() => {
        try {
            const doc = new jsPDF();
            const tableRows = Object.entries(user).map(([key, val]) => {
                if(key === 'dob'){
                    const date = new Date(user.dob);
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 as getMonth() returns 0-based month
                    const day = date.getDate().toString().padStart(2, '0');
                    return [`DOB`, `${day}/${month}/${year}`];
                } else {
                    return [key, val.toString()];
                }
            })
            // Get width of the document
            const docWidth = doc.internal.pageSize.width;

            // Add heading to PDF
            const heading = `${user.first_name} Report`;
            const textDimensions = doc.getTextDimensions(heading);
            const headingX = (docWidth - textDimensions.w) / 2;
            doc.text(heading, headingX, 10);
        
            // Add table rows to PDF without the heading
            doc.autoTable({
                body: tableRows,
                startY: 20 // Start after the heading
            });
        
            // Save PDF
            await doc.save(`${user.first_name}_report.pdf`)
            toast.success('Document ready to downloaded!', {position: "top-left"})
        } catch (error) {
            console.error('Error generating report:', error);
            toast.error('Document download failed!');
        }
    }    

    return <div className="report-button">
        <a onClick={() => generateReport()}>Generate Report</a>
    </div>
}

export default ReportGenerator;