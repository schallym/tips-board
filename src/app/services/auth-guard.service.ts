import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

/**
 * Class AuthGuardService.
 */
@Injectable()
export class AuthGuardService implements CanActivate {
    /**
     * Construct class.
     *
     * @param {Router} router
     */
    constructor(private router: Router) {
    }

    /**
     * Check auth state changes.
     *
     * @returns {Observable<boolean> | Promise<boolean> | boolean}
     */
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve) => {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            resolve(true);
                        } else {
                            this.router.navigate(['/auth', 'signin']);
                            resolve(false);
                        }
                    }
                );
            }
        );
    }
}
