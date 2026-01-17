// v1/services/refreshToken.service.ts
import RefreshToken from "../models/refreshToken/refreshToken.model";

export const saveRefreshToken = (data) => RefreshToken.create(data);

export const findRefreshToken = (token: string) =>
  RefreshToken.findOne({ token });

export const deleteRefreshToken = (token: string) =>
  RefreshToken.deleteOne({ token });
