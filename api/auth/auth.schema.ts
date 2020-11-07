import * as yup from "yup";

export const oauthVerifyRequestSchema = yup
  .object({
    error: yup.string().trim().min(1, "error cannot be null"),
    code: yup.string().trim().min(1, "code cannot be null"),
  })
  .test("xor", "either code or error has to be passed", (value) => {
    return !!value?.error !== !!value?.code;
  })
  .required();

export type oauthVerifyRequest = yup.InferType<typeof oauthVerifyRequestSchema>;

export interface oauthGoogleResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface googleProfile {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  hd: string;
}

export const userCredsSchema = yup
  .object({
    email: yup.string().email().required(),
    name: yup.string().required(),
  })
  .required();

export type userCreds = yup.InferType<typeof userCredsSchema>;

export interface userIdentity extends userCreds {
  picture: string;
}
