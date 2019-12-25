export class Tip {
	id: number;

	/**
	 * Instantiate tip.
	 *
	 * @param title
	 * @param author
	 * @param content
	 */
	constructor(
		public title: string,
		public author: string,
		public content: string,
		public description: string
	) {
	}
}
