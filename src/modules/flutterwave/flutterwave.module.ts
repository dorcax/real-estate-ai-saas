import { Module } from '@nestjs/common';
import { FlutterwaveService } from './flutterwave.service';
import { FlutterwaveController } from './flutterwave.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [FlutterwaveController],
  providers: [FlutterwaveService,PrismaService],
})
export class FlutterwaveModule {}
