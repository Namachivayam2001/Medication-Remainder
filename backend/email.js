const nodemailer = require('nodemailer');

module.exports = (to_email, is_guardian, user_name) => {
    let mailOptions = {};
    
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'newtonremo143@gmail.com', 
            pass: 'mlae tpbh kevr owvp' 
        }
    });
    
    if(!is_guardian){
        // Email content
        mailOptions = {
            from: 'newtonremo143@gmail.com',
            to: to_email,
            subject: ` Medication Reminder -${user_name}`,
            text: `Dear ${user_name},
                
        I hope this email finds you well. This is a friendly reminder about your upcoming medication.
        
        Reminder Message:
        Please take your medication as prescribed by your healthcare provider. It is crucial to adhere to your medication schedule for your well-being.
        
        Guardian Notification:
        This email is a part of our reminder service. If you miss five consecutive reminders, an alert email will be sent to your designated guardian's email address.
        
        Thank you for prioritizing your health!

        Best regards,

        Medi Remaind team
        Medi Remaind              
            `,
        };
    }else {
        // Email content
        mailOptions = {
            from: 'newtonremo143@gmail.com',
            to: to_email,
            subject: ` Medication Alert for ${user_name}`,
            text: `Dear Guardian of ${user_name},
                
        I hope this message finds you well. We are writing to inform you about a critical matter concerning the health of ${user_name}.
                
        Medication Alert:
        Our medication reminder system has detected that ${user_name} has missed their scheduled medication for the past five instances. 
        
        Possible Consequences:
        Skipping medication can have adverse effects on ${user_name}'s health, as prescribed medications are vital for managing their medical condition.
        
        Recommended Action:
        We strongly advise you to reach out to ${user_name} immediately to ensure they take their medication as prescribed. Additionally, consider consulting with their healthcare provider to discuss any potential adjustments to the medication plan.
        
        Your Assistance is Crucial:
        Your prompt attention to this matter is crucial for ${user_name}'s well-being. We appreciate your cooperation and understanding.
        
        Thank you for being a part of Medi Remaind
        Best regards
        Medi Remaind team
        Medi Remaind              
            `
        };
    }

    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error('Error:', error);
        } else {
        console.log('Email sent:', info.response);
        }
        
        // Close the transporter
        transporter.close();
    });
}


