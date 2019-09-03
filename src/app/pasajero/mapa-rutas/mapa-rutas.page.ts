import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AlertService } from 'src/app/providers/alert.service';
import { Observable } from 'rxjs';
import { NavParamsService } from 'src/app/providers/nav-params.service';
import { Rutas } from 'src/app/model/RutasModel';


declare var google;
@Component({
  selector: 'app-mapa-rutas',
  templateUrl: './mapa-rutas.page.html',
  styleUrls: ['./mapa-rutas.page.scss'],
})
export class MapaRutasPage implements OnInit {
  @ViewChild('maps', {static:true}) mapElement: ElementRef;
  
  maps: any;
  latitud: number;
  longitud: number;
  paginaRetorno: string;
  rutas: Rutas;
  constructor(
    public toastCtrl: ToastService,
    public modalController: ModalController,
    public alertController: AlertService,
    public navParams: NavParamsService,
    public nanController: NavController
    
  ) { }

  ngOnInit() {
    try{
      this.rutas = this.navParams.get();
    
      this.cargarMapa();
    }catch(error) {
      this.toastCtrl.presentToast('Hubo un error al ingresar intenta nuevamente...');
      this.nanController.navigateBack('/rutas-pasajero');
    }
  }
  cargarMapa() {
    let myLatlng = this.rutas.puntoInicial;
    const mapOptions = {
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullScreenControl: false,
      zoomControl: false,
      scaleControl: false,
      rotateControl: false,
      fullscreenControl: false,
      center: myLatlng
    };
    this.latitud = myLatlng.lat;
    this.longitud = myLatlng.lng;
    this.maps = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker, marker2: any;
    let markers: any= [];
    marker = new google.maps.Marker
    ({
      position: this.rutas.puntoInicial,
      map: this.maps,
      draggable: false,
      animation: google.maps.Animation.DROP,
      label: 'I'
    });
    marker2 = new google.maps.Marker
    ({
      position: this.rutas.puntoFinal,
      map: this.maps,
      draggable: false,
      animation: google.maps.Animation.DROP,
      label: 'F'
    });
    if(this.rutas.adress) {
      for(let direcciones of this.rutas.adress) {
        let markerAddress = new google.maps.Marker
        ({
          position: direcciones,
          map: this.maps,
          draggable: false,
          animation: google.maps.Animation.DROP,
        });
      }
    }
  }
}
