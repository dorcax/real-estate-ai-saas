import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Auth, AuthUser } from '../auth/decorator/auth.decorator';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Auth(['OWNER'])
  @Post()
  async create(@Body() dto: CreatePlanDto) {
    return this.planService.create(dto);
  }

  @Get()
  async findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    return this.planService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.planService.deactivate(id);
  }
}
