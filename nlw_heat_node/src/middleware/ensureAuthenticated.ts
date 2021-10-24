import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      errorCode: "invalid token"
    })
  }

  // Bearer d2fdfsazongxsvfbgc
  const [, token] = authToken.split(" ");

  try {
    const jwtMySecret = String(process.env.JWT_SECRET);
    const { sub } = verify(token, jwtMySecret) as IPayload
    // const { sub } = verify(token, "27c54a2ffd9c6e0b8bd08903c926f500") as IPayload

    req.body.user_id = sub;

    return next();
  } catch (e) {
    return res.status(401).json({ errorCode: "Expired Token" })
  }
}