import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizeService {

  constructor(private translate: TranslateService) { }

  setInitialLanguage(): void {
   let browserLang = this.translate.getBrowserLang();
   this.translate.setDefaultLang(browserLang);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  translateNow(src: string): string | any {
    return this.translate.instant(src);
  }

}
