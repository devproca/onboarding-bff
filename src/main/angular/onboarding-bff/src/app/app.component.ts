import { Component, OnInit } from '@angular/core';
import {LocalizeService} from './service/localize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private localizeService: LocalizeService){ }

  ngOnInit(): void {
    this.localizeService.setInitialLanguage();
  }

}
