import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UpdateController } from './update/update.controller';

@Module({
  imports: [],
  controllers: [AppController, UpdateController],
  providers: [AppService],
})
export class AppModule {}
