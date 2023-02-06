import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
  ) { }

  email :any;
  password: any;

  ngOnInit() {
    this.router.queryParams.subscribe((params:any)=>{
      this.email = params.data
      this.password = params.passwordUsuario
    })
  }

}
