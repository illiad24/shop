import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.config";

// ---------------- TYPES ----------------
export interface AccessTokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface RefreshTokenPayload {
  id: string;
}

// ---------------- ACCESS TOKEN ----------------
export const generateAccessToken = (payload: AccessTokenPayload): string => {
  const options: SignOptions = {
    expiresIn: jwtConfig.accessExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, jwtConfig.accessSecret, options);
};

// ---------------- REFRESH TOKEN ----------------
export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
  const options: SignOptions = {
    expiresIn: jwtConfig.refreshExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, jwtConfig.refreshSecret, options);
};

// ---------------- VERIFY ACCESS ----------------
export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, jwtConfig.accessSecret) as AccessTokenPayload;
};

// ---------------- VERIFY REFRESH ----------------
export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  const payload = jwt.verify(token, jwtConfig.refreshSecret) as JwtPayload;

  return {
    id: payload.id as string,
  };
};
