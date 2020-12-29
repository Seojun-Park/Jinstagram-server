import "../env";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
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

const sendMail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = async (address: string, secret: string) => {
  const email = {
    from: "jinpark@student.42.fr",
    to: address,
    subject: "Login Secret Number 🐴",
    html: `Hello! Your secret number is <h2>${secret}</h2><br/>Copy paste the number on app to log in.`
  };
  return sendMail(email);
};

const JWT = process.env.JWT_SECRET || "";

export const generateToken = (id) => jwt.sign({ id }, JWT);
