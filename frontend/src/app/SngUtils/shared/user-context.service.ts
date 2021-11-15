// import {Injectable, NgZone} from '@angular/core';
// import {BehaviorSubject} from 'rxjs';
// import {SessionService} from './session.service';
// import {Router} from '@angular/router';
// const defaultUser = null;
// const defaultToken = null;
//
// @Injectable({
//     providedIn: 'root',
// })
// export class UserContextService {
//
//     public user$ = new BehaviorSubject(defaultUser);
//     public profile$ = new BehaviorSubject(defaultUser);
//     public roles$ = new BehaviorSubject(defaultUser);
//
//     _token: string;
//     _user: User = null;
//     _roles: Role[] = [];
//
//     constructor(
//         private session: SessionService,
//         private router: Router) {
//         if (this.user) {
//             this.user$.next(this.user);
//             this.profile$.next(this.user.profile);
//             this.roles$.next(this.user.profile.roles);
//         }
//     }
//
//     public setData(user: User, token) {
//         this.user = user;
//         this.token = token;
//     }
//
//     get isLogged(): boolean {
//         return this.user !== null;
//     }
//
//     get token(): string {
//         if (this._token == null) {
//             this._token = this.session.getItem('tokenKey');
//         }
//         return this._token;
//     }
//
//     set token(value: string) {
//         this._token = value;
//         this.session.setItem('tokenKey', value);
//     }
//
//     get user(): User {
//         if (this._user) {
//             return this._user;
//         }
//         this._user = this.session.getItem('userKey');
//
//         if (this._user) {
//             this.user$.next(this._user);
//             return this._user;
//         }
//         return null;
//     }
//
//     set user(value: User) {
//         this._user = value;
//         this.user$.next(this._user);
//         if (value && value.profile) {
//             this.roles = value.profile.roles;
//         }
//         this.session.setItem('userKey', value);
//     }
//
//     get roles(): Role[] {
//         if (this._roles && this._roles.length > 0) {
//             return this._roles;
//         }
//         this._roles = this.session.getItem('userRolesKey');
//         if (this._roles && this._roles.length > 0) {
//             this.roles$.next(this._roles);
//             return this._roles;
//         }
//         return [];
//     }
//
//     get userConnectedRoles(): string[] {
//         if (this.roles && this.roles.length > 0) {
//             return this.roles.map((role: Role) => role.name);
//         }
//         return [];
//     }
//
//     set roles(value: Role[]) {
//         this._roles = value;
//         this.roles$.next(this._roles);
//         this.session.setItem('userRolesKey', value);
//     }
//
//     public logout(): void {
//         this.user = null;
//         this.roles = null;
//         this.session.removeItem('userToken');
//         this.session.removeItem('tokenKey');
//         this.session.clear();
//         localStorage.clear();
//         this.router.navigate(['/login']);
//     }
// }
