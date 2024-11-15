import { ResourceHelperService } from './resource-helper.service';
import { ResourceValue } from '../schema/model/resourceValue';

describe('ResourceHelperService', () => {
  let service: ResourceHelperService;

  beforeEach(() => {
    service = new ResourceHelperService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly calculate resource percentages', () => {
    const mockResourceDto: {
      coffeeBean: number;
      almond: number;
      whole: number;
      id: number;
      soy: number;
      message: string;
      skimmed: number;
      sugar: number
    } = {
      id: 1,
      almond: 1,
      skimmed: 0.5,
      soy: 1.5,
      whole: 2,
      sugar: 0.5,
      coffeeBean: 0.3,
      message: 'Initial resources',
    };

    const expectedResourceValue: ResourceValue = {
      almond: 50,
      skimmed: 25,
      soy: 75,
      whole: 100,
      sugar: 50,
      coffeeBean: 30,
      message: 'Resource levels in percentages.',
    };

    const result = service.checkResourceStatus(mockResourceDto);
    expect(result).toEqual(expectedResourceValue);
  });

  it('should return the correct message when resources are present', () => {
    const mockResourceDto: {
      coffeeBean: number;
      almond: number;
      whole: number;
      id: number;
      soy: number;
      message: string;
      skimmed: number;
      sugar: number
    } = {
      id: 3,
      almond: 0.8,
      skimmed: 0.7,
      soy: 0.6,
      whole: 0.9,
      sugar: 0.4,
      coffeeBean: 0.5,
      message: 'Partial resources',
    };

    const result = service.checkResourceStatus(mockResourceDto);
    expect(result.message).toBe('Resource levels in percentages.');
  });
});
