import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    constructor() {
    }

    /**
     * Create user.
     *
     * @param {string} email
     * @param {string} password
     */
    createUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
    }

    /**
     * Sign in.
     *
     * @param {string} email
     * @param {string} password
     */
    signIn(email: string, password: string) {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    /**
     * Sign out.
     */
    signOut() {
        firebase.auth().signOut();
    }
    
    /**
     * Return current user display name.
     */
    getDisplayName() {
        let user = firebase.auth().currentUser;
        
        if (user.displayName.length > 0) {
            return user.displayName;
        }
        
        return user.email;
    }
    
    /**
     * Check if user is authenticated.
     */
    isAuthenticated() {
        return firebase.auth().currentUser != null;
    }
}
