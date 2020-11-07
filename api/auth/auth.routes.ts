import { Router, Request, Response, NextFunction } from "express";
import {
  generateAuthUrl,
  exchangeAuthCode,
  getUserGoogleProfile,
  generateJwt,
} from "./auth.service";
import { errors } from "../error/error.constant";
import validateQuery from "../middlewares/validate-query";
import { oauthVerifyRequestSchema, oauthVerifyRequest } from "./auth.schema";

const router = Router();

async function handlePostAuthGenerate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const url = await generateAuthUrl();
    if (!url) {
      throw errors.INTERNAL_SERVER_ERROR;
    } else {
      res.redirect(url);
    }
  } catch (err) {
    next(err);
  }
}

async function handlePostAuthVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { error, code } = req.query as oauthVerifyRequest;
    if (error) {
      throw errors.UNAUTHORIZED;
    }
    const accessToken = await exchangeAuthCode(code!);
    const profile = await getUserGoogleProfile(accessToken);
    const jwtToken = await generateJwt(profile);
    if (process.env.NODE_ENV === "production")
      res.redirect(`${process.env.HOSTNAME}?token=${jwtToken}`);
    else res.redirect(`${process.env.REDIRECT_URL}?token=${jwtToken}`);
  } catch (err) {
    next(err);
  }
}

router.get("/auth/generate", handlePostAuthGenerate);
router.get(
  "/auth/verify",
  validateQuery("query", oauthVerifyRequestSchema),
  handlePostAuthVerify
);

export default router;
