import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { RedisModule } from './redis/redis.module';
import { REDIS } from './redis/redis.constants';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisClientType } from 'redis';
import * as RedisStore from 'connect-redis';

@Module({
  imports: [
    RedisModule,
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
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClientType) {}
  configure(consumer: MiddlewareConsumer) {
    const client = this.redis as any;
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: client,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: 'redis-secret',
          resave: false,
          cookie: {
            sameSite: 'none',
            httpOnly: false,
            maxAge: 60000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
