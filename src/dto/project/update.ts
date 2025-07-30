import { Transform } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsString,
} from "class-validator";
import { ObjectId } from "mongodb";
import { ProjectStatus } from "../../../@client/prisma";

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsOptional()
  clientId?: string;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @IsString()
  @IsOptional()
  managerId?: string;
}

export class UpdateProjectStatusDto {
  @IsEnum(ProjectStatus)
  @IsNotIn([ProjectStatus.REQUESTED, ProjectStatus.COMPLETED], {
    message: "Invalid status",
  })
  status!: ProjectStatus;
}
