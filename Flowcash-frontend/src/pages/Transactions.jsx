import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getTransactions } from "../services/api";

import DashboardLayout from "../components/layout/DashboardLayout";
import TransactionList from "../components/transactions/TransactionList";
import TransactionFilter from "../components/transactions/TransactionFilter";

export default function Transactions() {
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <p className="text-white p-6">Cargando...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p className="text-red-500 p-6">Error</p>
      </DashboardLayout>
    );
  }

  const transactions = data || [];

  const filteredTransactions = transactions.filter((tx) => {
    const matchSearch = tx.description
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchType =
      filters.type === "all" || tx.type === filters.type;

    const matchCategory =
      filters.category === "all" || tx.category === filters.category;

    return matchSearch && matchType && matchCategory;
  });

  return (
    <DashboardLayout>
      <h2 className="text-xl mb-4">Página de Transacciones</h2>

      <TransactionFilter onFilter={setFilters} />

      <TransactionList transactions={filteredTransactions} />
    </DashboardLayout>
  );
}