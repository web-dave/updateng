import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('update')
export class UpdateController {
  constructor(private service: AppService) {}
  @Get()
  getVersion() {
    return this.service.getVersions();
  }
  // update/5.2/10.2
  @Get(':from/:to')
  getUpdatePath(@Param('from') from: string, @Param('to') to: string) {
    console.log(from, to);
    return this.service.createUpdatePath(from, to);
  }
}
