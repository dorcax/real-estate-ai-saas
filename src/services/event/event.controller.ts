import { Controller } from '@nestjs/common';
import { MailProcessor } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: MailProcessor) {}


}
