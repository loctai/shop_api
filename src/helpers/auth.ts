import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';

export const generateToken = (user) => {
  const { SECRET_KEY, EXPIRES_IN } = process.env;

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: EXPIRES_IN,
  });

  return token;
};

export const sendTokenToClient = (user: IUser) => {
  const { EXPIRES_IN } = process.env;
  const token = generateToken(user);

  // tslint:disable-next-line: radix
  const expireDate = new Date(Date.now() + parseInt(EXPIRES_IN)).toUTCString();

  return { access_token: token, expireDate, expiresIn: EXPIRES_IN };
};

export const hashCode = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const checkPasswordMatch = (p1: string, p2: string) => p1 === p2;

export const checkEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const checkPhoneNumber = (tel: string) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(tel);
};

export const compareSyncPass = (pass: string, hashPass: string) => {
  return bcrypt.compareSync(pass, hashPass);
};
