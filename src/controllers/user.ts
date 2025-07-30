import { ListDto } from "../dto/base";
import { userService, UserService } from "../services/user";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

export class UserController {
  constructor(private readonly userService: UserService) {
    console.log("User Controller initialized");
  }

  list = async (req: Request, res: Response) => {
    const query = req.query;
    const dto = plainToInstance(ListDto, query);
    const data = await this.userService.list(dto);
    return res.json(data);
  };
}

export const userController = new UserController(userService);
