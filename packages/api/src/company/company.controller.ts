import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getCompanies() {
    const companies = await this.companyService.all({});
    return {
      data: companies,
    };
  }
}
