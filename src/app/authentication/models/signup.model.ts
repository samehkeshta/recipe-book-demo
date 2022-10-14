export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
}
