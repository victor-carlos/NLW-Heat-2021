import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

interface IMessage {
  message: string
}

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body;

    const service = new AuthenticateUserService();

    try {
      return res.json(await service.execute(code));
    } catch (e) {
      const { message } = e as IMessage;
      return res.json({ error: message })
    }
  }
}

export { AuthenticateUserController }