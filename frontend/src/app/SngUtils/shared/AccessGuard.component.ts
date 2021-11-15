import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {root} from 'rxjs/internal-compatibility';
import {UserContextService} from '../shared/user-context.service';
import {ROLEMAP} from '../../permission/profile/ROLEMAP';


@Injectable({
    providedIn: 'root'
})
export class RouteControllerService implements CanActivate {

    constructor(private router: Router,
                private userContextService: UserContextService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLoggedIn = this.userContextService.isLogged;
        if (!isLoggedIn) {
            this.router.navigateByUrl('login');
            console.log('User not logged in')
            return false;
        }
        const rights = this.userContextService.userConnectedRoles;
        const accessKey = route.data['accessKey'];
        const hasRight = this.checkAccess(accessKey, rights);
        console.log('isLoggedIn ==> ', isLoggedIn);
        console.log('hasRight ==> ', hasRight);
        if (accessKey === ROLEMAP.SUPER_KEY){
            return true;
        }
        if (!hasRight) {
            this.router.navigateByUrl('login');
            console.log('User doesnt have access key');
            return false;
        }
        return isLoggedIn && hasRight;
    }


    checkAccess(accessKey, rights): boolean {
        console.log('checkAccess');
        accessKey = this.getEnumKey(accessKey);
        console.log('rights ==> ', rights);
        console.log('accessKey ==> ', accessKey);
        return rights && rights.length > 0 && accessKey && rights.includes(accessKey);
    }

    getEnumKey(value): ROLEMAP {
        return Object.keys(ROLEMAP).find(keyy => ROLEMAP[keyy] === value) as ROLEMAP;
    }
}
