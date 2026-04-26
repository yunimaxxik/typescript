import Movie from '../domain/Movie'

export default class MovieImpl implements Movie {
	constructor(
		readonly year: number,
		readonly country: string,
		readonly slogan: string,
		readonly genre: string[],
		readonly time: number,
	) {}
}
