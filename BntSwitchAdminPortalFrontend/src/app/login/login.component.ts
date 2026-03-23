import { Component, OnInit } from '@angular/core';
import { TitleConfig } from '../config/i18n/title.config';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public titleConfig = TitleConfig;
  constructor(private _cookieService: CookieService) {}

  async ngOnInit() {}
}
