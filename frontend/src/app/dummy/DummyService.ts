import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ParentService} from '../parent/ParentService';
import {Dummy} from './dummy';

@Injectable({
  providedIn: 'root'
})
export class DummyService extends ParentService<Dummy> {

  protected static get baseOption() {
    const _headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return {headers: _headers};
  }

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  protected address(): string {
    return '/dummies';
  }

}
