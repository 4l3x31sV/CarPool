import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFireModule } from '@angular/fire';
import { FirebaseCarpoolService } from './providers/firebase-carpool.service';
import { MapaPageModule } from './mapa/mapa.module';

import { IonicStorageModule } from '@ionic/storage';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
export const firebaseConfig = {
  apiKey: "AIzaSyA0_JmYHNdmJSZAlEOECCDgGvs52OTxeqU",
  authDomain: "car-pool-54eb7.firebaseapp.com",
  databaseURL: "https://car-pool-54eb7.firebaseio.com",
  projectId: "car-pool-54eb7",
  storageBucket: "",
  messagingSenderId: "524862671928",
  appId: "1:524862671928:web:916db94d87d7c164"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MapaPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    FirebaseCarpoolService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
