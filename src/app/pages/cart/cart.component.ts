import { Component, OnInit } from '@angular/core';

// Import the Cart interface
import { Cart, CartItem } from 'src/app/models/Cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  
    cart: Cart = { items: [
        { product: 'https://via.placeholder.com/150', name: 'iPhone', price: 100, quantity: 2, id: 1 },
        { product: 'https://via.placeholder.com/150', name: 'Samsung', price: 200, quantity: 2, id: 2},
        { product: 'https://via.placeholder.com/150', name: 'Motorola', price: 300, quantity: 3, id: 3},
        { product: 'https://via.placeholder.com/150', name: 'Nokia', price: 400, quantity: 4, id: 4}
    ]};

    dataSource: Array<CartItem> = [];

    displayedColumns: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'actions'];

    constructor(private cartService: CartService) { }
  
    ngOnInit(): void {
      this.dataSource = this.cart.items;
      this.cartService.cart.subscribe((_cart) => {
        this.cart = _cart;
        this.dataSource = _cart.items;
      });
    }

    getTotal(items: Array<CartItem>): number {
      return this.cartService.getTotal(items);
    }

    onClearCart(): void {
      this.cartService.clearCart();
    }

    onRemoveFromCart(item: CartItem): void {
      this.cartService.removeFromCart(item);
    }

    onAddQuantity(item: CartItem): void {
      this.cartService.addToCart(item);
    }

    onRemoveQuantity(item: CartItem): void {
      this.cartService.removeQuantity(item);
    }
    
}
