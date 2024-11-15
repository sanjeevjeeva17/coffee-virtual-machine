import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from '../orders/orders.module';
import { Order } from '../orders/order.entity';
import { AuthModule } from '../auth/auth.module';
import { ResourceModule } from '../resource/resource.module';
import { Resource } from '../resource/resource.entity';
import { JwtStrategy } from '../auth/jwt.strategy'; // Ensure the path to your JwtStrategy file is correct

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/coffee-backend/src/.env',
    }), // Load environment variables
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'coffee-virtual-machine.db',
      entities: [Order, Resource],
      synchronize: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    OrdersModule,
    AuthModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy], // Include JwtStrategy in the providers
})
export class AppModule {}
