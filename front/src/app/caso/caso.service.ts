import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Caso } from './caso';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment, environment2 } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CasoService {
  backUrl = environment2.servidor;
constructor(private http: HttpClient,private cookieService: CookieService) {
}

getCasos(): Observable<Caso[]>{
  const cookie= this.cookieService.get('token_access');
  const headers = new HttpHeaders({

    'Authorization': `Bearer ${cookie}`
  })
  return this.http.get<Caso[]>(`${this.backUrl}/api/casos-pacientes`, {headers: headers})
}

getCaso(id:any): Observable<Caso>{
  const cookie= this.cookieService.get('token_access');
  const headers = new HttpHeaders({

    'Authorization': `Bearer ${cookie}`
  })
  return this.http.get<Caso>(`${this.backUrl}/api/suministro-lesion/`+id, {headers: headers})
}

sendCaso(id: any):Observable<any>{
  const cookie= this.cookieService.get('token_access');
  const headers = new HttpHeaders({

    'Authorization': `Bearer ${cookie}`
  })
  return this.http.post<any>(this.backUrl + `/api/reclamar-caso`, {'caso_id': id}, {headers: headers });
}

getCasoReclamado(): Observable<Caso>{
  const cookie= this.cookieService.get('token_access');
  const headers = new HttpHeaders({

    'Authorization': `Bearer ${cookie}`
  })
  return this.http.get<Caso>(`${this.backUrl}/api/reclamar-caso`, {headers: headers})
}

sendDiagnostico(id: any,diagnostico:any):Observable<any>{
  const cookie= this.cookieService.get('token_access');
  const headers = new HttpHeaders({

    'Authorization': `Bearer ${cookie}`
  })
  return this.http.post<any>(this.backUrl + `/api/diagnostico-paciente`, {'caso_id': id,'diagnostico':diagnostico}, {headers: headers });
}

liberarCaso(id: any):Observable<any>{
  const cookie= this.cookieService.get('token_access');
  const headers = new HttpHeaders({

    'Authorization': `Bearer ${cookie}`
  })
  return this.http.post<any>(this.backUrl + `/api/liberar-caso`, {'caso_id': id}, {headers: headers });
}


getPaciente(id:any): Observable<Caso>{
  const cookie= this.cookieService.get('token_access');
  const headers = new HttpHeaders({

    'Authorization': `Bearer ${cookie}`
  })
  return this.http.get<Caso>(`${this.backUrl}/api/detalle-paciente/`+id, {headers: headers})
}

getAgenda(): Observable<Caso[]>{
  const cookie= this.cookieService.get('token_access');
  const headers = new HttpHeaders({

    'Authorization': `Bearer ${cookie}`
  })
  return this.http.get<Caso[]>(`${this.backUrl}/api/agenda`, {headers: headers})
}


}
