import { UserRepository, userRepo } from "../repository";
import { JwtService, authTokenService } from "./lib/jwt";
import { ResponseMessage } from "../lib/utils";
import { LoginDto, SignupDto } from "../dto";
import { HashingService, bcryptService } from "./lib/hash";
import { UserRole } from "../../@client/prisma";

export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hasher: HashingService,
    private readonly tokenService: JwtService,
    private readonly messages: ResponseMessage
  ) {
    console.log("AuthService initialized");
  }

  register = async (dto: SignupDto, isAdmin = false) => {
    const { email, password, username } = dto;
    console.log(`Is admin ${isAdmin}`);

    const hash = await this.hasher.hash(password);

    const payload = {
      email,
      username,
      password: hash,
      role: isAdmin ? UserRole.ADMIN : undefined,
    };

    const user = await this.userRepo.create(payload);

    return {
      message: this.messages.success(),
      data: this.userRepo.pipe(user),
    };
  };

  login = async (dto: LoginDto) => {
    const { email, password } = dto;

    const user = await this.userRepo.getByEmail(email);

    if (!user) {
      return null;
    }

    const match = await this.hasher.compare(password, user.password);

    if (!match) {
      return null;
    }

    const token = this.tokenService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: this.messages.success(),
      data: {
        user: this.userRepo.pipe(user),
        token,
      },
    };
  };
}

export const authService = new AuthService(
  userRepo,
  bcryptService,
  authTokenService,
  new ResponseMessage("Auth")
);
