import {Injectable} from '@angular/core';
import {CustomMatService} from './CustomMatService';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class LifeSaverService {

  constructor(
    protected location: Location,
    private customMatService: CustomMatService,
    protected router: Router,
    protected route: ActivatedRoute) {
  }

  getRouter(): any {
    return this.router;
  }

  getLocation(): Location {
    return this.location;
  }


  getCustomMatService(): CustomMatService {
    return this.customMatService;
  }

  getRouteParamQuery(key: string): any {
    console.log(this.route.snapshot)
    return this.route.snapshot.queryParams[key];
  }

  getRouteParam(key: string): any {
    return this.route.snapshot.params[key];
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  navigateBack() {
    this.location.back();
  }
}
