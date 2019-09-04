import { Component, OnInit } from '@angular/core';
import { Rutas } from '../model/RutasModel';
import { Usuarios } from '../model/UsuariosFace';
import { UserParamService } from '../providers/user-param.service';
import { RutasService } from '../providers/rutas.service';
import { NavController, ActionSheetController } from '@ionic/angular';
import { NavParamsService } from '../providers/nav-params.service';
import { LoadingService } from '../providers/loading.service';
import { ListaUsuariosService } from '../providers/lista-usuarios.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertService } from '../providers/alert.service';

@Component({
  selector: 'app-rutas-pasajero',
  templateUrl: './rutas-pasajero.page.html',
  styleUrls: ['./rutas-pasajero.page.scss'],
})
export class RutasPasajeroPage implements OnInit {
  public txtBuscarCliente: string;
  public lstRutas:Array<Rutas>=[];
  public lstRutasFiltrado:Array<Rutas> = [];
  public user: Usuarios;
  public lisUsuarios: Array<Usuarios> = [];
  constructor(
    public userParam: UserParamService,
    public rutasService: RutasService,
    public navController: NavController,
    public navParams: NavParamsService,
    public loading: LoadingService,
    public actionSheetController: ActionSheetController,
    public lisUSuariosService: ListaUsuariosService,
    public iab: InAppBrowser,
    public alertService: AlertService
    ) {
      this.user = this.userParam.get();
      this.lisUsuarios = this.lisUSuariosService.get();
    }

  ngOnInit() {
    this.listarRutas();
  }
  public filtrar() {
    this.lstRutasFiltrado = this.lstRutas.filter(
      ruta =>
        ruta.zonaSalida.toLowerCase().indexOf(this.txtBuscarCliente.toLowerCase()) > -1
    );
  }
  seleccionarRuta(ruta: Rutas) {
    this.navParams.set(ruta);
    this.navController.navigateForward('/mapa-rutas');
  }
  listarRutas() {
    this.loading.present();
    this.rutasService.obtenerRutas().subscribe(respuesta => {
      this.lstRutas = Object.assign(respuesta);
      this.lstRutasFiltrado = this.lstRutas;
      this.loading.dismiss();
    });
  }
  abrirWhatsApp(rutas: Rutas) {
    let enviarMensaje= false;
    this.lisUsuarios.forEach(element => {
      if(rutas.idUsuario === element.id) {
        enviarMensaje = true;
        this.iab.create(`https://api.whatsapp.com/send?phone=591` + element.numCelular + `&text=CARPOOL:`, '_system', 'location=yes');
        
        return;
      } else {
        enviarMensaje = false;
      }
    });
    if(!enviarMensaje) {
      this.alertService.present('Alerta!!', 'El Driver no tiene registrado un numero de celular.');

    }
  }
}

