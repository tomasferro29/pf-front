import emailjs from '@emailjs/browser';

export const sendEmail= async (email,name, subject, content)=>{

    // emailjs.init(process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY)
    const params = {
        email_to: email,
        name,
        subject,
        from_name: "Seven Group",
        message: content
    }
    emailjs.send(
        process.env.NEXT_PUBLIC_MAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID,
        params,
        process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY
    )
}