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
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { Auth, AuthUser } from '../auth/decorator/auth.decorator';
import { GetQueryDto } from '../property/dto/get-query.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Auth(['AGENT'])
  @Post()
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.appointmentService.create(createAppointmentDto, currentUser);
  }

  @Get()
  findAll(@AuthUser() currentUser: userEntity, @Query() query: GetQueryDto) {
    return this.appointmentService.findAll(currentUser, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @AuthUser() currentUser: userEntity) {
    return this.appointmentService.findOne(id, currentUser);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.appointmentService.update(
      id,
      updateAppointmentDto,
      currentUser,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() currentUser: userEntity) {
    return this.appointmentService.remove(id, currentUser);
  }
}
