export default function NavButton({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition">
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}