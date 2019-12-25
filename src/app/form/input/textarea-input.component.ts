import {Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";

@Component({
	selector: 'app-textarea-input',
	templateUrl: './textarea-input.component.html',
	styleUrls: ['./textarea-input.component.css']
})
export class TextareaInputComponent {
	@Input() field: string;
	@Input() form: FormGroup;
	@Input() label: string;
	
	constructor() {
	}
	
	/**
	 * Stringify first error for provided field.
	 *
	 * @param {string} fieldName
	 *
	 * @return {string} Error key.
	 */
	displayErrorForField(fieldName: string) {
		let errors = this.form.get(fieldName).errors;
		// The field is valid.
		if (!errors) {
			return '';
		}
		
		let errorKey = Object.keys(this.form.get(fieldName).errors)[0];
		
		return 'form.error.' + errorKey;
	}
	
	/**
	 * Check if field is required.
	 *
	 * @param {string} fieldName
	 */
	isRequired(fieldName: string) {
		let validator = this.form.get(fieldName).validator({} as AbstractControl);
		
		return validator && validator.required;
	}
	
	/**
	 * Check if a field is invalid.
	 *
	 * @param fieldName
	 */
	fieldInvalid(fieldName: string) {
		return null !== this.form.get(fieldName).errors;
	}
}
