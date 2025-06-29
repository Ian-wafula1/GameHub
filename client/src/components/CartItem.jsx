export default function CartItem({item}) {
    return (
        <div className="bg-neutral-800 rounded-2xl flex overflow-clip gap-3 pr-4 h-[5.8rem]">
            <img className="h-[100%]" src={item?.img_url || "https://placehold.co/400/grey/black"}  alt={item.name} />
            <div className="my-2 flex flex-col justify-between">
                <h1 className="font-bold text-xl">{item?.name}</h1>
                <p className="font-bold text-green-700">{'$'+item?.price || 'Unlisted'}</p>
            </div>
        </div>
    )
}