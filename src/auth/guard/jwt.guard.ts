import { AuthGuard } from "@nestjs/passport";

expoert class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}