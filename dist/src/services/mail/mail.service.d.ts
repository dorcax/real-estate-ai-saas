import { ConfigService } from '@nestjs/config';
import { ReactElement } from "react";
export declare class MailService {
    private configService;
    private resend;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, template: ReactElement): Promise<import("resend").CreateEmailResponse>;
}
