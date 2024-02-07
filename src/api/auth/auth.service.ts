import jwt from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcrypt';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import * as usersRepo from '../users/users.repo.js';

const { HOST, EMAIL_HEADER, JWT_SECRET, JWT_EXPIRES_IN, CONFIRM_ROUTE, EMAIL_USER, EMAIL_PASSWORD } = process.env;

function getToken({ userid, isadmin, username }: { userid: string, isadmin: boolean, username: string }) {
  const payload = { userid, isadmin, username };

  const secret = JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: JWT_EXPIRES_IN
  });

  return token;
}

export async function registerUser({ username, userEmail, userPassword }: { username: string, userEmail: string, userPassword: string }) {
  try {
    const hashedPassword = hashSync(userPassword, 10);
    const newUserId = uuidv4();
    const dbUser = await usersRepo.registerUser({ newUserId, username, userPassword: hashedPassword, userEmail });
    if (!dbUser) {
      throw new Error('Some problem creating the user');
    }

    const { userid, isadmin } = dbUser;

    const emailToken = getToken({ userid, isadmin, username });
    if (!emailToken) {
      throw new Error('Some problem generating token');
    }

    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      }
    });

    const host = HOST;
    if (!host) {
      throw new Error('HOST is not defined');
    }

    const url = host + CONFIRM_ROUTE + emailToken;

    await transporter.sendMail({
      from: EMAIL_HEADER,
      to: userEmail,
      subject: 'Confirma tu registro.',
      html: `
        <h3>Bienvenido, estás a un paso de registrarte🚶</h3>
        <h2><a href="${url}">👉 Click aqui para confirmar tu registro 👈</a></h2>
      `
    });
    console.log(`Usuario registrado con éxito. Validacion de usuario pendiente en el enlace enviado a ${userEmail}`, dbUser);
  } catch (error) {
    console.error('Error in register process', error);
    return false;
  }
  return true;
}

export async function loginUser({ username, userpassword }: { username: string, userpassword: string }) {
  const user = await usersRepo.getUserByUsername(username);
  if (!user.message && !user) {
    return user;
  }

  if (!user.isconfirmed) {
    return { message: 'User not confirmed' };
  }

  const isSamePassword = compareSync(userpassword, user.userpassword);
  if (!isSamePassword) {
    return { message: 'Invalid password' };
  }

  const { userid, isadmin } = user;

  const token = getToken({ userid, isadmin, username });
  if (!token) {
    return { message: 'Some problem generating token' };
  }
  const userDataAndtoken = { ...user, token };
  delete userDataAndtoken.userpassword;
  return userDataAndtoken;
}

export async function confirmUser({ emailtoken }: { emailtoken: string }) {
  try {
    const tokenConfirmedEmail = emailtoken;
    let username;

    const secret = JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    jwt.verify(tokenConfirmedEmail, secret, async (err, payload) => {
      if (err) {
        console.error(err.message);
      } else if (payload && typeof payload !== 'string' && payload.username) {
        username = payload.username;
        await usersRepo.confirmUser({ username });
      }
    });

  } catch (error) {
    console.error(error);
  }
}
