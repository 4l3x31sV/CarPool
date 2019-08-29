import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.page.html',
  styleUrls: ['./menu-inicial.page.scss'],
})
export class MenuInicialPage implements OnInit {

  constructor(
    public navController: NavController,
  ) { }

  ngOnInit() {
  }
  goToConductor() {
    this.navController.navigateForward('/listar-rutas');
  }
  goToPasajero() {
    this.navController.navigateForward('/rutas-pasajero');
  }
}
