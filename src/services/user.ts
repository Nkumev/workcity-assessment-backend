import { ListDto } from "../dto/base";
import { paginationDefault } from "../lib/constants";
import { ResponseMessage } from "../lib/utils";
import { UserRepository, userRepo } from "../repository";

export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly messages: ResponseMessage
  ) {
    console.log("UserService initialized");
  }

  async list(dto: ListDto) {
    const [data, count] = await Promise.all([
      this.userRepo.list(dto),
      this.userRepo.count(dto),
    ]);

    const { _page: page, _limit: limit } = dto;

    return {
      message: this.messages.list(),
      page,
      limit,
      total: count,
      data,
    };
  }
}

export const userService = new UserService(
  userRepo,
  new ResponseMessage("User")
);
