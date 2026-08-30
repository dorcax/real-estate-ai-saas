import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Auth, AuthUser } from '../auth/decorator/auth.decorator';
import { userEntity } from '../auth/dto/create-auth.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Auth(['AGENT'])
  @Post()
  create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.subscriptionService.create(createSubscriptionDto, currentUser);
  }

  @Get(':companyId')
  findAll(@Param('companyId') companyId: string) {
    return this.subscriptionService.findAll(companyId);
  }

  @Get(':companyId')
  findOne(@Param('companyId') companyId: string) {
    return this.subscriptionService.findOne(companyId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(+id, updateSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() currentUser: userEntity) {
    return this.subscriptionService.remove(id, currentUser);
  }

  @Post(':id/checkout')
  checkout(
    @Param('id') id: string,

    @AuthUser()
    currentUser: userEntity,
  ) {
    return this.subscriptionService.subscriptionCheckout(id, currentUser);
  }
}
