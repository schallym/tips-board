import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
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
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
        });
    }

    /**
     * Handle sign up form submission.
     */
    onSubmit() {
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;

        this.authService.createUser(email, password).then(
            () => {
                this.router.navigate(['/home']);
            },
            (error) => {
                this.errorMessage = error;
            }
        );
    }
}
