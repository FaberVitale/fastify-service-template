import { Response, Request } from "express";
import * as cors from "cors";
import * as compression from "compression";
import { Router } from "express";

export default function api(): ReturnType<typeof Router> {
  const apiRouter = Router();

  apiRouter.use(cors());
  apiRouter.use(compression());

  apiRouter.get("/now", function handleNow(req: Request, res: Response) {
    res.json({
      now: new Date().toISOString(),
    });
  });

  return apiRouter;
}
