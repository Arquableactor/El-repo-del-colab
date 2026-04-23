import Chart from "react-apexcharts";

export default function CategoryChart({ transactions = [] }) {

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-[#0B1220] p-6 rounded-xl border border-[#1B2A3A]">
        <h3 className="mb-4 text-[#A5B5BF]">Gastos por categoría</h3>
        <p className="text-[#A5B5BF]">No hay datos suficientes</p>
      </div>
    );
  }

  const categoryMap = {
    food: "Comida",
    transport: "Transporte",
    entertainment: "Entretenimiento",
    other: "Otros",
  };

  const categoryData = {};

  transactions.forEach((tx) => {
    if (tx.type !== "expense") return;

    const key = tx.category || "other";

    if (!categoryData[key]) {
      categoryData[key] = 0;
    }

    categoryData[key] += tx.amount;
  });

  const labels = Object.keys(categoryData).map(
    (key) => categoryMap[key] || key
  );

  const series = Object.values(categoryData);

  const options = {
    chart: {
      type: "donut"
    },
    labels: labels,
    colors: ["#00D4FF", "#FF6B6B", "#FFC857", "#00E6A8"],
    legend: {
      labels: {
        colors: "#EAF4FF"
      }
    }
  };

  return (
    <div className="bg-[#0B1220] p-6 rounded-xl border border-[#1B2A3A]">
      <h3 className="mb-4 text-[#A5B5BF]">Gastos por categoría</h3>
      <Chart options={options} series={series} type="donut" height={300} />
    </div>
  );
}