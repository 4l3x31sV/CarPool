import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registro-rutas', loadChildren: './conductor/registro-rutas/registro-rutas.module#RegistroRutasPageModule' },
  { path: 'menu-inicial', loadChildren: './menu-inicial/menu-inicial.module#MenuInicialPageModule' },
  { path: 'mapa', loadChildren: './mapa/mapa.module#MapaPageModule' },
  { path: 'registro-usuario', loadChildren: './registro-usuario/registro-usuario.module#RegistroUsuarioPageModule' },  { path: 'listar-rutas', loadChildren: './listar-rutas/listar-rutas.module#ListarRutasPageModule' },
  { path: 'rutas-pasajero', loadChildren: './rutas-pasajero/rutas-pasajero.module#RutasPasajeroPageModule' },
  { path: 'mapa-rutas', loadChildren: './pasajero/mapa-rutas/mapa-rutas.module#MapaRutasPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
