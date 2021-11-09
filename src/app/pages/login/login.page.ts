import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  modeloCorreo: string = '';
  modeloContrasena: string = '';

  constructor(private api: ApiService, private alertController: AlertController, 
    private toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  validarLogin() {
    this.api.validarLogin(this.modeloCorreo, this.modeloContrasena).subscribe(data => {
      console.log(data);
      // LOGIN OK -> REDIRECCIONAR AL INICIO
      // LOGIN NOK -> ENVIAR MENSAJE DE CREDENCIALES INVÁLIDAS

      if(data.result === 'LOGIN NOK') {
        this.presentToast();
      } else {
        this.router.navigate(['inicio']);
      }
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Credenciales Inválidas.',
      duration: 2000
    });
    toast.present();
  }


  mostrarFormulario() {
    this.presentFormulario();
  }

  async presentFormulario() {
    const alert = await this.alertController.create({
      header: 'Nuevo Usuario',
      inputs: [
        {
          name: 'txt_correo',
          type: 'text',
          placeholder: 'Correo Electrónico'
        },
        {
          name: 'txt_contrasena',
          type: 'password',
          placeholder: 'Contraseña'
        },
        {
          name: 'txt_nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'txt_apellidoPaterno',
          type: 'text',
          placeholder: 'Apellido Paterno'
        },
        {
          name: 'txt_apellidoMaterno',
          type: 'text',
          placeholder: 'Apellido Materno'
        },
        {
          name: 'txt_edad',
          type: 'number',
          placeholder: 'Edad'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {

            this.api.crearUsuario(data.txt_correo, data.txt_contrasena, data.txt_nombre, data.txt_apellidoPaterno, data.txt_apellidoMaterno, data.txt_edad).subscribe(data => {
              console.log(data);
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
