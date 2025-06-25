export default function CartItem({item}) {
    return (
        <div>
            <img src={item.image} style={{width:'50px', height:'50px'}} alt={item.name} />
            <h1>{item.name}</h1>
            <p>Price: {item.price}</p>
        </div>
    )
}