import { ProjectRepository, projectRepo } from "../repository/project";
import { IsMongoValidator, ResponseMessage } from "../lib/utils";
import { ProjectService, projectService } from "../services/project";
import {
  CreateProjectDto,
  UpdateProjectDto,
  UpdateProjectStatusDto,
} from "../dto/project";
import { plainToInstance } from "class-transformer";
import { IdDto, ListDto } from "../dto/base";
import { Request, Response } from "express";
import { ClientRepository, clientRepo } from "../repository/client";
import { UserRepository, userRepo } from "../repository";
import { UserRole } from "../../@client/prisma";

export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectRepo: ProjectRepository,
    private readonly clientRepo: ClientRepository,
    private readonly userRepo: UserRepository,
    private readonly messages: ResponseMessage
  ) {
    console.log("Project Controller initialized");
  }

  create = async (req: Request, res: Response) => {
    const dto = plainToInstance(CreateProjectDto, req.body);

    const { clientId, managerId } = dto;

    const valid = IsMongoValidator.validateId({ clientId, managerId });

    if (!valid) {
      return res.status(400).json({
        message: this.messages.badRequest(),
        error: this.messages.invalidId,
      });
    }

    const client = await this.clientRepo.getById(clientId);

    if (!client) {
      return res.status(404).json({
        message: this.messages.badRequest(),
        error: this.messages.invalidId,
      });
    }

    if (managerId) {
      const user = await this.userRepo.getById(managerId);

      if (!user) {
        return res.status(404).json({
          message: this.messages.badRequest(),
          error: this.messages.invalidId,
        });
      }
    }

    const data = await this.projectService.create(dto);
    return res.status(201).json(data);
  };

  update = async (req: Request, res: Response) => {
    const dto = plainToInstance(UpdateProjectDto, req.body);
    const param = plainToInstance(IdDto, req.params);

    const { clientId, managerId } = dto;

    const valid = IsMongoValidator.validateId({ clientId, managerId });

    if (!valid) {
      return res.status(400).json({
        message: this.messages.badRequest(),
        error: this.messages.invalidId,
      });
    }

    if (clientId) {
      const client = await this.clientRepo.getById(clientId);

      if (!client) {
        return res.status(404).json({
          message: this.messages.badRequest(),
          error: this.messages.invalidId,
        });
      }
    }

    if (managerId) {
      const user = await this.userRepo.getById(managerId);

      if (!user) {
        return res.status(404).json({
          message: this.messages.badRequest(),
          error: this.messages.invalidId,
        });
      }
    }

    const existing = await this.projectRepo.getById(param.id);

    if (!existing) {
      return res.status(404).json({
        message: this.messages.notFound(),
        error: this.messages.notFound(),
      });
    }

    const data = await this.projectService.update(param.id, dto);
    return res.status(200).json(data);
  };

  updateStatus = async (req: Request, res: Response) => {
    const dto = plainToInstance(UpdateProjectStatusDto, req.body);
    const param = plainToInstance(IdDto, req.params);

    const existing = await this.projectRepo.getById(param.id);

    if (!existing) {
      return res.status(404).json({
        message: this.messages.notFound(),
        error: this.messages.notFound(),
      });
    }

    const data = await this.projectService.updateStatus(param.id, dto);
    return res.status(200).json(data);
  };

  get = async (req: Request, res: Response) => {
    const param = plainToInstance(IdDto, req.params);

    const existing = await this.projectRepo.getById(param.id);

    if (!existing) {
      return res.status(404).json({
        message: this.messages.notFound(),
        error: this.messages.notFound(),
      });
    }

    const data = await this.projectService.get(param.id);
    return res.status(200).json(data);
  };

  list = async (req: Request, res: Response) => {
    const user = req.user!;

    const userId = user.role === UserRole.ADMIN ? "" : user.id;
    const dto = plainToInstance(ListDto, req.query);
    const data = await this.projectService.list(dto, userId);
    return res.status(200).json(data);
  };

  delete = async (req: Request, res: Response) => {
    const param = plainToInstance(IdDto, req.params);

    const existing = await this.projectRepo.getById(param.id);

    if (!existing) {
      return res.status(404).json({
        message: this.messages.notFound(),
        error: this.messages.notFound(),
      });
    }

    await this.projectService.delete(param.id);
    return res.status(204).send();
  };
}

export const projectController = new ProjectController(
  projectService,
  projectRepo,
  clientRepo,
  userRepo,
  new ResponseMessage("Project")
);
