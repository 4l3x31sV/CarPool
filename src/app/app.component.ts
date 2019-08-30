import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './providers/storage.service';
import { Usuarios } from './model/UsuariosFace';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public mostrar: boolean= false;
  public appPages = [
    {
      title: 'Soy Conductor',
      url: '/listar-rutas',
      icon: 'car'
    },
    {
      title: 'Soy Pasajero',
      url: '/rutas-pasajero',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    public events: Events,
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#1468D2');
      this.splashScreen.hide();
      this.loadItems();
      this.events.subscribe('user:login', () => {
        this.loadItems();
      });
    });
  }
  loadItems() {
    this.storageService.getItems().then(items => {
      let lstUsuarios:Array<Usuarios> = items;
      if(lstUsuarios) {
        this.mostrar= true;
      }
    });
  }
  
}
