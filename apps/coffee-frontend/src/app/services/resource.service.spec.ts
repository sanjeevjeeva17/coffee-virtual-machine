import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResourceService } from './resource.service';
import { ResourceHelperService } from './resource-helper.service';
import { environment } from '../environment/environment';
import { ResourceDtoModel } from '../schema/dto/resourceDto.model';
import { LoadResourcesDtoModel } from '../schema/dto/loadResourceDto.model';
import { ResourceValue } from '../schema/model/resourceValue';

describe('ResourceService', () => {
  let service: ResourceService;
  let httpMock: HttpTestingController;
  let resourceHelper: jest.Mocked<ResourceHelperService>;

  beforeEach(() => {
    const resourceHelperMock: jest.Mocked<ResourceHelperService> = {
      checkResourceStatus: jest.fn(),
    } as unknown as jest.Mocked<ResourceHelperService>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ResourceService,
        { provide: ResourceHelperService, useValue: resourceHelperMock },
      ],
    });

    service = TestBed.inject(ResourceService);
    httpMock = TestBed.inject(HttpTestingController);
    resourceHelper = TestBed.inject(ResourceHelperService) as jest.Mocked<ResourceHelperService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getResources and map the response using resourceHelper', () => {
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
      almond: 20,
      skimmed: 15,
      soy: 30,
      whole: 25,
      sugar: 10,
      coffeeBean: 35,
      message: 'Resource check successful',
    };

    const mockResourceValue: ResourceValue = {
      almond: 20,
      skimmed: 15,
      soy: 30,
      whole: 25,
      sugar: 10,
      coffeeBean: 35,
      message: 'Resource check successful',
    };

    resourceHelper.checkResourceStatus.mockReturnValue(mockResourceValue);

    service.getResources().subscribe((resources) => {
      expect(resources).toEqual(mockResourceValue);
      expect(resourceHelper.checkResourceStatus).toHaveBeenCalledWith(mockResourceDto);
    });

    const req = httpMock.expectOne(`${environment.apiEndpoint}resources`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResourceDto);
  });

  it('should call loadResources and return ResourceDtoModel', () => {
    const mockLoadResourcesDto: LoadResourcesDtoModel = {
      milk: {
        soy: 10,
        almond: 5,
        whole: 15,
        skimmed: 20,
      },
      sugar: 5,
      coffeeBean: 10,
    };

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
      almond: 25,
      skimmed: 35,
      soy: 40,
      whole: 30,
      sugar: 15,
      coffeeBean: 45,
      message: 'Resources loaded successfully',
    };

    service.loadResources(mockLoadResourcesDto).subscribe((response) => {
      expect(response).toEqual(mockResourceDto);
    });

    const req = httpMock.expectOne(`${environment.apiEndpoint}resources/load`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLoadResourcesDto);
    req.flush(mockResourceDto);
  });

  it('should call useResources and return the expected response', () => {
    const mockPayload = {
      almond: 5,
      sugar: 2,
      coffeeBean: 3,
    };

    const mockResponse = {
      message: 'Resources used successfully',
    };

    service.useResources(mockPayload).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiEndpoint}resources/use`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockPayload);
    req.flush(mockResponse);
  });
});
