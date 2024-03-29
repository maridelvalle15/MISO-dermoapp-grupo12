import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private cookieService: CookieService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');

  }

  email :any;
  password: any;

  ngOnInit() {
    this.router.queryParams.subscribe((params:any)=>{
      const cookie = this.cookieService.get('correo');
      this.email = cookie
      this.password = params.passwordUsuario
    })
  }
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

}
