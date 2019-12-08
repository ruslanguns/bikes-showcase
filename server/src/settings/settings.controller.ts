import { Controller, Put, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingDto } from './dtos/settings.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('settings')
@UseGuards(AuthGuard('jwt'))
export class SettingsController {

  constructor(
    private readonly settingsService: SettingsService,
  ) { }

  @Put()
  async updateSettings(
    @Body() dto: SettingDto,
    @Res() res,
  ) {
    const data = await this.settingsService.update(dto);
    return res.status(HttpStatus.CREATED).json({ message: 'Los settings se han actualizado correctamente', data });
  }
}
