import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Respuesta } from '../interfaces/respuesta-interface';
import { Usuario } from '../interfaces/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rutaBase = 'http://fer-sepulveda.cl/api/api-user.php';

  constructor(private http: HttpClient) { }

  validarLogin(correo, contrasena) {
    return this.http.get<Respuesta>(this.rutaBase + '?nombreFuncion=UsuarioLogin&correo=' + correo + '&contrasena=' + contrasena);
  }

  crearUsuario(correo, contrasena, nombre, apellidoPaterno, apellidoMaterno, edad) {
    return this.http.post(this.rutaBase, { nombreFuncion: 'UsuarioAlmacenar', parametros: [correo, contrasena, nombre, apellidoPaterno, apellidoMaterno, edad] });
  }

  //FUNCIÓN QUE OBTIENE TODOS LOS USUARIOS (GET)
  //https://fer-sepulveda.cl/api/api-user.php?nombreFuncion=UsuariosObtener
  usuariosObtener() {
    return this.http.get(this.rutaBase + '?nombreFuncion=UsuariosObtener');
  }
}