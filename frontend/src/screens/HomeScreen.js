// import React from 'react';
import './HomeScreen.css'
import Product from '../components/Product/Product';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getProducts as listProducts} from  '../components/redux/actions/productActions'

const  HomeScreen = () => {

	const dispatch = useDispatch();

	const getProducts = useSelector((state) => state.getProducts);
	const {products, loading, error} = getProducts
	
	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])


	return (
		<div className='homescreen'>
			<h2 className='homescreen_title'>Latest products</h2>
			<div className='homescreen_products'>
				{loading ? (
					<h2>Loading...</h2> 
					): error ? (<h2>{error}</h2> 
					): (products.map(product => <Product 
						key={product._id} 
						productId={product._id}
						name={product.name}
						imageUrl={product.imageUrl}
						description={product.description}
						price={product.price}
						/>)
					)}
			
			</div>
		</div>
	);
}

export default HomeScreen;