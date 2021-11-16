import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ParentEntity} from './ParentEntity';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class ParentService<T extends ParentEntity> {


  constructor(protected httpClient: HttpClient) {
  }

  protected abstract address(): string;

  protected getProjectUrl(): string {
    return environment.serverUrl;
  }

  protected handleError(error) {
    return throwError(error);
  }

  protected get baseOption() {
    const token = localStorage.getItem('userToken');
    const _headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });
    return {headers: _headers};
  }

  protected get downloadOption(): any {
    const token = localStorage.getItem('skeleton_auth_token');
    const _headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });
    return {headers: _headers, responseType: 'blob'};
  }

  public delete(id: number) {
    return this.httpClient
      .delete(encodeURI(this.getProjectUrl() + this.address() + '/' + id), this.baseOption)
      .pipe(catchError(this.handleError));
  }


  public findById(id: number) {
    return this.httpClient
      .get<T>(encodeURI(this.getProjectUrl() + this.address() + '/find-by-id?id=' + id))
      .pipe(catchError(this.handleError));
  }


  public findAll() {
    return this.httpClient
      .get<T[]>(encodeURI(this.getProjectUrl() + this.address() + '/find-all'), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public update(id: number, entity: T) {
    return this.httpClient
      .put(encodeURI(this.getProjectUrl().concat(this.address() + '/' + id)), JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public find(id: number) {
    return this.httpClient
      .get(encodeURI(this.getProjectUrl() + this.address() + '/' + id), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  customSearch(wording: string, size?: number, page?: number): any {
    page = page || 0;
    size = size || 10;
    return this.httpClient.get<T[]>(
      encodeURI(this.getProjectUrl() + this.address() + '/custom-search?wording=' + wording + '&size=' + size + '&page=' + page), this.baseOption
    );
  }

  public findAllPage(page: number, size?: number) {
    size = size === undefined ? 5 : size;
    return this.httpClient
      .get<T[]>(encodeURI(this.getProjectUrl() + this.address() + '?size=' + size + '&page=' + page), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public create(entity: T) {
    return this.httpClient
      .post(encodeURI(this.getProjectUrl().concat(this.address())), JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }


}
