import { useState, useEffect } from "react";

export default function EditTransactionModal({ isOpen, onClose, tx, onSave }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "income",
    category: "other",
  });

  useEffect(() => {
    if (tx) {
      setForm({
        description: tx.description || "",
        amount: tx.amount || "",
        type: tx.type || "income",
        category: tx.category || "other",
      });
    }
  }, [tx]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...tx, ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0B1220] p-6 rounded-xl w-[400px] border border-[#1B2A3A]">

        <h2 className="text-lg mb-4">Editar Transacción</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Descripción"
            className="p-2 bg-[#050816] rounded"
          />

          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
            placeholder="Monto"
            className="p-2 bg-[#050816] rounded"
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="p-2 bg-[#050816] rounded"
          >
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
          </select>

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="p-2 bg-[#050816] rounded"
          >
            <option value="food">Comida</option>
            <option value="transport">Transporte</option>
            <option value="entertainment">Entretenimiento</option>
            <option value="other">Otros</option>
          </select>

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-500 rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-3 py-1 bg-[#00D4FF] text-black rounded"
            >
              Guardar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}