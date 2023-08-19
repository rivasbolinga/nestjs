import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
  controllers: [AuthController],
  pproviders: [AuthService]
})
export class AuthModule {}
