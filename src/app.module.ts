import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './database-connection.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DatabaseConnectionService
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
