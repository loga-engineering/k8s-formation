import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxLoadingModule} from 'ngx-loading';
import {DummyComponent} from './dummy/dummy/dummy.component';
import {ConfirmationDialogComponent} from './dialogs/delete/confirmation.dialog.component';
import {SharedModule} from './parent/shared-module.module';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    DummyComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    NgxLoadingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatNativeDateModule,
    MatDialogModule,
    SharedModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
