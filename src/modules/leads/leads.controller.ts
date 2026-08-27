import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-lead.dto';
import { AssignLeadDto } from './dto/create-lead.dto';

import { userEntity } from '../auth/dto/create-auth.dto';
import { GetQueryDto } from '../property/dto/get-query.dto';

import { Auth, AuthUser } from '../auth/decorator/auth.decorator';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadsService) {}

  // Create Lead
  @Auth(['ADMIN'])
  @Post()
  create(@Body() dto: CreateLeadDto, @AuthUser() currentUser: userEntity) {
    return this.leadService.create(dto, currentUser);
  }

  // Get All Leads
  @Get()
  findAll(@AuthUser() currentUser: userEntity, @Query() query: GetQueryDto) {
    return this.leadService.findAll(currentUser, query);
  }

  // Get One Lead
  @Auth(['ADMIN'])
  @Get(':id')
  findOne(@Param('id') id: string, @AuthUser() currentUser: userEntity) {
    return this.leadService.findOne(id, currentUser);
  }

  // Update Lead
  @Auth(['ADMIN'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLeadDto,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.leadService.update(id, dto, currentUser);
  }

  // Update Lead Status
  @Auth(['ADMIN'])
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateLeadStatusDto,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.leadService.updateStatus(id, dto, currentUser);
  }

  // Assign Agent
  @Auth(['ADMIN'])
  @Patch(':id/assign')
  assignAgent(
    @Param('id') id: string,
    @Body() dto: AssignLeadDto,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.leadService.assignAgent(id, dto, currentUser);
  }

  // Unassign Agent#

  @Auth(['ADMIN'])
  @Patch(':id/unassign')
  unassignAgent(@Param('id') id: string, @AuthUser() currentUser: userEntity) {
    return this.leadService.unassignAgent(id, currentUser);
  }

  // Delete Lead
  @Auth(['ADMIN'])
  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() currentUser: userEntity) {
    return this.leadService.remove(id, currentUser);
  }
}
