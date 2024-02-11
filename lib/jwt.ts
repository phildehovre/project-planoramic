"use server"
// Your payload object

import * as jwt from 'jsonwebtoken';

export const formatAndSignJWT = (payload: any) => {

  // Your secret key for signing the JWT
  const secretKey = process.env.JWT_SECRET as string;

  console.log(secretKey)
  
  if (!secretKey) return null;
  const token = jwt.sign(payload, secretKey);
  
  console.log(token);
  return token

}