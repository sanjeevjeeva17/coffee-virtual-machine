export interface MilkDto {
  soy: number;
  almond: number;
  whole: number;
  skimmed: number;
}

export interface LoadResourcesDto {
  milk: MilkDto;
  sugar: number;
  coffeeBean: number
}
