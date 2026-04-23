import { useState } from "react";

export default function TransactionFilter({ onFilter }) {
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const handleChange = (newFilters) => {
    const updated = { ...newFilters };
    onFilter(updated);
  };

  return (
    <div className="bg-[#050816] p-4 rounded-xl border border-[#1B2A3A] mb-4 flex flex-wrap gap-4 items-center">

      {/*  BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          handleChange({ search: value, type, category });
        }}
        className="px-3 py-2 bg-[#0B1220] text-white rounded w-48"
      />

      {/*  FILTRO TIPO */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setType("all");
            handleChange({ search, type: "all", category });
          }}
          className={`px-3 py-1 rounded ${
            type === "all" ? "bg-[#00D4FF] text-black" : "bg-[#1B2A3A]"
          }`}
        >
          Todas
        </button>

        <button
          onClick={() => {
            setType("income");
            handleChange({ search, type: "income", category });
          }}
          className={`px-3 py-1 rounded ${
            type === "income" ? "bg-green-400 text-black" : "bg-[#1B2A3A]"
          }`}
        >
          Ingresos
        </button>

        <button
          onClick={() => {
            setType("expense");
            handleChange({ search, type: "expense", category });
          }}
          className={`px-3 py-1 rounded ${
            type === "expense" ? "bg-red-400 text-black" : "bg-[#1B2A3A]"
          }`}
        >
          Gastos
        </button>
      </div>

      {/*  FILTRO CATEGORÍA */}
      <select
        value={category}
        onChange={(e) => {
          const value = e.target.value;
          setCategory(value);
          handleChange({ search, type, category: value });
        }}
        className="px-3 py-2 bg-[#0B1220] text-white rounded"
      >
        <option value="all">Categoría</option>
        <option value="food">Comida</option>
        <option value="transport">Transporte</option>
        <option value="entertainment">Entretenimiento</option>
        <option value="other">Otros</option>
      </select>

      {/*  RESET */}
      <button
        onClick={() => {
          setSearch("");
          setType("all");
          setCategory("all");
          handleChange({ search: "", type: "all", category: "all" });
        }}
        className="bg-red-500 px-3 py-2 rounded text-white"
      >
        Limpiar
      </button>

    </div>
  );
}