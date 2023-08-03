const nodemailer = require('nodemailer');
require('dotenv').config();
const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "o.dashkevych@meta.ua",
    pass: META_PASSWORD,
  }
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    try {
        const email = { ...data, from: "o.dashkevych@meta.ua" };
        await transporter.sendMail(email);
        return true;
    } catch (error) {
        throw error;
    };
};

module.exports = sendEmail;