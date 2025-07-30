import { ClientRepository, clientRepo } from "../repository/client";
import { ResponseMessage } from "../lib/utils";
import { CreateClientDto, UpdateClientDto } from "../dto";
import { ListDto } from "../dto/base";

export class ClientService {
  constructor(
    private readonly clientRepo: ClientRepository,
    private readonly messages: ResponseMessage
  ) {
    console.log("Client Service Intialized");
  }

  async create(dto: CreateClientDto) {
    const data = await this.clientRepo.create(dto);

    return {
      message: this.messages.create(),
      data,
    };
  }

  async update(id: string, dto: UpdateClientDto) {
    const data = await this.clientRepo.update(id, dto);

    return {
      message: this.messages.update(),
      data,
    };
  }

  async delete(id: string) {
    await this.clientRepo.delete(id);

    return {
      message: this.messages.delete(),
      data: null,
    };
  }

  async getOne(id: string) {
    const data = await this.clientRepo.getById(id);

    if (!data) {
      return null;
    }

    return {
      message: this.messages.get(),
      data,
    };
  }

  async list(dto: ListDto) {
    const [data, total] = await Promise.all([
      this.clientRepo.list(dto),
      this.clientRepo.count(dto),
    ]);

    const { _page: page, _limit: limit } = dto;

    return {
      message: this.messages.list(),
      page,
      limit,
      total,
      data,
    };
  }
}

export const clientService = new ClientService(
  clientRepo,
  new ResponseMessage("Client")
);
