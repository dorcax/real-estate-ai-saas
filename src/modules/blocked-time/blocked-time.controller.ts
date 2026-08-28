import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlockedTimeService } from './blocked-time.service';
import { CreateBlockedTimeDto } from './dto/create-blocked-time.dto';
import { UpdateBlockedTimeDto } from './dto/update-blocked-time.dto';

@Controller('blocked-time')
export class BlockedTimeController {
  constructor(private readonly blockedTimeService: BlockedTimeService) {}

  @Post()
  create(@Body() createBlockedTimeDto: CreateBlockedTimeDto) {
    return this.blockedTimeService.create(createBlockedTimeDto);
  }

  @Get()
  findAll() {
    return this.blockedTimeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockedTimeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlockedTimeDto: UpdateBlockedTimeDto) {
    return this.blockedTimeService.update(+id, updateBlockedTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockedTimeService.remove(+id);
  }
}
