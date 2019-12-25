import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Tip} from "./tip";
import {TipsService} from "./tips.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-tip-form',
	templateUrl: './tip-form.component.html',
	styleUrls: ['./tip-form.component.css']
})
export class TipFormComponent implements OnInit {
	form: FormGroup;
	content: string;
	
	/**
	 * Component constructor
	 */
	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private tipsService: TipsService,
		private router: Router
	) {
	}
	
	/**
	 * Initialize component.
	 */
	ngOnInit() {
		this.form = this.formBuilder.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
			tags: '',
			content: ['', Validators.required]
		});
	}
	
	/**
	 * Save tip.
	 */
	onSubmit() {
		let title = this.form.get('title').value;
		let author = this.authService.getDisplayName();
		let description = this.form.get('description').value;
		let content = this.form.get('content').value;
		
		const tip = new Tip(title, author, content, description);
		this.tipsService.createTip(tip);
		this.router.navigate(['/home']);
	}
}
