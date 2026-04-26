import Cart from '../service/Cart'
import Buyable from '../domain/Buyable'

const uniqueItem: Buyable = {
	id: 1,
	name: 'Электронная книга',
	price: 500,
	multiple: false,
}

const multiItem: Buyable = {
	id: 2,
	name: 'Смартфон',
	price: 30000,
	multiple: true,
}

describe('cart', () => {
	let cart: Cart

	beforeEach(() => {
		cart = new Cart()
	})

	describe('добавление товара', () => {
		test('должен добавлять уникальный товар только один раз', () => {
			cart.add(uniqueItem)
			cart.add(uniqueItem) // повторное добавление игнорируется
			expect(cart.items).toHaveLength(1)
			expect(cart.items[0].count).toBe(1)
		})

		test('должен увеличивать количество для множественных товаров', () => {
			cart.add(multiItem)
			cart.add(multiItem)
			expect(cart.items).toHaveLength(1)
			expect(cart.items[0].count).toBe(2)
		})
	})

	describe('удаление товара', () => {
		test('должен полностью удалять товар независимо от количества', () => {
			cart.add(multiItem)
			cart.add(multiItem) // количество = 2
			cart.delete(multiItem.id)
			expect(cart.items).toHaveLength(0)
		})

		test('не должен ничего делать, если id не найден', () => {
			cart.add(uniqueItem)
			cart.delete(999)
			expect(cart.items).toHaveLength(1)
		})
	})

	describe('уменьшение количества', () => {
		test('должен уменьшать количество для множественных товаров', () => {
			cart.add(multiItem)
			cart.add(multiItem) // количество = 2
			cart.decreaseQuantity(multiItem.id)
			expect(cart.items[0].count).toBe(1)
		})

		test('должен удалять товар, когда количество становится 0', () => {
			cart.add(multiItem) // количество = 1
			cart.decreaseQuantity(multiItem.id)
			expect(cart.items).toHaveLength(0)
		})

		test('не должен ничего делать для уникальных товаров', () => {
			cart.add(uniqueItem)
			cart.decreaseQuantity(uniqueItem.id)
			expect(cart.items).toHaveLength(1)
			expect(cart.items[0].count).toBe(1)
		})

		test('не должен ничего делать, если id не найден', () => {
			cart.decreaseQuantity(999)
			expect(cart.items).toHaveLength(0)
		})
	})

	describe('расчёт стоимости без скидки', () => {
		test('должен возвращать 0 для пустой корзины', () => {
			expect(cart.costWithoutDiscount()).toBe(0)
		})

		test('должен считать сумму с учётом количества', () => {
			cart.add(uniqueItem) // 500
			cart.add(multiItem)
			cart.add(multiItem) // 2 * 30000 = 60000
			expect(cart.costWithoutDiscount()).toBe(500 + 60000)
		})
	})

	describe('расчёт стоимости со скидкой', () => {
		test('должен правильно применять скидку', () => {
			cart.add(uniqueItem) // 500
			cart.add(multiItem) // 30000
			// 30500 - 10% = 27450
			expect(cart.costWithDiscount(10)).toBe(30500 * 0.9)
		})

		test('должен работать со скидкой 0%', () => {
			cart.add(uniqueItem)
			expect(cart.costWithDiscount(0)).toBe(cart.costWithoutDiscount())
		})
	})

	describe('геттер items', () => {
		test('должен возвращать копию внутреннего массива', () => {
			cart.add(multiItem)
			const товары = cart.items
			expect(товары).toEqual([{ item: multiItem, count: 1 }])
			expect(товары).not.toBe(cart['_items']) // разные ссылки
		})
	})
})
