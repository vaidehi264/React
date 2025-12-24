import transporter  from "../config/Mailer.js  ";

const sendOtpMail = async (email, otp, next) => {
    try{
    const {email, otp, type} = next.otpData;
    const subject = type === "Registration failed" ? "OTP for Registration" : "OTP for Password Reset";

    await transporter.sendMail({
        from: 'vaidehibarot317@gmail.com',
        to: email,
        subject: subject,
        html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
    }); 
    next();
}
catch(error){
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
}
};
export default sendOtpMail;
