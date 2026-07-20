import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import {ReactElement} from "react"
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; template: ReactElement }) {
    return this.mailService.sendEmail(body.to, body.subject, body.template);
  }

}
