import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as React from "react"
import { Resend } from "resend";
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// import { render } from "@react-email/render";



@Injectable()
export class MailService {
  private resend:Resend 
  constructor(private configService:ConfigService){
    this.resend  =new Resend(this.configService.get<string>("RESEND_API_KEY"))
}
 
async sendEmail(
  to:string,
  subject:string,
   react:ReactElement
){
  // const html=await render (email)
  //  const html = renderToStaticMarkup(React.createElement(react));
  const html = renderToStaticMarkup(react);

  try {
    const response =await this.resend.emails.send({
      from:'onboarding@resend.dev',
//  this.configService.get<string>("RESEND_FROM_EMAIL"),

      to,
      subject,
      html
    });
 

    console.log('testing Resend response:', response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
     throw error;
  }

}

  
}

