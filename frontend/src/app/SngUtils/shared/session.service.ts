import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  setItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = sessionStorage.getItem(key);
    return JSON.parse(value);
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }

}
