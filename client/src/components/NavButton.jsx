export default function NavButton({ icon, label, logo, handleClick }) {
  return (
    <button onClick={handleClick} className="w-full flex items-center gap-2 bg-white text-black px-4 py-2 rounded-2xl hover:bg-gray-200 transition">
      {logo? <img className="w-5 h-5" src={logo} alt={label} /> : <span className="w-5 h-5">{icon}</span>}
      <span className="text-base font-semibold">{label}</span>
    </button>
  );
}