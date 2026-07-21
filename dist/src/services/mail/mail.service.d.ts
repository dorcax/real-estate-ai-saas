import { ConfigService } from '@nestjs/config';
import type { ReactElement } from 'react';
export declare class MailService {
    private configService;
    private resend;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, react: ReactElement): Promise<import("resend").CreateEmailResponse>;
}
