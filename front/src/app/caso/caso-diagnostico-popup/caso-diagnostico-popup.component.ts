import { Component, OnInit, Input } from '@angular/core';
import { CasoService } from '../caso.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-caso-diagnostico-popup',
  templateUrl: './caso-diagnostico-popup.component.html',
  styleUrls: ['./caso-diagnostico-popup.component.css']
})
export class CasoDiagnosticoPopupComponent implements OnInit {
  caso: any;
  id: any;
  diagnosticoForm !: FormGroup;


  constructor(
    private casoService: CasoService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    const cookie = this.cookieService.get('id');
    if ((this.id = cookie)) {
      this.getCasoPopUp();
    }

    this.diagnosticoForm = this.formBuilder.group({
      diagnostico: ["", [Validators.required, Validators.maxLength(50)]],

    })

  }
  getCasoPopUp() {
    this.casoService.getCaso(this.id).subscribe((caso) => {
      this.caso = caso;
      this.caso = Object.values(this.caso.caso)

    });
  }

  postDiagnosticoPopUp() {
    const cookie = this.cookieService.get('id');
    this.casoService.sendDiagnostico(this.id = cookie,this.diagnosticoForm.get('diagnostico')?.value).subscribe((res: any) => {
      alert('Diagnostico enviado');
      window.location.reload();
    });
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }

}
