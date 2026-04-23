import { useState } from "react";

export default function TransactionForm() {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: ""
  });

  return (
    <div className="flex flex-col gap-3">

      <h3 className="text-lg font-semibold text-[#00D4FF]">
        Nueva Transacción
      </h3>

      <input
        placeholder="Descripción"
        className="p-2 rounded bg-[#050816] border border-[#1B2A3A]"
      />

      <input
        placeholder="Monto"
        type="number"
        className="p-2 rounded bg-[#050816] border border-[#1B2A3A]"
      />

      <select className="p-2 rounded bg-[#050816] border border-[#1B2A3A]">
        <option value="income">Ingreso</option>
        <option value="expense">Gasto</option>
      </select>

      <input
        placeholder="Categoría"
        className="p-2 rounded bg-[#050816] border border-[#1B2A3A]"
      />

      <button className="bg-[#00D4FF] text-black p-2 rounded font-bold mt-2">
        Guardar
      </button>

    </div>
  );
}