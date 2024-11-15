import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ResourceValue } from '../schema/model/resourceValue';
import { ResourceDto } from '../schema/dto/resourceDto';
import { LoadResourcesDto } from '../schema/dto/loadResourceDto';
import { ResourceHelperService } from './resource-helper.service';

@Injectable({
  providedIn: 'root', // Ensure the service is provided at the root level
})
export class ResourceService {
  private apiUrl: string = environment.apiEndpoint;

  constructor(private http: HttpClient, private resourceHelper: ResourceHelperService) {}

  public getResources(): Observable<ResourceValue> {
    return this.http.get<ResourceDto>(`${this.apiUrl}resources`).pipe(
      map((resources) => this.resourceHelper.checkResourceStatus(resources))
    );
  }

  public loadResources(payload: LoadResourcesDto): Observable<ResourceDto> {
    return this.http.post<ResourceDto>(`${this.apiUrl}resources/load`, payload);
  }

  public useResources(payload: { [p: string]: string | number }): Observable<any> {
    return this.http.patch<{ [p: string]: string }>(`${this.apiUrl}resources/use`, payload);
  }
}
