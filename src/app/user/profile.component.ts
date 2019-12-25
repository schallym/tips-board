import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import * as firebase from 'firebase';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	form: FormGroup;
	errorMessage: string;
	isAuth: boolean = false;
	isLoading: boolean = false;
	fileUrl: string;

	/**
	 * Construct component.
	 *
	 * @param {FormBuilder} formBuilder
	 * @param {AuthService} authService
	 * @param {Router} router
	 */
	constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
	}

	/**
	 * Initialize component after construction.
	 */
	ngOnInit() {
		firebase.auth().onAuthStateChanged(
			(user) => {
				this.isAuth = !!user;
				this.initForm();
			}
		);
	}

	/**
	 * Initialize sign up form.
	 */
	initForm() {
		let user = firebase.auth().currentUser;
		this.form = this.formBuilder.group({
			email : new FormControl({value: user.email, disabled: true}),
			name: [user.displayName],
		});
	}

	/**
	 * Handle sign up form submission.
	 */
	onSubmit() {
		let self = this;
		this.isLoading = true;
		const name = this.form.get('name').value;

		console.log(this.fileUrl);

		firebase.auth().currentUser.updateProfile({
			displayName: name,
			photoURL: this.fileUrl ? this.fileUrl : firebase.auth().currentUser.photoURL
		}).then(function() {
			self.isLoading = false;
		}).catch(function(error) {
			self.isLoading = false;
		});
	}

	/**
	 * Detect files.
	 *
	 * @param event
	 */
	detectFiles(event) {
		this.onUploadFile(event.target.files[0]);
	}

	/**
	 * Handle form file upload.
	 *
	 * @param {File} file
	 */
	onUploadFile(file: File) {
		this.isLoading = true;
		this.uploadFile(file).then(
			(url: string) => {
				this.fileUrl = url;
				this.isLoading = false;
			}
		);
	}

	/**
	 * Handle file upload.
	 *
	 * @param {File} file
	 * @returns {Promise<any>}
	 */
	uploadFile(file: File) {
		return new Promise(
			(resolve, reject) => {
				const almostUniqueFileName = Date.now().toString();
				const upload = firebase.storage().ref()
					.child('images/' + almostUniqueFileName + file.name).put(file);
				upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
					() => {
						console.log('Loading …');
					},
					(error) => {
						console.log('Error : ' + error);
						reject();
					},
					() => {
						resolve(upload.snapshot.ref.getDownloadURL());
					}
				);
			}
		);
	}
}
