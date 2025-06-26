import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Checkout() {
    const navigate = useNavigate()
    if (!localStorage.getItem('token')) {
        navigate('/login')
    }

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        axios.get('/api/cart', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setCartItems(res.data)
        }).catch(err => console.log(err))
    }, [])

    function confirmPurchase() {
        axios.post('/api/orders', {
            items: cartItems,
            total: cartItems.reduce((acc, item) => acc + item.price, 0)
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        navigate('/orders')
    }
    return (
        <>
        <div>
            {cartItems.map(item => {
                return <div>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                </div>
            })}
        </div>
        <div>
            <p>Total: {cartItems.reduce((acc, item) => acc + item.price, 0)}</p>
        </div>
        <div>
            <button onClick={confirmPurchase} >Confirm Purchase</button>
        </div>
        </>
    )
}