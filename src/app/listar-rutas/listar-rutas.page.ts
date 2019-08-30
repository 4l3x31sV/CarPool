import { Component, OnInit } from '@angular/core';
import { RutasService } from '../providers/rutas.service';
import { UserParamService } from '../providers/user-param.service';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Rutas } from '../model/RutasModel';
import { Usuarios } from '../model/UsuariosFace';
import { NavParamsService } from '../providers/nav-params.service';
import { LoadingService } from '../providers/loading.service';

@Component({
  selector: 'app-listar-rutas',
  templateUrl: './listar-rutas.page.html',
  styleUrls: ['./listar-rutas.page.scss'],
})
export class ListarRutasPage implements OnInit {
  public lstRutas:Array<Rutas>=[];
  public user: Usuarios;
  constructor(
    public userParam: UserParamService,
    public rutasService: RutasService,
    public navController: NavController,
    public navParams: NavParamsService,
    public loading: LoadingService,
    public actionSheetController: ActionSheetController,
  ) {
    this.user = this.userParam.get();
   
   }

  ngOnInit() {
    this.listarRutas();
  }
  listarRutas() {
    this.loading.present();
    this.rutasService.rutasPorUsuario(this.user.id).subscribe(respuesta => {
      this.lstRutas = Object.assign(respuesta);
     
      this.loading.dismiss();
    });
  }
  registrarRuta() {
    this.navController.navigateForward('/registro-rutas');
  }

  seleccionarRuta(ruta: Rutas) {
    this.navParams.set(ruta);
    this.navController.navigateForward('/registro-rutas');
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones Rutas',
      buttons: [
      {
        text: 'Nueva Ruta',
        icon: 'calendar',
        handler: () => {
          
          this.navParams.set(null);
          this.registrarRuta();
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }

}
