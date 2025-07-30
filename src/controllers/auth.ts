import { Request, Response } from "express";
import { AuthService, authService } from "../auth/auth";
import { ResponseMessage } from "../lib/utils";
import { UserRepository, userRepo } from "../repository";
import { plainToInstance } from "class-transformer";
import { LoginDto, SignupDto } from "../dto";
import { ADMIN_KEY } from "../lib/env";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRepository,
    private readonly messages: ResponseMessage
  ) {
    console.log("Auth Controller initialized");
  }

  signup = async (req: Request, res: Response) => {
    const dto = plainToInstance(SignupDto, req.body);
    const { adminKey } = dto;

    if (adminKey && adminKey !== ADMIN_KEY) {
      return res.status(401).json({
        message: this.messages.unauthorized(),
        error: this.messages.forbidden(),
      });
    }

    const existing = await this.userRepo.getByEmail(dto.email);

    if (existing) {
      return res.status(409).json({
        message: this.messages.badRequest(),
        error: this.messages.badAuth(),
      });
    }

    const result = await this.authService.register(dto, Boolean(adminKey));

    return res.status(201).json(result);
  };

  login = async (req: Request, res: Response) => {
    const dto = plainToInstance(LoginDto, req.body);
    const { email, password } = dto;

    const data = await this.authService.login({ email, password });

    if (!data) {
      return res.status(401).json({
        message: this.messages.badAuth(),
        error: this.messages.badAuth(),
      });
    }

    return res.status(200).json(data);
  };
}

export const authController = new AuthController(
  authService,
  userRepo,
  new ResponseMessage("Auth")
);
