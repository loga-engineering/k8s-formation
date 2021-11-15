import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DummyComponent} from './dummy/dummy/dummy.component';
import {SharedModule} from './parent/shared-module.module';

const routes: Routes = [
  {path: '', component: DummyComponent},
  {path: 'dummies', component: DummyComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
