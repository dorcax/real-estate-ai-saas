import { MailService } from './mail.service';
import { ReactElement } from "react";
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendEmail(body: {
        to: string;
        subject: string;
        template: ReactElement;
    }): Promise<import("resend").CreateEmailResponse>;
}
