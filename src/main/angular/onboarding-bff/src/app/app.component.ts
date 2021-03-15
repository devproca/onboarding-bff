import { Component, OnInit } from '@angular/core';
import {LocalizeService} from './service/localize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  languages: string[] = ['English', 'français'];
  currentLanguage: string;

  constructor(private localizeService: LocalizeService){ }

  ngOnInit(): void {
    this.currentLanguage = this.languages[0];
    this.localizeService.setInitialLanguage();
  }

  toggleLang(): void {
    if (this.currentLanguage.toLowerCase() === this.languages[0].toLowerCase()) {
      this.currentLanguage = this.languages[1];
      this.localizeService.setLanguage('fr');
    } else {
      this.localizeService.setLanguage('en');
      this.currentLanguage = this.languages[0];
    }
  }

}
