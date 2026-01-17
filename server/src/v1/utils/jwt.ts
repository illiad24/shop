import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.config";

export interface AccessTokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface RefreshTokenPayload {
  id: string;
}

// -------- ACCESS --------
export const generateAccessToken = (payload: AccessTokenPayload) => {
  console.log(jwtConfig);
  console.log(jwtConfig.accessSecret);
  return jwt.sign(payload, jwtConfig.accessSecret, {
    expiresIn: jwtConfig.accessExpiresIn,
  });
};

// -------- REFRESH --------
export const generateRefreshToken = (payload: RefreshTokenPayload) => {
  return jwt.sign(payload, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn,
  });
};

// -------- VERIFY --------
export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, jwtConfig.accessSecret) as AccessTokenPayload;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  const payload = jwt.verify(token, jwtConfig.refreshSecret) as JwtPayload;
  return { id: payload.id as string };
};
