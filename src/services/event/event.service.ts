import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import React from "react";

import { MailService } from "../mail/mail.service";

import { MailJob } from "./entities/event.entity";

import { OtpEmail } from "../mail/template/OtpEmail";
import { ForgotPasswordEmail } from "../mail/template/ForgotPassword";
// import { WelcomeEmail } from "../mail/template/WelcomeEmail";
// import { ResetPasswordEmail } from "../mail/template/ResetPasswordEmail";
// import { BookingConfirmationEmail } from "../mail/template/BookingConfirmationEmail";
// import { PropertyApprovedEmail } from "../mail/template/PropertyApprovedEmail";
// import { PaymentReceiptEmail } from "../mail/template/PaymentReceiptEmail";

@Processor("mail")
export class MailProcessor extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }

  async process(job: Job<any>) {
    console.log("Processing email job...");
    console.log(job.data);
    switch (job.name) {
      case MailJob.VERIFY_EMAIL:
        await this.mailService.sendEmail(
          job.data.email,
          "Verify Your Email",
          React.createElement(OtpEmail, {
            name: job.data.name,
            code: job.data.code,
            year: new Date().getFullYear(),
          }),
        );
  //        <OtpEmail
  //   name={job.data.name}
  //   code={job.data.code}
  //   year={new Date().getFullYear()}
  // />)
        break;

        case MailJob.RESET_PASSWORD:
          await this.mailService.sendEmail(
            job.data.email,
            "Reset Your Password ",
            React.createElement(ForgotPasswordEmail, {
              name: job.data.name,
              code: job.data.code,
              expiresAt: job.data.expiresAt,
              year: new Date().getFullYear(),
            }),
          );

          break;
  }
}
}