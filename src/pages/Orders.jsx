import { toast } from "react-toastify"
import Navbar from "../components/Navbar"
import { getOrders } from "../services/order"
import { useState } from "react"
import { useEffect } from "react"

function Orders() {
    const [orders, setOrders] = useState([])

    const getAllOrders = async () => {
        const token = window.sessionStorage.getItem('token')
        const response = await getOrders(token)
        if (response.status == 'success') {
            setOrders(response.data)
        } else
            toast.error(error)
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#oid</th>
                        <th>order date</th>
                        <th>total Bill</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(o => {
                            return <tr>
                                <td>{o.oid}</td>
                                <td>{o.odate}</td>
                                <td>{o.total}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Orders
