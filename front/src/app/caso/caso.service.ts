import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Caso } from './caso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasoService {

  private backUrl: string = "http://ec2-34-227-158-1.compute-1.amazonaws.com"

constructor(private http: HttpClient) { }

getCasos(): Observable<Caso[]>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NTYxMDg0OCwianRpIjoiNGRhNWRhYzAtY2UxYS00ZWU3LTkyZWItNzQ1NTU5YmI5MDZlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNjc1NjEwODQ4LCJleHAiOjE2NzU2OTcyNDh9.nSCcSvX2FFZW2t8eixCtsnPo2acOeHWNTTTn9YSRnk0`
  })
  return this.http.get<Caso[]>(`${this.backUrl}/api/casos-pacientes`, {headers: headers})
}

}
