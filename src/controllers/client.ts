import { Request, Response } from "express";
import { ClientRepository, clientRepo } from "../repository/client";
import { ClientService, clientService } from "../services/client";
import { plainToInstance } from "class-transformer";
import { CreateClientDto, UpdateClientDto } from "../dto";
import { ResponseMessage } from "../lib/utils";
import { IdDto, ListDto } from "../dto/base";

export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly clientRepo: ClientRepository,
    private readonly messages: ResponseMessage
  ) {
    console.log("Client Controller Intialized");
  }

  create = async (req: Request, res: Response) => {
    const dto = plainToInstance(CreateClientDto, req.body);
    const existing = await this.clientRepo.existing(dto);
    if (existing) {
      return res.status(400).json({
        message: this.messages.badRequest(),
        error: "Client already exists",
      });
    }
    const data = await this.clientService.create(dto);
    return res.status(201).json(data);
  };

  update = async (req: Request, res: Response) => {
    const dto = plainToInstance(UpdateClientDto, req.body);
    const params = plainToInstance(IdDto, req.params);

    const existing = await this.clientRepo.getById(params.id);
    if (!existing) {
      return res.status(404).json({
        message: this.messages.notFound(),
        error: this.messages.notFound(),
      });
    }
    const data = await this.clientService.update(params.id, dto);
    return res.status(200).json(data);
  };

  delete = async (req: Request, res: Response) => {
    const params = plainToInstance(IdDto, req.params);

    const exists = await this.clientRepo.getById(params.id);

    if (!exists) {
      return res.status(404).json({
        message: this.messages.notFound(),
        error: this.messages.notFound(),
      });
    }
    await this.clientService.delete(params.id);
    return res.status(204).send();
  };

  get = async (req: Request, res: Response) => {
    const params = plainToInstance(IdDto, req.params);
    const data = await this.clientService.getOne(params.id);

    if (!data) {
      return res.status(404).json({
        message: this.messages.notFound(),
        error: this.messages.notFound(),
      });
    }
    return res.status(200).json(data);
  };

  list = async (req: Request, res: Response) => {
    const dto = plainToInstance(ListDto, req.query);
    const data = await this.clientService.list(dto);
    return res.status(200).json(data);
  };
}

export const clientController = new ClientController(
  clientService,
  clientRepo,
  new ResponseMessage("Client")
);
