import { IRepository } from "./repo";
import { PrismaClient, User, UserRole } from "../../@client/prisma";
import { ListDto } from "../dto/base";
import { db } from "./setup.db";

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  role?: UserRole;
}

export class UserRepository implements IRepository<User> {
  constructor(private readonly db: PrismaClient) {
    console.log("UserRepository initialized");
  }
  async create(data: CreateUserDto): Promise<User> {
    return await this.db.user.create({
      data,
    });
  }

  update(id: string, data: Partial<User>): Promise<User> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async getById(id: string) {
    return await this.db.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string) {
    return await this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  async list(dto: ListDto) {
    const { _page, _limit } = dto;
    return await this.db.user.findMany({
      where: {},
      skip: (_page - 1) * _limit,
      take: _limit,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async count(dto: ListDto) {
    const { _page, _limit } = dto;
    return await this.db.user.count({});
  }

  pipe(user: User) {
    return {
      ...user,
      password: "",
    };
  }

  private listQuery(dto: ListDto) {}
}

export const userRepo = new UserRepository(db);
