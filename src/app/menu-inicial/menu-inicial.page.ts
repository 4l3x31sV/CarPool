import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { UserParamService } from '../providers/user-param.service';
import { Usuarios } from '../model/UsuariosFace';
import { StorageService } from '../providers/storage.service';
import { UsuariosService } from '../providers/usuarios.service';
import { LoadingService } from '../providers/loading.service';
import { ToastService } from '../providers/toast.service';
import { ListaUsuariosService } from '../providers/lista-usuarios.service';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.page.html',
  styleUrls: ['./menu-inicial.page.scss'],
})
export class MenuInicialPage implements OnInit {

  public obsUSuarios: any;
  public usuario: Usuarios;
  constructor(
    public navController: NavController,
    public alertController: AlertController,
    public userParam: UserParamService,
    private storageService: StorageService,
    private usuarioService: UsuariosService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    public lisUSuariosService: ListaUsuariosService,
  ) {
    
  }

  ngOnInit() {
    this.usuario = this.userParam.get();
    if(!this.usuario.numCelular) {
      this.presentAlertPrompt();
    }
    this.obtenerConductores();
  }
  goToConductor() {
    this.navController.navigateForward('/listar-rutas');
  }
  goToPasajero() {
    this.navController.navigateForward('/rutas-pasajero');
  }
  obtenerConductores() {
    this.obsUSuarios = this.usuarioService.obtenerUsuarios();
    this.obsUSuarios.subscribe(data => {
      this.lisUSuariosService.set(data);
    })
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Registra tu celular!',
      message: 'Para comunicarte mejor con tu Driver o Rider, registra tu numero de celular.',
      inputs: [
        {
          name: 'txtCelular',
          type: 'number',
          id: 'txtCelular',
          label: 'Celular',
          max: 8,
          min: 1,
          placeholder: 'Ej. 60100011'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Registrar',
          handler: (data) => {
            
            this.usuario.numCelular = parseInt(data.txtCelular, 10);
            this.loadingService.present();
            this.usuarioService.crearUsuario(this.usuario)
            .then(res => {
              this.loadingService.dismiss();
              this.storageService.updateItem(this.usuario)
              .then( res2 => {
                this.toastService.presentToast('El dato ha sido registrado correctamente.');
              }).catch(err => {
                this.loadingService.dismiss();
              });
            });
          }
        }
      ]
    });

    await alert.present();
  }
  
}
