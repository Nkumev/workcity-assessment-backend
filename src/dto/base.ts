import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";
import { paginationDefault } from "../lib/constants";
// import { IsMongoId } from "../lib/utils";

export class ListDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  get _page() {
    if (this.page && Number(this.page) > 0) {
      return parseInt(this.page);
    }

    return paginationDefault.page;
  }

  get _limit() {
    if (this.limit && Number(this.limit) > 0) {
      const value = parseInt(this.limit);
      return Math.max(Math.min(value, 50), 10);
    }

    return paginationDefault.limit;
  }
}

export class IdDto {
  @IsString()
  @IsNotEmpty()
  id!: string;
}
