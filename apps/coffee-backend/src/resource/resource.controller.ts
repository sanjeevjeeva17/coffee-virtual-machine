import { Controller, Get, Patch, Post, Body } from '@nestjs/common';
import { Resource } from './resource.entity';
import { ResourceService } from './resource.service';

@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get()
  async getResources(): Promise<Resource | string> {
    return this.resourceService.getResources();
  }

  @Post('load')
  async loadResources(@Body() body: { milk: { soy: number; almond: number; whole: number; skimmed: number }, sugar: number, coffeeBean: number }): Promise<Resource> {
    return this.resourceService.loadResources(body.milk, body.sugar, body.coffeeBean);
  }

  @Patch('use')
  async useResources(@Body() body: { [key: string]: number }): Promise<Resource> {
    // Call the resource service to update resources directly
    return this.resourceService.updateResources(body);
  }
}
