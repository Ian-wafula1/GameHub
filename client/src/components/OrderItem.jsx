export default function OrderItem({order}) {
    return (
        <div>
            <h1>{order.id}</h1>
            <p>Items: {order.items.map(item => item.name).join(', ')}</p>
            <p>Total: {order.total}</p>
            <p>Date: {order.purchased_at}</p>
            <p>Receipt: {order.receipt}</p>
        </div>
    )
}