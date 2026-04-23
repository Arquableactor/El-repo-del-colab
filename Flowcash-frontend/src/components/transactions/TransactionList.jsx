import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (!transactions || transactions.length === 0) {
    return (
      <p className="text-[#A5B5BF] mt-4">
        No hay transacciones
      </p>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      {transactions.map((tx) => (
        <TransactionItem
          key={tx._id}
          tx={tx}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}