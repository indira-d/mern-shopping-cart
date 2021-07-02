// import React from 'react';
import './ProductScreen.css'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getProductDetails} from '../components/redux/actions/productActions'
import {addToCart} from '../components/redux/actions/cartActions'

function ProductScreen({match, history}) {

	const [qty, setQty] = useState(1)
	const dispatch = useDispatch()

	const productDetails = useSelector(state => state.getProductDetails)
	const {loading, error, product} = productDetails

	useEffect(() => {
		if(product && match.params.id !== product._id){
			dispatch(getProductDetails(match.params.id))
		}
		
	}, [dispatch, product, match])

	const addToCartHandler = () => {
		dispatch(addToCart(product._id, qty))
		history.push("/cart")
	}

	return (
		<div className='products_screen'>
			{
				loading ? (<h2>Loading ...</h2>)
				: error ? (<h2>error</h2>)
				: (
					<>

			<div className='product_screen_left'>
				<div className='left_image'>
					<img src={product.imageUrl} alt={product.name} />

				</div>
				<div className='left_info'>
					<p className='left_name'>{product.name}</p>
					<p>Price: ${product.price}</p>
					<p>Description: {product.description}</p>
				</div>

			</div>
			<div className='product_screen_right'>
				<div className='right_info'>
					<p>Price: <span>${product.price}</span></p>
					<p>Status: <span>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</span></p>
					<p>Qty
						<select value={qty} onChange={e => setQty(e.target.value)}>
							{[...Array(product.countInStock).keys()].map(x => (
								<option key={x+1} value={x+1}>{x+1}</option>
							))}
						</select>
					</p>
					<p>
						<button type='button' onClick={addToCartHandler}>Add to cart</button>
					</p>
				</div>

			</div>
					</>
				)
			}
		
		</div>
	);
}

export default ProductScreen;