import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async getResources(): Promise<Resource> {
    const resources = await this.resourceRepository.findOne({ where: {} });
    if (!resources) {
      return { almond: 0, id: 0, skimmed: 0, soy: 0, sugar: 0, whole: 0, coffeeBean: 0 } as Resource;
    }
    return resources;
  }

  async loadResources(milk: { soy: number; almond: number; whole: number; skimmed: number }, sugar: number, coffeeBean: number): Promise<Resource> {
    const existingResource = await this.resourceRepository.findOne({ where: {} });
    if (existingResource) {
      existingResource.soy = milk.soy;
      existingResource.almond = milk.almond;
      existingResource.whole = milk.whole;
      existingResource.skimmed = milk.skimmed;
      existingResource.sugar = sugar;
      existingResource.coffeeBean = coffeeBean;
      return this.resourceRepository.save(existingResource);
    } else {
      const newResource = this.resourceRepository.create({
        soy: milk.soy,
        almond: milk.almond,
        whole: milk.whole,
        skimmed: milk.skimmed,
        sugar: sugar,
        coffeeBean: coffeeBean,
      });
      return this.resourceRepository.save(newResource);
    }
  }

  async updateResources(resourceUsage: { [key: string]: number }): Promise<Resource> {
    const resources = await this.resourceRepository.findOne({ where: {} });
    if (!resources) {
      throw new NotFoundException('Resources are not loaded yet. Please load resources first.');
    }

    // Check if each resource is sufficient
    for (const key in resourceUsage) {
      if (resources[key] === undefined) {
        throw new Error(`Invalid resource key: ${key}`);
      }
      if (resources[key] < resourceUsage[key]) {
        throw new Error(`Insufficient ${key} to complete the order`);
      }
    }

    // Subtract the used amounts
    for (const key in resourceUsage) {
      resources[key] -= resourceUsage[key];
    }

    return this.resourceRepository.save(resources);
  }
}
