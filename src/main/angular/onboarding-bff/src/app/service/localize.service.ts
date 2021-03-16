import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizeService {

  defaultLanguageEnglish = 'en';

  constructor(private translate: TranslateService) { }

  setInitialLanguage(): void {
   let initialLanguage = this.translate.getBrowserLang();
   if (initialLanguage.toLowerCase() !== this.defaultLanguageEnglish) {
    initialLanguage = this.defaultLanguageEnglish;
   }
   this.translate.setDefaultLang(initialLanguage);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  translateNow(src: string): string | any {
    return this.translate.instant(src);
  }

}
