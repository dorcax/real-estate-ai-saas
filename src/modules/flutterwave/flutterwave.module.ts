import { Module } from '@nestjs/common';
import { FlutterwaveService } from './flutterwave.service';
import { FlutterwaveController } from './flutterwave.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [FlutterwaveController],
  providers: [FlutterwaveService,PrismaService],
  exports:[FlutterwaveService]
})
export class FlutterwaveModule {}
