import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: '<cloudapp-alert></cloudapp-alert><router-outlet></router-outlet>',
})
export class AppComponent {
   constructor(private translate: TranslateService) {
    // Default to English, and let Alma override if a different language is set
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang || 'en');

}
}
