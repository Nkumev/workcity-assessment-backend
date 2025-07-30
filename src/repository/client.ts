import { PrismaClient, Client, ProjectStatus } from "../../@client/prisma";
import { IRepository } from "./repo";
import { ListDto } from "../dto/base";
import { CreateClientDto, UpdateClientDto } from "../dto";
import { db } from "./setup.db";

export class ClientRepository implements IRepository<Client> {
  constructor(private readonly db: PrismaClient) {
    console.log("ClientRepository initialized");
  }

  async create(data: CreateClientDto) {
    return await this.db.client.create({ data });
  }

  async existing(data: CreateClientDto) {
    return await this.db.client.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      },
    });
  }

  async update(id: string, dto: UpdateClientDto) {
    return await this.db.client.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return await this.db.client.delete({ where: { id } });
  }

  async getById(id: string) {
    return await this.db.client.findUnique({
      where: { id },
    });
  }

  async list(dto: ListDto) {
    const { _limit, _page } = dto;
    return await this.db.client.findMany({
      skip: (_page - 1) * _limit,
      take: _limit,
      include: {
        _count: {
          select: {
            projects: {
              where: {
                status: { not: ProjectStatus.COMPLETED },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async count(dto: ListDto) {
    const { _limit, _page } = dto;
    return await this.db.client.count({});
  }

  private listQuery() {}

  private includeMembers() {}
}

export const clientRepo = new ClientRepository(db);
