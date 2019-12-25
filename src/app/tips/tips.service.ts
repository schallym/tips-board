import {Injectable} from '@angular/core';
import {Tip} from "./tip";
import {Subject} from "rxjs";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
	providedIn: 'root'
})
export class TipsService {
	tips: Tip[] = [];
	tipSubject = new Subject<Tip[]>();

	constructor() {
	}

	/**
	 * Emit tips change.
	 */
	emitTips() {
		this.tipSubject.next(this.tips);
	}

	/**
	 * Save tips in database.
	 */
	saveTips(): Promise<any> {
		return firebase.database().ref('/tips').set(this.tips);
	}

	/**
	 * Retrieve tips from database.
	 */
	getTips() {
		firebase.database().ref('/tips').on(
			'value', (data: DataSnapshot) => {
				this.tips = data.val() ? data.val() : [];
				this.emitTips();
			}
		);
	}

	/**
	 * Retrieve tips from provided id.
	 *
	 * @param {number} id
	 * @returns {Promise<any>}
	 */
	getTip(id: number) {
		return new Promise(
			(resolve, reject) => {
				firebase.database().ref('/tips/' + id).once('value').then(
					(data: DataSnapshot) => {
						resolve(data.val());
					}, (error) => {
						reject(error);
					}
				);
			}
		);
	}
	
	/**
	 * Create a new tip.
	 *
	 * @param {Tip} tip
	 */
	createTip(tip: Tip) {
		tip.id = new Date().getUTCMilliseconds();
		
		this.tips.push(tip);
		this.saveTips().then(
			() => {
				this.emitTips();
			}
		);
	}
	
	/**
	 * Remove tip.
	 *
	 * @param {Tip} tip
	 */
	removeTip(tip: Tip) {
		const tipIndexToRemove = this.tips.findIndex(
			(tipElement) => {
				if (tipElement === tip) {
					return true;
				}
			}
		);
		this.tips.splice(tipIndexToRemove, 1);
		this.saveTips();
		this.emitTips();
	}
}
