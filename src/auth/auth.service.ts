import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
// import { hash } from 'bcrypt';
import * as bcrypt from 'bcrypt'

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login(dto: AuthDto) {
    console.log(dto);
  }
  async signup(dto: AuthDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    return user;
  }
}
