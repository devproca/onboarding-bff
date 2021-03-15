import { Component, OnInit } from '@angular/core';
import {LocalizeService} from './service/localize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  LANGUAGES: string[] = ['English', 'français'];
  currentLanguage: string;

  constructor(private localizeService: LocalizeService){ }

  ngOnInit(): void {
    this.currentLanguage = this.LANGUAGES[0];
    this.localizeService.setInitialLanguage();
  }

  toggleLang(): void {
    if (this.currentLanguage.toLowerCase() === this.LANGUAGES[0].toLowerCase()) {
      this.currentLanguage = this.LANGUAGES[1];
    } else {
      this.currentLanguage = this.LANGUAGES[0];
    }
    this.localizeService.setLanguage(this.currentLanguage.toLowerCase().substr(0,2));
  }

}
