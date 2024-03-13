const nodemailer = require('nodemailer');
import bcryptjs from "bcryptjs"
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "anaysah2003@gmail.com",
        pass: "qjnqcvddoxpbwhww",
    },
});

const options = {
    from: "anaysah2003@gmail.com",
    to: "temp12821@gmail.com",
    subject: "Test Email",
    text: "This is a test email sent using Nodemailer."
}

export const sendMail = async (emailType:string, token:string) => {
    try {
        // const hasedToken = await bcryptjs.hash(userId, 10);
        

        if (emailType === "VERIFY") {
            options.subject = "Verification Mail"
            options.text = `
            your verification link : ${process.env.DOMAIN+"signup/verify-email?token="+token}
            `
            const info = await transporter.sendMail(options)
            console.log('Verify Email sent:', info.response);

        } else if (emailType === "FORGOT") {
            console.log("will do later")
            options.subject = "Password Reset Mail"
            options.text = `
            your verification link : ${process.env.DOMAIN+"api/auth/login/reset-password?token="+token}
            `
            const info = await transporter.sendMail(options)
            console.log('Forgot Email sent:', info.response);
        }
    } catch (e:any) {
        throw new Error(e.message)
    }
}

