import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { CompanyModule } from './company/company.module';
import { AccountingModule } from './accounting/accounting.module';
import { CarHistoryModule } from './car-history/car-history.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    CarModule,
    UserModule,
    BrandModule,
    ModelModule,
    CompanyModule,
    AccountingModule,
    CarHistoryModule,
    AuthModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
