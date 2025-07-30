export class ResponseMessage {
  constructor(private readonly resource: string) {}

  create() {
    return `${this.resource} created`;
  }

  get() {
    return `${this.resource} fetched`;
  }

  update() {
    return `${this.resource} updated`;
  }

  delete() {
    return `${this.resource} deleted`;
  }

  list() {
    return `${this.resource} list`;
  }

  success() {
    return "Success";
  }

  unauthorized() {
    return "Unauthorized";
  }

  badRequest() {
    return "Bad Request";
  }

  badAuth() {
    return "Invalid credentials";
  }

  forbidden() {
    return "Access denied";
  }

  notFound() {
    return `${this.resource} not found`;
  }

  invalidId = "Invalid ID";
}
