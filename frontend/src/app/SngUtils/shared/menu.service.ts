// import { UserContextService } from './user-context.service';
// import { Injectable } from '@angular/core';
// import { User } from '../PermissionEntity';
//
// declare interface RouteInfo {
//   path: string;
//   title: string;
//   icon: string;
//   class: string;
//   role: string;
// }
//
// @Injectable({
//   providedIn: 'root',
// })
// export class MenuService {
//   currentMenus: any[];
//   projectInfos: any;
//
//   menus: RouteInfo[] = [
//     {
//       path: '/dashboard',
//       title: 'Dashboard',
//       icon: 'dashboard',
//       class: '',
//       role: ROLEMAP.VIEW_DASHBOARD,
//     },
//     {
//       path: '/soumission-rapports',
//       title: 'Soumission Rapport',
//       icon: 'description',
//       class: '',
//       role: ROLEMAP.VIEW_SOUMISSIONRAPPORT,
//     },
//     {
//       path: '/professional-training',
//       title: 'Formations Professionnelles',
//       icon: 'account_box',
//       class: '',
//       role: ROLEMAP.VIEW_FORMATIONPROFESSIONNELLE,
//     },
//     // {
//     //     path: '/projet-programmes',
//     //     title: 'Projet programme',
//     //     icon: 'contact_support',
//     //     class: '',
//     //     role: ROLEMAP.VIEW_PROJETPROGRAMME
//     // },
//     {
//       path: '/amenagements',
//       title: 'Amenagements',
//       icon: 'view_module',
//       class: '',
//       role: ROLEMAP.VIEW_AMENAGEMENT,
//     },
//     {
//       path: '/appreciation-grilles',
//       title: 'Grille d\'apreciation',
//       icon: 'analytics',
//       class: '',
//       role: ROLEMAP.VIEW_APPRECIATIONGRILLE,
//     },
//     {
//       path: '/producteurs',
//       title: 'Producteurs',
//       icon: 'supervisor_account',
//       class: '',
//       role: ROLEMAP.VIEW_PRODUCTEUR,
//     },
//     {
//       path: '/reporting',
//       title: 'Reporting',
//       icon: 'leaderboard',
//       class: '',
//       role: ROLEMAP.VIEW_DASHBOARD,
//     },
//     {
//       path: '/users',
//       title: 'Utilisateur',
//       icon: 'person',
//       class: '',
//       role: ROLEMAP.VIEW_USER,
//     },
//     {
//       path: '/profiles',
//       title: 'Profiles',
//       icon: 'account_box',
//       class: '',
//       role: ROLEMAP.VIEW_PROFILE,
//     },
//     {
//       path: '/logs',
//       title: 'Log',
//       icon: 'contact_support',
//       class: '',
//       role: ROLEMAP.VIEW_LOGS,
//     },
//   ];
//
//   constructor(private userContextService: UserContextService) {}
//
//   reloadMenus() {
//     let rights = this.userContextService.roles$.value;
//     rights = rights || [];
//     rights = rights.map((r) => r.name);
//     const menus = this.menus;
//     this.currentMenus = this.filterMenus(menus, rights);
//   }
//
//   filterMenus(allMenus, roles) {
//     return allMenus.filter((menu) => this.hasRight(menu.role, roles));
//   }
//
//   public hasRight(value: ROLEMAP, rights) {
//     const key = Object.keys(ROLEMAP).find((k) => ROLEMAP[k] === value);
//     return rights && rights.includes(key);
//   }
//
//   getCurrentUser() {
//     return this.userContextService._user;
//   }
// }
