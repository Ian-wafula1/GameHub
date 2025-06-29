import getRandomHexColor from '../utils/getRandomHex'

export default function FriendCard({friend}) {
    return (
        <div className='flex gap-3 items-center'>
            <img className='w-10 h-10 rounded-full' src={friend?.profile_picture || `https://ui-avatars.com/api/?name=${friend?.username?.at(0)}&background=${getRandomHexColor()}&format=svg`} alt={friend.name} />
            <div>
                <p className=''>{friend?.username}</p>
                <p className='text-sm text-gray-400'>{friend?.email}</p>
            </div>
        </div>
    )
}