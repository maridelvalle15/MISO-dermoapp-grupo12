import { Component, OnInit } from '@angular/core';
import { Caso } from '../caso';
import { CasoService } from '../caso.service';
;

interface Student{
  id: number;
  informacion:string;
}

@Component({
  selector: 'app-caso-listar',
  templateUrl: './caso-listar.component.html',
  styleUrls: ['./caso-listar.component.css']
})
export class CasoListarComponent implements OnInit {

  casos: Caso[] =[];
  constructor(private casoService: CasoService,) {}


  ngOnInit() {
    this.getCasos();

  }

  getCasos(){
    this.casoService.getCasos().subscribe(casos => {
      this.casos = casos;
      console.log(casos)
      this.casos = Object.values(this.casos)
    })

  }







}
