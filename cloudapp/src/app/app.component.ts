import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: '<cloudapp-alert></cloudapp-alert><router-outlet></router-outlet>',
})
export class AppComponent {
   constructor(private translate: TranslateService) {
    // Langage Anglais par défaut. Override si une autre langue disponible est sélectionnée dans Alma
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang || 'en');

}
}
