import { Router, Request, Response, NextFunction } from "express";
const router: Router = Router();
import { handleTest } from "./chat.service";

const handleGetTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { key, value } = req.query as { key: string; value: string };
    await handleTest(key, value);
    res.json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

router.get("/chat/test", handleGetTest);

export default router;
