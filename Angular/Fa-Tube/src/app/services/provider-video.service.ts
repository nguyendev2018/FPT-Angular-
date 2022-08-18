import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TubeDataApiV3Service } from './tube-data-api-v3.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderVideoService implements Resolve<any> {

  constructor(private tubeDataApiV3Service: TubeDataApiV3Service) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
    const id = route.paramMap.get('id');
    if (id) {

      return this.tubeDataApiV3Service.getVideo(id);
    }
    return '';

  }


}

