import { ProjectRepository, projectRepo } from "../repository/project";
import { ResponseMessage } from "../lib/utils";
import {
  CreateProjectDto,
  UpdateProjectDto,
  UpdateProjectStatusDto,
} from "../dto";
import { ListDto } from "../dto/base";

export class ProjectService {
  constructor(
    private readonly projectRepo: ProjectRepository,
    private readonly messages: ResponseMessage
  ) {}

  async create(dto: CreateProjectDto) {
    const data = await this.projectRepo.create(dto);

    return {
      message: this.messages.create(),
      data,
    };
  }

  async update(id: string, dto: UpdateProjectDto) {
    const data = await this.projectRepo.update(id, dto);

    return {
      message: this.messages.update(),
      data,
    };
  }

  async updateStatus(id: string, dto: UpdateProjectStatusDto) {
    const data = await this.projectRepo.updateStatus(id, dto);

    return {
      message: this.messages.update(),
      data,
    };
  }

  async get(id: string) {
    const data = await this.projectRepo.getById(id);

    if (!data) {
      return null;
    }

    return {
      message: this.messages.get(),
      data,
    };
  }

  async list(dto: ListDto, userId = "") {
    const [data, count] = await Promise.all([
      this.projectRepo.list(dto, userId),
      this.projectRepo.count(dto, userId),
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

  async delete(id: string) {
    await this.projectRepo.delete(id);

    return {
      message: this.messages.delete(),
      data: null,
    };
  }
}

export const projectService = new ProjectService(
  projectRepo,
  new ResponseMessage("Project")
);
