import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceService } from './resource.service';
import { Resource } from './resource.entity';
import { ResourceController } from './resource.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
