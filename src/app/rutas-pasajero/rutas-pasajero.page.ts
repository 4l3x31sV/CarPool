import { Component, OnInit } from '@angular/core';
import { Rutas } from '../model/RutasModel';
import { Usuarios } from '../model/UsuariosFace';
import { UserParamService } from '../providers/user-param.service';
import { RutasService } from '../providers/rutas.service';
import { NavController, ActionSheetController } from '@ionic/angular';
import { NavParamsService } from '../providers/nav-params.service';
import { LoadingService } from '../providers/loading.service';

@Component({
  selector: 'app-rutas-pasajero',
  templateUrl: './rutas-pasajero.page.html',
  styleUrls: ['./rutas-pasajero.page.scss'],
})
export class RutasPasajeroPage implements OnInit {
  public txtBuscarCliente: string;
  private lstRutas:Array<Rutas>=[];
  private lstRutasFiltrado:Array<Rutas>=[];
  private user: Usuarios;
  constructor(public userParam: UserParamService,
    public rutasService: RutasService,
    public navController: NavController,
    public navParams: NavParamsService,
    public loading: LoadingService,
    public actionSheetController: ActionSheetController,) { 
      this.user = this.userParam.get();
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
    //this.navController.navigateRoot('/mapa-ruta');
    console.log(ruta);
  }
  listarRutas() {
    this.loading.present();
    this.rutasService.obtenerRutas().subscribe(respuesta => {
      this.lstRutas = Object.assign(respuesta);
      this.lstRutasFiltrado = this.lstRutas;
      this.loading.dismiss();
    });
  }
}

