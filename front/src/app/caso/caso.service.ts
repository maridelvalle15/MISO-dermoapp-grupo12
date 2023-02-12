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

}
