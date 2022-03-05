import { BadRequestException, Injectable } from '@nestjs/common';
import { SupportedLangsEnum } from './dto/get-translation.dto';
import * as en from './locales/en.json';
import * as lt from './locales/lt.json';

@Injectable()
export class LangService {
  getTranslationByLangCode(langCode: string) {
    const lang = this.languages[langCode];
    if (!lang) {
      throw new BadRequestException();
    }
    return lang;
  }

  get languages() {
    return {
      [SupportedLangsEnum.EN]: en,
      [SupportedLangsEnum.LT]: lt,
    };
  }
}
