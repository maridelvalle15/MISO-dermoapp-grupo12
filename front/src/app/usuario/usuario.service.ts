import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private backUrl: string = 'http://localhost:5000/';


  constructor(private http: HttpClient) {}

  userSignUp(
    tipo_usuario:string,
    email: string,
    nombre: string,
    direccion: string,
    pais:string,
    ciudad:string,
    especialidad:string,
    licencia:string
  ): Observable<any> {
    return this.http.post<any>('/api/registro', {
      "tipo_usuario": tipo_usuario,
      "email": email,
      "nombre": nombre,
      "direccion": direccion,
      "pais": pais,
      "ciudad":ciudad,
      "especialidad":especialidad,
      "licencia": licencia,
    });
  }
}
