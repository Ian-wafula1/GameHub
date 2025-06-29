export default function OrderItem({ order }) {
	return (
		<div className="border-2 border-green-700 py-4 px-5 rounded-3xl flex flex-col gap-3">
			{/* <h1>{order.id}</h1> */}
			<p className="flex gap-2  items-center font-semibold text-2xl">
				<svg viewBox="0 0 24 24" fill="none" className="stroke-green-700 w-7 h-7 relative top-[2px]" xmlns="http://www.w3.org/2000/svg">
					<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
					<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						{' '}
						<path d="M8.5 12.5L10.5 14.5L15.5 9.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
						<path
							d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
							// stroke="#1C274C"
							strokeWidth="2"
							strokeLinecap="round"></path>{' '}
					</g>
				</svg>
				{order.receipt}
				<p className="text-green-700 ml-auto text-right col-span-1 row-span-1 font-bold text-base">${order?.order_items?.reduce((acc, item) => acc + item.price, 0)?.toFixed(2)}</p>

			</p>
            <div className="m-auto w-[100%] h-[2px] bg-green-700 " ></div>
			<div className="grid grid-cols-3 grid-rows-2 ">
				<div className="col-span-2 row-span-2">
					{order?.order_items
						?.map((item) => item.name)
						.map((item) => (
							<p className="text-lg" key={item}>{item}</p>
						))}
				</div>
				<p className="mt-auto text-right col-span-1 row-span-2 font-bold text-sm">{order.updated_at.split(' ')[0]}</p>
			</div>
		</div>
	);
}
