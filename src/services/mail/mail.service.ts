import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import {Resend} from "resend"
import { ConfigService } from '@nestjs/config';
import {ReactElement } from "react"


@Injectable()
export class MailService {
  private resend:Resend 
  constructor(private configService:ConfigService){
    this.resend  =new Resend(this.configService.get<string>("RESEND_API_KEY"))
}
 
async sendEmail(to:string,
  subject:string,
  template:ReactElement
){
return this.resend.emails.send({
  from: this.configService.get<string>("RESEND_FROM_EMAIL"),
  to,
  subject,
   template
})
}

  
}
