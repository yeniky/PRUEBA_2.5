import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario-interface';
import { ApiService } from 'src/app/services/api.service';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  listaUsuarios: Usuario[] = [];
  loading = this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...'
  });

  constructor (private sqlite: SQLite,private api: ApiService, private loadingController: LoadingController, private alertController: AlertController)
  {this.sqlite.create({
    name: 'datos.db',
    location: 'default',
    androidDatabaseLocation: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql ('CREATE TABLE IF NOT EXIST PERSONA (RUT VARCHAR(15),NOMBRE VARCHAR (50)', []).then (() => {
        console.log ('TABLA OK');
      }).catch (e=> {
        console.log ('TABLA NOK');
      })
    }).catch(e=> {
      console.log('TABLA NOK');

    })  
  }
  
  ngOnInit() {
    this.obtenerUsuarios();
  }

  async obtenerUsuarios() {
    this.simpleLoader();

    this.api.usuariosObtener().subscribe( data => {
      console.log(data);
      this.listaUsuarios.push(...data['result']);
      this.dismissLoader();
    }) 
    
  
  }


  simpleLoader() {
      this.loadingController.create({
          message: 'Cargando...'
      }).then((response) => {
          response.present();
      });
  }

  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
        console.log('Loader closed!', response);
    }).catch((err) => {
        console.log('Error occured : ', err);
    });
  }
}
