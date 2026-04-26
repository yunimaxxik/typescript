import Cart from '../service/Cart';
import Buyable from '../domain/Buyable';

const book: Buyable = {
	id: 1,
	name: 'Book',
	price: 350,
};

const movie: Buyable = {
	id: 2,
	name: 'Movie',
	price: 500,
};

describe('Cart', () => {
	let cart: Cart;

	beforeEach(() => {
		cart = new Cart();
	});

	describe('costWithoutDiscount', () => {
		test('Должна вернуть 0 для пустой корзины', () => {
			expect(cart.costWithoutDiscount()).toBe(0);
		});

		test('Должна посчитать сумму всех товаров', () => {
			cart.add(book);
			cart.add(movie);
			expect(cart.costWithoutDiscount()).toBe(350 + 500);
		});
	});

	describe('costWithDiscount', () => {
		test('Должна посчитать сумму вместо со скидкой', () => {
			cart.add(book);
			cart.add(movie);
			expect(cart.costWithDiscount(5)).toBe(850 * 0.95);
		});

		test('Должна вернуть 0 при скидки 100%', () => {
			cart.add(book);
			expect(cart.costWithDiscount(100)).toBe(0);
		});

		test('Должна работать со скидкой в 0%', () => {
			cart.add(movie);
			expect(cart.costWithDiscount(0)).toBe(cart.costWithoutDiscount());
		});

		test('Должна вернуть 0 для пустого массива', () => {
			expect(cart.costWithDiscount(10)).toBe(0);
		});
	});

	describe('delete', () => {
		test('Должна удалять товар по его ID', () => {
			cart.add(book);
			cart.add(movie);
			cart.delete(book.id);
			expect(cart.items).toEqual([movie]);
		});

		test('Ничего не удаляет если неверное ID', () => {
			cart.add(book);
			cart.delete(999);
			expect(cart.items).toEqual([book]);
		});

		test('Должен ничего не делать, когда корзина пуста', () => {
			expect(() => cart.delete(1)).not.toThrow();
			expect(cart.items).toEqual([]);
		});
	});

	describe('items getter', () => {
		test('Должна вернуть массив товаров', () => {
			cart.add(book);
			const returned = cart.items;
			expect(returned).toEqual([book]);
			expect(returned).not.toBe(cart['_items']);
		});
	});
});
