import interfaceMovie from './interface';

export default class Movie implements interfaceMovie {
	constructor(
		readonly year: number,
		readonly country: string,
		readonly slogan: string,
		readonly genre: Array<string>,
		readonly time: number,
	) {
		this.year = year;
		this.country = country;
		this.slogan = slogan;
		this.genre = genre;
		this.time = time;
	}
}
