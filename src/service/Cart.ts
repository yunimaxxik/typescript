// src/models/Cart.ts
import Buyable from '../domain/Buyable'

type CartItem = {
	item: Buyable;
	count: number;
};

export default class Cart {
	private _items: CartItem[] = []

	add(item: Buyable): void {
		const existing = this._items.find((i) => i.item.id === item.id)

		if (existing) {
			if (item.multiple) {
				existing.count++
			} else {
				return
			}
		} else {
			this._items.push({ item, count: 1 })
		}
	}

	delete(id: number): void {
		this._items = this._items.filter((item) => item.item.id !== id)
	}

	decreaseQuantity(id: number): void {
		const existing = this._items.find((i) => i.item.id === id)
		if (existing && existing.item.multiple) {
			existing.count--
			if (existing.count === 0) {
				this.delete(id)
			}
		}
	}

	costWithoutDiscount(): number {
		return this._items.reduce(
			(sum, { item, count }) => sum + item.price * count,
			0,
		)
	}

	costWithDiscount(discount: number): number {
		const total = this.costWithoutDiscount()
		return total * (1 - discount / 100)
	}

	get items(): CartItem[] {
		return this._items.map((i) => ({ ...i }))
	}
}
