import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {UserModule} from "./users/user.module";
import {RecRequestsModule} from "./recepies-requests/recRequests.module";
import {PromptModule} from "./prompts/prompt.module";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: { rejectUnauthorized: false },
        logging: false,
      }),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
    }),
    AuthModule,
    UserModule,
    RecRequestsModule,
    PromptModule
  ],
})
export class AppModule {}
