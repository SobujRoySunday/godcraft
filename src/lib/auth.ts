import jwt from 'jsonwebtoken';

export const verifyAuthToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    console.log(err);
    return null; // Invalid token
  }
};
