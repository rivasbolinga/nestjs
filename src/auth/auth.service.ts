import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!user)
      throw new ForbiddenException(
        'User incorrect',
      );


    const pwMatches = await bcrypt.compare(
      dto.password,
      user.hash,
    );

    if (!pwMatches)
      throw new ForbiddenException(
        'Pasword incorrect',
      );
    return this.signToken(user.id, user.email);
  }

  async signup(dto: AuthDto) {
    try {
      const hash = await bcrypt.hash(
        dto.password,
        10,
      );
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }
  async sendPasswordResetEmail(email: string) {
    const user =
      await this.prisma.user.findUnique({
        where: { email },
      });

    if (!user) {
      throw new ForbiddenException(
        'User not found',
      );
    }
    // Generate token
     return this.signToken(user.id, user.email);
    //send email
 
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret,
      },
    );
    return {
      access_token: token,
    };
  }
}
