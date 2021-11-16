import {ParentEntity} from './ParentEntity';
import * as moment from 'moment';
import {LifeSaverService} from '../SngUtils/lifesaver.service';

export abstract class ParentComponent<T extends ParentEntity> {

  rights: string[];
  listPanel: boolean;
  formPanel: boolean;
  invoiceIndicator: boolean;
  totalElements: any;
  deleteConfirmationMessage = 'Voulez vous vraiment supprimer cet element?';
  loading: boolean;

  now: Date = new Date();
  sngLoadingIndicator: boolean;

  // ROLEMAP = ROLEMAP;

  constructor(protected lsf: LifeSaverService) {
  }

  compareById(ob1, ob2) {
    return ob1.id === ob2.id;
  }

  ddMMyyyy(date: Date) {
    return moment(date).format('L');
  }

  currentTime() {
    return moment(new Date()).format('LTS');
  }

  startLoading() {
    this.sngLoadingIndicator = true;
  }

  endLoading() {
    this.sngLoadingIndicator = false;
  }

  currency(value: any, devise?: string) {
    const cur = devise === 'EURO' ? 'EUR' : devise === 'DOLLAR' ? 'USD' : 'XOF';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: cur
    }).format(value);
  }

  navigate(url: string) {
    this.lsf.navigateTo(url);
  }

}
