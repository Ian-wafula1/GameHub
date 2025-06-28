export default function OrderItem({order}) {
    console.log(order)
    return (
        <div>
            {/* <h1>{order.id}</h1> */}
            <p>Items: {order?.order_items?.map(item => item.name).join(', ')}</p>
            <p>Total: ${(order?.order_items?.reduce((acc, item) => acc + item.price, 0))?.toFixed(2)}</p>
            <p>Date: {order.updated_at}</p>
            <p>Receipt: {order.receipt}</p>
        </div>
    )
}