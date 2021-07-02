// import React from 'react';
import './CartScreen.css'
import CartItem from '../components/CartItem/CartItem';
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../components/redux/actions/cartActions';

const CartScreen = () => {
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)
	const {cartItems } = cart

	const qtyChangeHandler = (id, qty) => {
		dispatch(addToCart(id, qty))
	}

	const removeHandler = id => {
		dispatch(removeFromCart(id))
	}

	const getCartCount = () => {
		return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0 );
	}

	const getCartSubtotal = () => {
		return cartItems.reduce((price, item) => item.price * item.qty + price, 0)
	}

	return (
		<div className='cart_screen'>
			<div className='cartscreen_left'>
				<h2>Shopping Cart</h2>
				{cartItems.length === 0 
				? <div>Your cart is empty <Link to='/'>Go Back</Link></div>	
				: cartItems.map(item => <CartItem 
											key={item.product}
											item={item} 
											qtyChangeHandler={qtyChangeHandler} 
											removeHandler={removeHandler.bind(this)}
											/>)
			}
			</div>
			<div className='cartscreen_right'>
				<div className='cartscreen_info'>
					<p>Subtotal ({getCartCount()}) items</p>
					<p>${getCartSubtotal().toFixed(2)}</p>
				</div>
				<div>
					<button>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartScreen;