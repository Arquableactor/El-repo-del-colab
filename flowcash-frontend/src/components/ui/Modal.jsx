export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose} 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        className="bg-[#0B1220] p-6 rounded-xl w-[400px] border border-[#1B2A3A]"
      >
        <button
          onClick={onClose}
          className="text-[#A5B5BF] mb-4 hover:text-white"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}