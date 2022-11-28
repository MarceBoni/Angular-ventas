import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './vistas/cliente/cliente.component';
import { PedidosComponent } from './vistas/pedidos/pedidos.component'; 
import { CreateComponent } from './vistas/pedidos/create/create.component';
import { EditComponent } from './vistas/pedidos/edit/edit.component';
import { ProductoComponent } from './vistas/producto/producto.component';

const routes: Routes = [
  {path:'',redirectTo:'pedidos',pathMatch:'full'},
  {path:'pedidos', component:PedidosComponent},
  {path:'cliente',component:ClienteComponent},
  {path:'producto',component:ProductoComponent},
  {path:'create', component:CreateComponent},
  {path:'edit/:id', component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponets  = [PedidosComponent,ClienteComponent,ProductoComponent,CreateComponent, EditComponent]
