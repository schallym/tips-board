import {Component} from '@angular/core';
import * as firebase from "firebase";
import {environment} from '../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'tips-board';

    /**
     * Initialize component.
     */
    constructor(private translate: TranslateService) {
        // Initialize fire base connection.
        firebase.initializeApp(environment.firebaseConfig);
        // English locale is used by default when translation is not found.
        translate.setDefaultLang('en');
        // Initialize locale from browser.
        translate.use(navigator.language);
    }
}
