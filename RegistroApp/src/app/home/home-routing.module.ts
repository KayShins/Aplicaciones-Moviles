import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MisDatosComponent } from '../mis-datos/mis-datos.component';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path:'misDatos',
        component:MisDatosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
