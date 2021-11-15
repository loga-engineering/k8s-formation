import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DummyService} from '../DummyService';
import {LifeSaverService} from '../../SngUtils/lifesaver.service';
import {Dummy} from '../dummy';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Helpers} from '../../SngUtils/helpers';
import {transformResponseEntity} from '../../SngUtils/LifeSaver';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['dummy.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: []
})
export class DummyComponent implements OnInit, AfterViewInit {

  // SNG coding...
  datasource = new MatTableDataSource<Dummy>();
  searchControl = new FormControl();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  model: Dummy;
  form: FormGroup;
  formBuilder: FormBuilder;
  editing: boolean;

  totalElements: number;
  row: number;
  entities: any[];
  pageIndex = 0;
  displayedColumns = ['wording', 'description', 'createdDate', 'actions'];
  listView = true;

  sngLoadingIndicator: boolean;

  constructor(protected service: DummyService,
              private snackBar: MatSnackBar,
              protected lsf: LifeSaverService) {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value => this.datasource.filter = value);
    this.loadAll();

    this.model = new Dummy();
    this.formBuilder = new FormBuilder();
    this.buildForm();
    this.subscribe();
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.filter = '';
    this.datasource.paginator = this.paginator;
  }

  goToForm(): void {
    this.showFormPanel();
  }

  showEdit(model: Dummy): void {
    // this.lsf.navigateTo('form?id=' + model.id);
    this.setFormData(model);
    this.showFormPanel();
  }

  setFormData(model: Dummy): void {
    this.model = {...model};
    this.form.get('wording').setValue(model.wording);
    this.form.get('description').setValue(model.description);
  }

  loadAll(): void {
    this.service.findAll().subscribe(data => {
      const entities = Helpers.getOthers(data);
      console.log('this.entities ==> ', entities);
      this.datasource.data = entities;
    });
  }

  delete(model: Dummy, msg?: string): void {
    msg = 'Voulez vous vraiment supprimer ' + msg;
    const buttonText = {ok: 'Supprimer', cancel: 'Annuler'};
    const func = () => {
      this.startLoading();
      this.service.delete(model.id).subscribe(value => {
        console.log('parent delete ok');
        this.loadAll();
        this.endLoading();
        this.showSuccess('Supprimé avec succès');
      }, error => {
        console.log('error occurrred');
        this.showError(error);
        this.endLoading();
      });
    };
    this.lsf.getCustomMatService().showConfirmation(msg, func, buttonText);
  }

  toDate(date: Date): string {
    return Helpers.formatDate(date);
  }

  protected buildForm(): void {
    this.form = this.formBuilder.group({
      wording: [this.model.wording, [Validators.required]],
      description: [this.model.description],
    });
  }

  protected subscribe(): void {
    if (!this.form) {
      this.buildForm();
    }
    this.form.get('wording').valueChanges.subscribe(value => this.model.wording = value);
    this.form.get('description').valueChanges.subscribe(value => this.model.description = value);
  }

  private initializeModel(): void {
    this.model = new Dummy();
    // this.form.reset();
    // this.form.get('wording').setValue('');
  }

  // HTTP METHODS
  save(): void {
    if (!this.model) {
      return;
    }
    this.startLoading();
    this.service.create(this.model).subscribe((data: any) => {
      this.model = transformResponseEntity(data) as any;
      this.afterSave();
      this.endLoading();
    }, error => {
      this.showError(error);
      this.showError('Opération echouée');
      this.endLoading();
    });
  }

  update(): void {
    if (!this.model) {
      return;
    }
    this.startLoading();
    this.service.update(this.model.id, this.model).subscribe((data: any) => {
      this.model = transformResponseEntity(data) as any;
      this.afterSave();
      this.endLoading();
    }, error => {
      this.showError(error);
      this.endLoading();
    });
  }

  showSuccess(msg: string, action?, duration?): void {
    msg = msg || 'Opération reussi avec succèss';
    this.snackBar.open(msg, action, {
      duration: duration ? duration : 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private showError(msg: string, action?, duration?): void {
    msg = msg || 'Opération reussi avec succèss';
    this.snackBar.open(msg, action, {
      duration: duration ? duration : 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  startLoading(): void {
    this.sngLoadingIndicator = true;
  }

  endLoading(): void {
    this.sngLoadingIndicator = false;
  }

  private showFormPanel(): void {
    // // const x = document.getElementsByClassName('sng-form-container').item(0);
    // // x.className = 'animate.min.css';
    //
    // const doc = document.getElementById('form-id');
    // const className = doc.className;
    // console.log('className === ', className);
    // // doc.className = 'animate__slideInDown';
    // doc.className = className + ' reddy';
    // // doc.setAttribute('readonly', 'true');
    // console.log('doc.className === ', doc.className);
  }


  afterSave(): void {
    this.loadAll();
    this.model = new Dummy();
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    });
    this.showSuccess('Opération effectuée avec succès');
  }
}
