import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
	form: FormGroup;
	errorMessage: string;

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
		this.initForm();
	}

	/**
	 * Initialize sign up form.
	 */
	initForm() {
		this.form = this.formBuilder.group({
			email: [''],
			password: ['']
		});
	}

	/**
	 * Handle sign up form submission.
	 */
	onSubmit() {
		const email = this.form.get('email').value;
		const password = this.form.get('password').value;

		this.authService.signIn(email, password).then(
			() => {
				this.router.navigate(['/home']);
			},
			(error) => {
				this.errorMessage = error;
			}
		);
	}

}
