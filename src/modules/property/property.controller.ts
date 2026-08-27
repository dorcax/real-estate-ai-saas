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
import { Auth, AuthUser } from '../auth/decorator/auth.decorator';
import { userEntity } from '../auth/dto/create-auth.dto';
import { GetQueryDto } from '../property/dto/get-query.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Auth(['OWNER'])
  @Post()
  create(
    @Body() createPropertyDto: CreatePropertyDto,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.propertyService.create(createPropertyDto, currentUser);
  }

  @Auth(['ADMIN', 'OWNER'])
  @Get()
  findAll(@AuthUser() currentUser: userEntity, @Query() query: GetQueryDto) {
    return this.propertyService.findAll(currentUser, query);
  }

  // Get single property
  @Auth(['ADMIN', 'OWNER'])
  @Get(':id')
  findOne(@Param('id') id: string, @AuthUser() currentUser: userEntity) {
    return this.propertyService.findOne(id, currentUser);
  }

  // Update property
  @Auth(['ADMIN', 'OWNER'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePropertyDto,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.propertyService.update(id, dto, currentUser);
  }

  // Delete property
  @Auth(['ADMIN', 'OWNER'])
  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() currentUser: userEntity) {
    return this.propertyService.remove(id, currentUser);
  }
  // add agent to property
  @Auth(['OWNER'])
  @Post(':id/agents')
  addAgentToProperty(
    @AuthUser() currentUser: userEntity,
    @Param('id') id: string,
    @Body() agentId: string,
  ) {
    return this.propertyService.addAgentToProperty(currentUser, id, agentId);
  }

  @Auth(['OWNER'])
  @Get(':id/agents')
  getAgent(@AuthUser() currentUser: userEntity, @Param('id') id: string) {
    return this.propertyService.getAgents(currentUser, id);
  }

  @Auth(['OWNER'])
  @Delete(':id/agents/:agentId')
  deleteAgent(
    @AuthUser() currentUser: userEntity,
    @Param('id') id: string,
    @Param('agentId') agentId: string,
  ) {
    return this.propertyService.getAgents(currentUser, id);
  }
}
