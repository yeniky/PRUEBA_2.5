import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario-interface';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private api: ApiService, private loadingController: LoadingController) {
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
