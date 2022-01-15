import { Controller, Get, Param } from '@nestjs/common';
import { GetBrandModelsParamsDto } from './dto/get-brand-models-params.dto';
import { ModelService } from './model.service';

@Controller('/brand/:id/model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  async getBrands(@Param() param: GetBrandModelsParamsDto) {
    const models = await this.modelService.all({
      where: {
        brandId: param.id,
      },
    });
    return {
      data: models,
    };
  }
}
