import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Auth, AuthUser } from '../auth/decorator/auth.decorator';
import { userEntity } from '../auth/dto/create-auth.dto';
import { GetQueryDto } from '../property/dto/get-query.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Auth(['AGENT'])
  @Post()
  create(@Body() dto: CreateCustomerDto, @AuthUser() currentUser: userEntity) {
    return this.customerService.create(dto, currentUser);
  }

  @Get()
  findAll(@AuthUser() currentUser: userEntity, @Query() query: GetQueryDto) {
    return this.customerService.findAll(currentUser, query);
  }
  @Get(':id')
  findOne(@Param('id') id: string, @AuthUser() currentUser: userEntity) {
    return this.customerService.findOne(id, currentUser);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.customerService.update(id, dto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() currentUser: userEntity) {
    return this.customerService.remove(id, currentUser);
  }
}
