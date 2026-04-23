export default function TransactionItem({ tx, onEdit, onDelete }) {
  if (!tx) return null;

  return (
    <div className="flex justify-between items-center p-3 bg-[#050816] rounded-lg border border-[#1B2A3A]">

      <div>
        <p className="font-semibold">{tx.description}</p>
        <p className="text-sm text-[#A5B5BF]">
          {tx.category} • {new Date(tx.date).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <p
          className={`font-bold ${
            tx.type === "income" ? "text-green-400" : "text-red-400"
          }`}
        >
          {tx.type === "income" ? "+" : "-"}${tx.amount}
        </p>

        <button
          onClick={() => onEdit(tx)}
          className="text-yellow-400"
        >
          ✏️
        </button>

        <button
          onClick={() => onDelete(tx._id)}
          className="text-red-400"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}