import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions, createTransaction } from "../services/api";

import { useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../components/layout/DashboardLayout";
import MonthlyFlowChart from "../components/charts/MonthlyFlowChart";
import CategoryChart from "../components/charts/CategoryChart";
import IncomeVsExpenseChart from "../components/charts/IncomeVsExpenseChart";
import TransactionList from "../components/transactions/TransactionList";
import TransactionFilter from "../components/transactions/TransactionFilter";
import AnimatedNumber from "../components/ui/AnimatedNumber";
import Modal from "../components/ui/Modal";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Dashboard() {
  const [filter, setFilter] = useState("all");

  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <p className="text-white p-6">Cargando datos...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p className="text-red-500 p-6">Error al cargar datos</p>
      </DashboardLayout>
    );
  }

  const transactions = data || [];

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((tx) => tx.type === filter);

  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = totalIncome - totalExpense;

const handleSubmit = async () => {
  try {
    if (!description || !amount || !type || !category) {
      alert("Completa todos los campos");
      return;
    }

    const payload = {
      title: description,
      description: description,
      amount: Number(amount),
      type: type === "Ingreso" ? "income" : "expense",
      category:
        category === "Comida"
          ? "food"
          : category === "Transporte"
          ? "transport"
          : category === "Entretenimiento"
          ? "entertainment"
          : "other",
      paymentMethod: "cash",
      date: new Date().toISOString(),
    };

    console.log("ENVIANDO:", payload);

    const res = await createTransaction(payload);

    console.log("RESPUESTA:", res);

    queryClient.invalidateQueries(["transactions"]);

    setIsOpen(false);
    setDescription("");
    setAmount("");
    setType("");
    setCategory("");

  } catch (error) {
    console.error("ERROR COMPLETO:", error);
  }
};

  return (
    <DashboardLayout>
      <motion.div variants={container} initial="hidden" animate="show">

        {/* BOTÓN */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-cyan-500 text-black px-4 py-2 rounded-lg hover:bg-cyan-400 transition"
          >
            + Nueva transacción
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-6">
          <motion.div variants={item} className="card-glow">
            <p className="text-[#A5B5BF]">Balance</p>
            <h3 className="text-2xl text-cyan-400 font-bold">
              <AnimatedNumber value={balance} />
            </h3>
          </motion.div>

          <motion.div variants={item} className="card-glow">
            <p className="text-[#A5B5BF]">Ingresos</p>
            <h3 className="text-2xl text-green-400 font-bold">
              <AnimatedNumber value={totalIncome} />
            </h3>
          </motion.div>

          <motion.div variants={item} className="card-glow">
            <p className="text-[#A5B5BF]">Gastos</p>
            <h3 className="text-2xl text-red-400 font-bold">
              <AnimatedNumber value={totalExpense} />
            </h3>
          </motion.div>
        </div>

        {/* GRÁFICAS */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <motion.div variants={item}>
            <MonthlyFlowChart />
          </motion.div>
          <motion.div variants={item}>
            <CategoryChart />
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-6">
          <IncomeVsExpenseChart />
        </motion.div>

        {/* TRANSACCIONES */}
        <motion.div variants={item} className="mt-6">
          <TransactionFilter filter={filter} setFilter={setFilter} />
          <TransactionList transactions={filteredTransactions} />
        </motion.div>

      </motion.div>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-white text-lg mb-4">Nueva Transacción</h2>

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-2 bg-[#0B1220] text-white rounded"
        />

        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-3 p-2 bg-[#0B1220] text-white rounded"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mb-3 p-2 bg-[#0B1220] text-white rounded"
        >
          <option value="">Tipo</option>
          <option value="Ingreso">Ingreso</option>
          <option value="Gasto">Gasto</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-3 p-2 bg-[#0B1220] text-white rounded"
        >
          <option value="">Categoría</option>
          <option value="Comida">Comida</option>
          <option value="Transporte">Transporte</option>
          <option value="Entretenimiento">Entretenimiento</option>
          <option value="Otros">Otros</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-cyan-500 text-black py-2 rounded-lg hover:bg-cyan-400 transition"
        >
          Guardar
        </button>
      </Modal>

    </DashboardLayout>
  );
}