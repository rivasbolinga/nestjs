import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/controlers/customers.module';
import { Service } from './.service';
// Main module would import other modules.
@Module({
  imports: [CustomersModule],
  controllers: [AppController],
  providers: [AppService, Service],
})
export class AppModule {}
