import MovieImpl from '../service/Movie';

describe('Team', () => {
	let movie;

	beforeEach(() => {
		movie = new MovieImpl(
			2012,
			'США',
			'Avengers Assemble!',
			['фантастика', 'боевик', 'фэнтази'],
			137,
		);
	});

	test('создаёт пустую команду при инициализации', () => {
		expect(movie.year).toBe(2012);
		expect(movie.country).toBe('США');
		expect(movie.slogan).toBe('Avengers Assemble!');
		expect(movie.genre).toEqual(['фантастика', 'боевик', 'фэнтази']);
		expect(movie.time).toBe(137);
	});
});
