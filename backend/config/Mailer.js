import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vaidehibarot317@gmail.com',
        pass: 'hslkgtqarcnxkkng',
    },
});

export default transporter;