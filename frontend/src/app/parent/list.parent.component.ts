// import {ParentComponent} from './parent.component';
// import {Injectable} from '@angular/core';
// import {ParentEntity} from './ParentEntity';
// import * as moment from 'moment';
// import {ParentService} from './ParentService';
// import {LifeSaverService} from '../SngUtils/lifesaver.service';
// import {transformResponseEntity} from '../SngUtils/LifeSaver';
//
// @Injectable()
// export abstract class ListParentComponent<T extends ParentEntity, S extends ParentService<T>> extends ParentComponent<T> {
//
//     totalRecords: number;
//     row = 10;
//     models: T[];
//     searchKey: string;
//     sngLoadingIndicator: boolean;
//
//     constructor(protected service: S,
//                 protected lsf: LifeSaverService) {
//         super(lsf);
//         this.init();
//     }
//
//     goBack() {
//         this.lsf.getLocation().back();
//     }
//
//     ddMMyyyy(date: Date) {
//         return moment(date).format('L');
//     }
//
//     currentTime() {
//         return moment(new Date()).format('LTS');
//     }
//
//     getTotalElementss(data, entites?: any[]) {
//         return !data
//             ? 0
//             : data.hasOwnProperty('totalElements')
//                 ? data.totalElements
//                 : data.hasOwnProperty('length')
//                     ? data.length
//                     : entites
//                         ? entites.length
//                         : 0;
//     }
//
//     startLoading() {
//         this.sngLoadingIndicator = true;
//     }
//
//     endLoading() {
//         this.sngLoadingIndicator = false;
//     }
//
//     currency(value: any, devise?: string) {
//         const cur = devise === 'EURO' ? 'EUR' : devise === 'DOLLAR' ? 'USD' : 'XOF';
//         return new Intl.NumberFormat('fr-FR', {
//             style: 'currency',
//             currency: cur
//         }).format(value);
//     }
//
//     paginate(page) {
//         this.startLoading();
//         this.service.findAllPage(page).subscribe((data: any) => {
//             this.models = transformResponseEntity(data).getData() as any;
//             this.totalRecords = this.getTotalElements(data);
//             this.endLoading();
//         }, error => {
//             // this.showError(error);
//             this.endLoading();
//         });
//     }
//
//     getTotalElements(data): number {
//         return this.getTotalElementss(data, this.models);
//     }
//
//     delete(model: T, msg?: string): void {
//         msg = msg ? 'Voulez vous vraiment supprimer ' + msg : this.deleteConfirmationMessage + '?';
//         const buttonText = {ok: 'Supprimer', cancel: 'Annuler'};
//         const func = () => {
//             this.startLoading();
//             this.service.delete(model.id).subscribe(value => {
//                 console.log('parent delete ok');
//                 this.goToList();
//                 this.initModels();
//                 this.endLoading();
//                 this.showSuccess('Supprimé avec succès');
//             }, error => {
//                 console.log('error occurrred');
//                 this.showError(error);
//                 this.endLoading();
//             });
//         };
//         this.lsf.getCustomMatService().showConfirmation(msg, func, buttonText);
//     }
//
//     // protected initModels() {
//     initModels(): void {
//         this.paginate(0);
//         this.searchKey = '';
//     }
//
//     customSearch(): void {
//         this.startLoading();
//         this.endLoading();
//     }
//
//     private init() {
//     }
// }
