import { Link, useNavigate } from "react-router"
import logo from '../assets/logo.png'
import { useContext } from "react"
import { useSelector } from "react-redux"
import { useAuthContext } from "../provider/AuthProvider"

function Navbar() {
    const navigate = useNavigate()
    // const { setuser } = useContext(AuthContext)
    const { setuser } = useAuthContext()// custom hook
    const cart = useSelector(store => store.cartReducer.cart)

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <span className="navbar-brand" href="#">
                    <Link className="nav-link" aria-current="page" to="/home">
                        <img src={logo} alt="" style={{ width: 80 }} />
                    </Link>
                </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/cart">Cart({cart.length})</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/orders">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => {
                                setuser(null)
                                window.sessionStorage.removeItem('token')
                                navigate('/')
                            }} >Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
