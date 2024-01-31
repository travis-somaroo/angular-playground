import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  public setLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
