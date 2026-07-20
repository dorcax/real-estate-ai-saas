import { WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { MailService } from "../mail/mail.service";
export declare class MailProcessor extends WorkerHost {
    private readonly mailService;
    constructor(mailService: MailService);
    process(job: Job<any>): Promise<void>;
}
