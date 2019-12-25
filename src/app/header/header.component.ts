import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from "../services/auth.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	isAuth: boolean;

	/**
	 * Construct component.
	 *
	 * @param authService
	 */
	constructor(private authService: AuthService) {
	}

	/**
	 * Initialize component.
	 */
	ngOnInit() {
		firebase.auth().onAuthStateChanged(
			(user) => {
				this.isAuth = !!user;
			}
		);
	}

	/**
	 * Sign out current user.
	 */
	onSignOut() {
		this.authService.signOut();
	}

	/**
	 * Return user avatar path or default path.
	 */
	userAvatarPath() {
		let user = firebase.auth().currentUser;
		if (user.photoURL) {
			return user.photoURL;
		}

		return 'assets/images/header/default-avatar.png';
	}

	username() {
		let user = firebase.auth().currentUser;
		return user.displayName ? user.displayName : user.email;
	}
}
