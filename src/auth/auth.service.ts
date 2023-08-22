import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      },
    });
    // console.log(user.email, 'email');

    if(!user) 
    throw new ForbiddenException(
      'Credentials incorrect',
    );

  //  if (dto.email === user.email) {
  //   console.log(user.email)
  //  }
    // find user by email
    // If user doesn't exist throw exception
    // compare password
    console.log('user.hash', user.hash);
    console.log('dto.password', dto.password);
    const pwMatches = await bcrypt.compare(user.hash, dto.password);
    console.log(pwMatches);
    // if password incorrect throw exception
  }

  async signup(dto: AuthDto) {
    try {
 const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken')
      }
    }
    throw error;
  }
    }
}
