import { google } from "googleapis";
import axios from "axios";
import { errors } from "../error/error.constant";
import {
  oauthGoogleResponse,
  googleProfile,
  userIdentity,
} from "./auth.schema";
import { sign as jwtSign } from "jsonwebtoken";

/**
 * Generates a redirect URL for the user to sign-in with Google
 * @returns {Promise<string>} The unique OAuth URL to redirect the user to
 */
export const generateAuthUrl = async (): Promise<string> => {
  const oauth2client = new google.auth.OAuth2({
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENTSECRET,
    redirectUri: `${process.env.HOSTNAME}/api/v1/auth/verify`,
  });
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const url = oauth2client.generateAuthUrl({
    scope: scopes,
    access_type: "online",
  });

  return url;
};

/**
 * Excahnge the temporary auth code in return to the access token.
 * @param {string} authCode The temporary authorization code after OAuth successful.
 * @returns {Promise<string>} The access token issued by Google.
 */
export const exchangeAuthCode = async (authCode: string): Promise<string> => {
  try {
    const { data: oauthResponse } = await axios.post<oauthGoogleResponse>(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.OAUTH_CLIENTID,
        client_secret: process.env.OAUTH_CLIENTSECRET,
        redirect_uri: `${process.env.HOSTNAME}/api/v1/auth/verify`,
        grant_type: "authorization_code",
        code: authCode,
      }
    );
    return oauthResponse.access_token;
  } catch (err) {
    if (!err.response) {
      throw errors.INTERNAL_SERVER_ERROR;
    } else {
      throw errors.GOOGLE_OAUTH_ERROR;
    }
  }
};

/**
 * Get the user identity from Google in exchange of the access token.
 * @param {string} accessToken The access token recieved from Google.
 * @returns {Promise<userIdentity>} The Google user identity.
 */
export const getUserGoogleProfile = async (
  accessToken: string
): Promise<userIdentity> => {
  try {
    const { data: userProfile } = await axios.get<googleProfile>(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return {
      email: userProfile.email,
      name: userProfile.name,
      picture: userProfile.picture,
    };
  } catch (err) {
    if (!err.response) {
      throw errors.INTERNAL_SERVER_ERROR;
    } else {
      throw errors.GOOGLE_OAUTH_ERROR;
    }
  }
};

/**
 * Generates the login JWT Token.
 * @param {userIdentity} user The Google user identity.
 * @returns {Promise<string>} The JWT token base64 encoded.
 */
export const generateJwt = async (user: userIdentity): Promise<string> => {
  const jwt = jwtSign(
    { email: user.email, name: user.name, picture: user.picture },
    process.env.JWT_SECRET!,
    {
      issuer: "stories.gitaalekhyapaul.xyz",
      expiresIn: "1d",
    }
  );
  const token = Buffer.from(jwt).toString("base64");
  return token;
};
