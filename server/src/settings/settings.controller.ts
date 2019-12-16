import { Controller, Put, Body, Res, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingDto } from './dtos/settings.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Settings')
@Controller('settings')
@UseGuards(AuthGuard('jwt'))
export class SettingsController {

  constructor(
    private readonly settingsService: SettingsService,
  ) { }

  @Put()
  @ApiOperation({ summary: 'Modificar los settings' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateSettings(
    @Body() dto: SettingDto,
    @Res() res,
  ) {
    const data = await this.settingsService.update(dto);
    return res.status(HttpStatus.CREATED).json({ message: 'Los settings se han actualizado correctamente', data });
  }

  @Get()
  async fetch(
    @Res() res,
  ) {
    const data = await this.settingsService.find();
    return res.status(HttpStatus.CREATED).json({ message: 'Datos de configuraciones', data });
  }
}
