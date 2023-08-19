import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

// Main module would import other modules.
@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
})
export class AppModule {}
