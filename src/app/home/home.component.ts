import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TipsService} from "../tips/tips.service";
import {Tip} from "../tips/tip";
import {AuthService} from "../services/auth.service";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	private tips: Tip[] = [];
	private tipsSubscription: Subscription;
	private loading: Boolean;
	
	/**
	 * Component constructor.
	 */
	constructor(private tipsService: TipsService, private authService: AuthService) {
	}
	
	/**
	 * Initialize tips subscription.
	 */
	ngOnInit() {
		this.loading = true;
		this.tipsSubscription = this.tipsService.tipSubject.subscribe(
			(tips: Tip[]) => {
				this.tips = tips;
				this.loading = false;
			}
		);
		this.tipsService.getTips();
	}
}
