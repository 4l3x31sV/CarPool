import { Component, OnInit } from '@angular/core';
import { Rutas } from 'src/app/model/RutasModel';
import { Adress } from 'src/app/model/AdressModel';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { MapaPage } from 'src/app/mapa/mapa.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParamsService } from 'src/app/providers/nav-params.service';
import { Usuarios } from 'src/app/model/UsuariosFace';
import { RutasService } from 'src/app/providers/rutas.service';
import { UserParamService } from 'src/app/providers/user-param.service';
import { LoadingService } from 'src/app/providers/loading.service';
import { ToastService } from 'src/app/providers/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-registro-rutas',
  templateUrl: './registro-rutas.page.html',
  styleUrls: ['./registro-rutas.page.scss'],
})
export class RegistroRutasPage implements OnInit {

  public user: Usuarios = {};
  public frmRegistroRuta: FormGroup;
  public esModificacion: boolean = false;

  public rutas: Rutas = new Rutas();
  public lstDirecciones: Array<Adress> =[];

  public zona:string =null;
  public listaZonas:Array<string> = [];
  public txtRegitradoInicio = '';
  public txtRegitradoDestino = '';
  
  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    public fb: FormBuilder,
    public navParams: NavParamsService,
    public rutaService:RutasService,
    public userParam: UserParamService,
    public loadingService: LoadingService,
    public navController: NavController,
    public toastService: ToastService
    ) {

        this.user = this.userParam.get();
        this.rutas.idUsuario = this.user.id;
    }

  ngOnInit() {
      if(this.navParams.get() != null) {
          this.rutas = this.navParams.get();
          this.esModificacion = true;
      }else{
        this.esModificacion = false;
      }
    this.initValidaciones();
  }
  initValidaciones() {
    this.frmRegistroRuta = this.fb.group({
        vHoraPartida: ['', [
            Validators.required,
        ]],
        vHoraLlegada: ['', [
            Validators.required,
        ]],
        vLugarPartida: ['', [
            Validators.required,
        ]],
        vZonaSalida: ['', [
            Validators.required,
        ]],
        vZonaDestino: ['', [
            Validators.required,
        ]],
        vLugarDestino: ['', [
            Validators.required,
        ]],
        vDias: ['', [
            Validators.required,
        ]],
    });
}

get f(): any {
    return this.frmRegistroRuta.controls;
}
  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
        header: 'Días',
        inputs: [
            {
                name: 'lunes',
                type: 'checkbox',
                label: 'Lunes',
                value: 'LU',
                checked: true
            },

            {
                name: 'martes',
                type: 'checkbox',
                label: 'Martes',
                value: 'MA'
            },

            {
                name: 'miercoles',
                type: 'checkbox',
                label: 'Miércoles',
                value: 'MI'
            },

            {
                name: 'jueves',
                type: 'checkbox',
                label: 'Jueves',
                value: 'JU'
            },

            {
                name: 'viernes',
                type: 'checkbox',
                label: 'Viernes',
                value: 'VI'
            },

            {
                name: 'sabado',
                type: 'checkbox',
                label: 'Sábado',
                value: 'SA'
            },
            {
                name: 'domingo',
                type: 'checkbox',
                label: 'Domingo',
                value: 'DO'
            }
        ],
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    
                }
            }, {
                text: 'Ok',
                handler: (data) => {
                    
                    this.rutas.dias = null;
                    for (let i = 0; i < data.length; i++) {
                        if (this.rutas.dias) {
                            this.rutas.dias = this.rutas.dias + ',' + data[i];
                        } else {
                            this.rutas.dias = data[i];
                        }
                    }
                }
            }
        ]
    });

    await alert.present();
  }
  async adicionarParada() {
    const modal = await this.modalController.create({
      component: MapaPage
    }).then(dato => {
        dato.present();
        dato.onDidDismiss().then(resultado => {
           
            let direcciones: Adress = new Adress(null,null);
            direcciones.lat = resultado.data.lat;
            direcciones.lng = resultado.data.lng;
            this.lstDirecciones.push(direcciones);
         
        });
    });
  }
  async agregarPuntos(tipo: string) {
    const modal = await this.modalController.create({
        component: MapaPage
      }).then(dato => {
          dato.present();
          dato.onDidDismiss().then(resultado => {
              
              let direcciones: Adress = new Adress(null,null);
              direcciones.lat = resultado.data.lat;
              direcciones.lng = resultado.data.lng;
              
              if(tipo==='partida') {
                  this.rutas.puntoInicial = direcciones
                  this.txtRegitradoInicio = 'Punto partida registrado'
              }else{
                this.rutas.puntoFinal = direcciones
                this.txtRegitradoDestino = 'Punto destino registrado'
              }
          });
      });
  }
  public async adicionarZonas() {
      this.listaZonas.push(this.zona);
  }
  async borrarUltimaParada() {
    this.lstDirecciones.pop();
  }
  public borrarRuta() {
      this.rutaService.eliminarRuta(this.rutas.id);
      this.toastService.presentToast('Se ha eliminado el registro correctamente.');
  }
  public registrarRuta() {
      this.loadingService.present();
      let horaInicio = moment(this.rutas.horaPartida).format("HH:mm");
      let horaFin = moment(this.rutas.horaLlegada).format("HH:mm");
      this.rutas.horaPartida = horaInicio;
      this.rutas.horaLlegada = horaFin;
      this.rutas.adress = this.lstDirecciones;
      
      this.rutaService.crearRuta(this.rutas).then(data => {
          
          this.loadingService.dismiss();
          this.toastService.presentToast('Se ha Registrado el registro correctamente.');
          this.navController.navigateBack('/listar-rutas');
      });
  }


}
