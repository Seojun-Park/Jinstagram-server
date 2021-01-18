// import "../env";
require("dotenv").config();
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error("You need to login");
  }
  return;
};

export const generateCode = () => {
  let randomNumber = Math.floor(Math.random() * 1000000);
  let result: string;
  if (randomNumber > 1000000) {
    randomNumber - 100000;
  }
  result = randomNumber.toString();
  return result;
};

const getTransporter = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDR,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  return transporter;
};

export const sendSecretMail = async (address: string, secret: string) => {
  const transporter = await getTransporter();
  await transporter.sendMail({
    from: "jinpark@student.42.fr",
    to: address,
    subject: "Login Secret Number 🐴",
    html: `Hello! Your secret number is <h2>${secret}</h2><br/>Copy paste the number on app to log in.`
  });
};

export const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ id }, secret as string, {
    expiresIn: 10080
  });
};
