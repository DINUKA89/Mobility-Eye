import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonFormComponent } from './components/json-form/json-form.component';

const routes: Routes = [ 
  {path: '', redirectTo: '/Home', pathMatch: 'full'},
  {path: 'Home', component: JsonFormComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
