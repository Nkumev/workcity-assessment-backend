import { PrismaClient, Project } from "../../@client/prisma";
import { ListDto } from "../dto/base";
import { CreateProjectDto } from "../dto/project";
import {
  UpdateProjectDto,
  UpdateProjectStatusDto,
} from "../dto/project/update";
import { IRepository } from "./repo";
import { db } from "./setup.db";

export class ProjectRepository implements IRepository<Project> {
  constructor(private readonly db: PrismaClient) {
    console.log("ProjectRepository initialized");
  }

  async create(dto: CreateProjectDto) {
    return await this.db.project.create({ data: dto });
  }

  async update(id: string, dto: UpdateProjectDto) {
    return await this.db.project.update({
      where: { id },
      data: dto,
      include: this.includeFields(),
    });
  }

  async updateStatus(id: string, dto: UpdateProjectStatusDto) {
    return await this.db.project.update({
      where: { id },
      data: dto,
      include: this.includeFields(),
    });
  }

  async delete(id: string) {
    return await this.db.project.delete({ where: { id } });
  }

  async getById(id: string) {
    return await this.db.project.findUnique({
      where: { id },
      include: this.includeFields(),
    });
  }

  async list(dto: ListDto, userId = "") {
    return await this.db.project.findMany({
      where: this.listQuery(userId),
      skip: (dto._page - 1) * dto._limit,
      take: dto._limit,
      orderBy: {
        createdAt: "desc",
      },
      include: this.includeFields(),
    });
  }

  async count(dto: ListDto, userId = "") {
    return await this.db.project.count({ where: this.listQuery(userId) });
  }

  private listQuery(userId = "") {
    return userId ? { managerId: userId } : {};
  }

  private includeFields() {
    return {
      client: true,
      manager: true,
    };
  }
}

export const projectRepo = new ProjectRepository(db);
