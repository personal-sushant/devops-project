import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import { config } from "../services/config"
import { decrementQtyAction, emptyCartAction, incrementQtyAction } from "../slices/CartSlice"
import { useEffect, useState } from "react"
import { placeOrder } from "../services/order"
import { toast } from "react-toastify"

function Cart() {
    const cart = useSelector(store => store.cartReducer.cart)
    const [qty, setQty] = useState(0)
    const [totalBill, setTotalBill] = useState(0)

    useEffect(() => {
        let totalqty = 0
        let total = 0
        for (let c of cart) {
            totalqty += c.qty
            total += (c.price * c.qty)
        }
        setQty(totalqty)
        setTotalBill(total)
    }, [cart])

    const dispatch = useDispatch()

    const handlePlaceOrderClick = async () => {
        const token = window.sessionStorage.getItem('token')
        const orderdetails = {
            total: totalBill,
            items: cart
        }
        try {
            const response = await placeOrder(token, orderdetails)
            console.log(response)
            if (response.status == 'success') {
                toast.success('order placed successfully')
                dispatch(emptyCartAction())
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div>
            <div className="row m-3">
                <div className="col-8">
                    {
                        cart.map(c => {
                            return <div className="d-flex">
                                <div className="">
                                    <img src={config.BASE_URL_IMAGE + c.image} style={{ width: 180, height: 120 }} alt="" />
                                </div>
                                <div className="ms-3">
                                    <h4>{c.name}</h4>
                                    <h4>Rs. {c.price}</h4>
                                    <div>
                                        <button style={{ width: 30 }} onClick={() => { dispatch(incrementQtyAction(c.fid)) }}>+</button>
                                        <label className="ms-2 me-2" style={{ fontSize: 20 }}>{c.qty}</label>
                                        <button style={{ width: 30 }} onClick={() => { dispatch(decrementQtyAction(c.fid)) }}>-</button>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="col-3">
                    <h2>Summary</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#items</th>
                                <th>{cart.length}</th>
                            </tr>
                            <tr>
                                <th>#qty</th>
                                <th>{qty}</th>
                            </tr>
                            <tr>
                                <th>#total</th>
                                <th>{totalBill}</th>
                            </tr>
                        </thead>
                    </table>
                    <button className="btn btn-primary col-12 mt-3" onClick={handlePlaceOrderClick} >Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default Cart
