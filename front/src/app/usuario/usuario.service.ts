import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  backUrl = environment.servidor;


  constructor(private http: HttpClient) {}



  userLogIn(email: string, password: string):Observable<any>{
    return this.http.post<any>(`api/login`, {"correo": email, "password": password });
}

  userSignUp(
    tipo_usuario:string,
    email: string,
    nombre: string,
    direccion: string,
    pais:string,
    ciudad:string,
    especialidad:string,
    licencia:string,

  ): Observable<any> {
    return this.http.post<any>('/api/registro', {
      "tipousuario": tipo_usuario,
      "correo": email,
      "nombre": nombre,
      "direccion": direccion,
      "pais": pais,
      "ciudad":ciudad,
      "especialidad":especialidad,
      "licencia": licencia,
    });
  }
}
