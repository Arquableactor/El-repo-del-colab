const BASE_URL = "https://flowcash-api.onrender.com/api";

export const getTransactions = async () => {
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) throw new Error("Error fetching transactions");
  const data = await res.json();
  return data.data;
};

export const createTransaction = async (payload) => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: payload.description,
      amount: Number(payload.amount),
      type: payload.type,
      category: payload.category,
    }),
  });

  if (!res.ok) throw new Error("Error creating transaction");
  const data = await res.json();
  return data.data;
};

export const updateTransaction = async (id, payload) => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: payload.description,
      amount: Number(payload.amount),
      type: payload.type,
      category: payload.category,
    }),
  });

  if (!res.ok) throw new Error("Error updating transaction");
  const data = await res.json();
  return data.data;
};

export const deleteTransaction = async (id) => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error deleting transaction");
  const data = await res.json();
  return data.data;
};