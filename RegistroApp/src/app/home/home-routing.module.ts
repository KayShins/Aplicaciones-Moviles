import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MisDatosComponent } from '../mis-datos/mis-datos.component';
import { ConsultarDatosComponent } from '../consultar-datos/consultar-datos.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path:'misDatos',
        component:MisDatosComponent
      },
      {
        path:'consultar-datos',
        component: ConsultarDatosComponent
      },
      {
        path:'usuarios',
        component: UsuariosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
