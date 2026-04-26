import Buyable from '../domain/Buyable';

export default class Cart {
	private _items: Buyable[] = [];

	add(item: Buyable): void {
		this._items.push(item);
	}

	delete(id: number): void {
		this._items = this._items.filter((item) => item.id !== id);
	}

	costWithoutDiscount(): number {
		return this._items.reduce((sum, item) => sum + item.price, 0);
	}

	costWithDiscount(discount: number): number {
		const total = this.costWithoutDiscount();
		return total * (1 - discount / 100);
	}

	get items(): Buyable[] {
		return [...this._items];
	}
}
