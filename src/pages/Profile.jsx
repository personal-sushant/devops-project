import { toast } from "react-toastify"
import Navbar from "../components/Navbar"
import { getUser, updateUser } from "../services/user"
import { useEffect, useState } from "react"

function Profile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const getUserProfile = async () => {
        const token = window.sessionStorage.getItem('token')
        const response = await getUser(token)
        if (response.status == 'success') {
            // console.log(response)
            setName(response.data.name)
            setEmail(response.data.email)
            setPhone(response.data.phone)
        }
        else
            toast.error(response.error)
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    const handleUpdateClick = async () => {
        const token = window.sessionStorage.getItem('token')
        const response = await updateUser(token, phone)
        if (response.status == 'success')
            toast.success('profile updated successfully')
        else
            toast.error(response.error)
    }
    return (
        <div>
            <div className="container m-3">
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label for="username" className="form-label">Name</label>
                            <input type="text" className="form-control" id="username" value={name} readOnly />
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={email} readOnly />
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="mb-3">
                            <label for="phone" className="form-label">Phone</label>
                            <input type="tel" className="form-control" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <button className="btn btn-success" onClick={handleUpdateClick}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
