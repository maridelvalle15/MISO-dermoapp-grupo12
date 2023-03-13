import { Component, OnInit } from '@angular/core';
import { CasoService } from '../caso.service';

@Component({
  selector: 'app-caso-agenda-listar',
  templateUrl: './caso-agenda-listar.component.html',
  styleUrls: ['./caso-agenda-listar.component.css']
})
export class CasoAgendaListarComponent implements OnInit {
  citas: any;
  constructor(
    private casoService: CasoService
    ) { }

  ngOnInit() {
   this.getAgenda();
  }

  getAgenda(){
    this.casoService.getAgenda().subscribe(citas => {
      this.citas = citas;
      this.citas = Object.values(this.citas.agenda)
    })


  }

}
