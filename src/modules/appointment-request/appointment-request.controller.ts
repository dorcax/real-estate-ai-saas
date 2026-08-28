import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentRequestService } from './appointment-request.service';
import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';
import { UpdateAppointmentRequestDto } from './dto/update-appointment-request.dto';

@Controller('appointment-request')
export class AppointmentRequestController {
  constructor(private readonly appointmentRequestService: AppointmentRequestService) {}

  @Post()
  create(@Body() createAppointmentRequestDto: CreateAppointmentRequestDto) {
    return this.appointmentRequestService.create(createAppointmentRequestDto);
  }

}
