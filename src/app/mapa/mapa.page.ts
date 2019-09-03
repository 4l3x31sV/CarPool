import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastService } from '../providers/toast.service';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../providers/alert.service';
import { Observable } from 'rxjs';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  @ViewChild('map', {static:true}) mapElement: ElementRef;
  
  map: any;
  latitud: number;
  longitud: number;
  paginaRetorno: string;
  constructor(
    public toastCtrl: ToastService,
    public modalController: ModalController,
    public alertController: AlertService
  ) { }

  ngOnInit() {
    this.cargarMapa();
  }
  cargarMapa() {
    let myLatlng = { lat: -16.4971653, lng: -68.1320507};
    const mapOptions = {
      zoom: 16,
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
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker: any;
    marker = new google.maps.Marker
    ({
      position: myLatlng,
      map: this.map,
      draggable: true,
      title: 'Mueveme',
      animation: google.maps.Animation.DROP
    });
    let respuesta = this.markerEvent(marker);
    respuesta.subscribe(obj => {
              console.log(obj);
              this.latitud = obj.lat;
              this.longitud = obj.lng;
            });
  }
  markerEvent(marker): Observable<any> {
    return Observable.create((observer) => {
      
      marker.addListener('dragend', () => {
        
        const objStr: string = JSON.stringify(marker.getPosition());
        const obj = JSON.parse(objStr);
        observer.next(obj);
        observer.complete();
      });
      
  });
  }
  guardarLatLong() {
    if(this.latitud && this.longitud){
      this.toastCtrl.presentToast('Los datos fueron guardados exitosamente');
      this.modalController.dismiss({
        lat: this.latitud,
        lng: this.longitud
    });
    } else {
      this.alertController.present('Alerta', 'Debes seleccionar un punto antes de terminar.');
    }
  }
}
