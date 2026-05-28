import React from 'react'
import { useDispatch } from 'react-redux'
import { config } from '../services/config'
import { addToCartAction } from '../slices/CartSlice'
function FoodCard({ food }) {
    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(addToCartAction(food))
    }

    return (
        <div className='col-3'>
            <div className='m-2'>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={config.BASE_URL_IMAGE + food.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{food.name}</h5>
                        <p className="card-text" style={{ height: '8rem' }}>{food.description}</p>
                        <h5 className="card-title">Rs. {food.price}</h5>
                        <a href="#" className="btn btn-primary" onClick={addToCart}>Add To Cart</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodCard
