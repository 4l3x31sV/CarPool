import { Component, OnInit } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Usuarios } from '../model/UsuariosFace';
import { StorageService } from '../providers/storage.service';
import { NavController } from '@ionic/angular';
import { UserParamService } from '../providers/user-param.service';
import { UsuariosService } from '../providers/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: Usuarios = new Usuarios();
  showUser: boolean = false;
  constructor(
    private facebook: Facebook,
    private storageService: StorageService,
    private navController: NavController,
    public userParam: UserParamService,
    public userService: UsuariosService
    ) { }

  ngOnInit() {
    this.loadItems();
  }
  loginFacebook(){
    this.facebook.login(['public_profile', 'email'])
    .then(rta => {
      console.log(rta.status);
      if(rta.status == 'connected'){
        this.getInfo();
      };
    })
    .catch(error =>{
      console.error( error );
    });
  }

  getInfo(){
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
    .then(data=>{
      console.log(JSON.stringify(data));
      console.log(data);
      this.showUser = true; 
      this.user =  Object.assign(data);
      if(this.user) {
        this.storageService.addItem(this.user).then(resp => {
          console.log(resp);
          this.userParam.set(this.user);
          
          this.navController.navigateRoot('/menu-inicial');
          
        })
      }

    })
    .catch(error =>{
      console.error( error );
    });
  }
  loadItems() {
    this.storageService.getItems().then(items => {
      let lstUsuarios:Array<Usuarios> = items;
      console.log(items);
      if(lstUsuarios) {
        this.user = lstUsuarios[0];
        this.userParam.set(this.user);
        this.navController.navigateRoot('/menu-inicial');
      }
    });
  }
  
}
