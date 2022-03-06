import { Controller, Get, Param } from '@nestjs/common';
import { GetTranslationDto } from './dto/get-translation.dto';
import { LangService } from './lang.service';

@Controller('locales')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @Get(':langCode/:ns')
  getTranslation(@Param() params: GetTranslationDto) {
    const lang = this.langService.getTranslationByLangCode(params.langCode);
    return lang;
  }
}
