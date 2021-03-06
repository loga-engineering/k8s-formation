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

  showEdit(model: Dummy): void {
    // this.lsf.navigateTo('form?id=' + model.id);
    this.setFormData(model);
    this.listView = false;
  }

  setFormData(model: Dummy): void {
    this.model = {...model};
    this.form.get('wording').setValue(model.wording);
    this.form.get('description').setValue(model.description);
  }

  loadAll(): void {
    this.startLoading();
    this.service.findAll().subscribe(data => {
      const entities = Helpers.getOthers(data);
      console.log('this.entities ==> ', entities);
      this.datasource.data = entities;
      this.endLoading();
    }, error => {
      this.showError(error);
      this.endLoading();
    });
  }

  // NINA
  // RCCN REGISTRE DU COMMERCE
  // NIF N?? D'ide fiscal'
  // ATC ISO CERTIFIE 9001
  // SOMISY
  // RESOLUTE australienne

  delete(model: Dummy, msg?: string): void {
    msg = 'Voulez vous vraiment supprimer ' + msg;
    const buttonText = {ok: 'Supprimer', cancel: 'Annuler'};
    const func = () => {
      this.startLoading();
      this.service.delete(model.id).subscribe(value => {
        console.log('parent delete ok');
        this.afterSave();
        this.endLoading();
        this.showSuccess('Supprim?? avec succ??s');
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
      this.showError('Op??ration echou??e');
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
    msg = msg || 'Op??ration reussi avec succ??ss';
    this.snackBar.open(msg, action, {
      duration: duration ? duration : 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private showError(msg: string, action?, duration?): void {
    msg = msg || 'Op??ration reussi avec succ??ss';
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

  afterSave(): void {
    this.loadAll();
    this.model = new Dummy();
    // this.form.reset();
    // Object.keys(this.form.controls).forEach(key => {
    //   this.form.get(key).markAsPristine();
    // });

    this.buildForm();
    this.subscribe();
    this.showSuccess('Op??ration effectu??e avec succ??s');
  }

  goToForm(): void {
    this.listView = false;
  }
}
