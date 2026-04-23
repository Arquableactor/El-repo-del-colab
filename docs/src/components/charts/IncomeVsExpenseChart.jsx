import Chart from "react-apexcharts";

export default function IncomeVsExpenseChart({ transactions = [] }) {

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-[#0B1220] p-6 rounded-xl border border-[#1B2A3A]">
        <h3 className="mb-4 text-[#A5B5BF]">Ingresos vs Gastos</h3>
        <p className="text-[#A5B5BF]">No hay datos suficientes</p>
      </div>
    );
  }

  const income = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent"
    },
    colors: ["#00E6A8", "#FF6B6B"],
    xaxis: {
      categories: ["Total"],
      labels: {
        style: {
          colors: "#A5B5BF"
        }
      }
    },
    legend: {
      labels: {
        colors: "#EAF4FF"
      }
    },
    grid: {
      borderColor: "#1B2A3A"
    }
  };

  const series = [
    {
      name: "Ingresos",
      data: [income]
    },
    {
      name: "Gastos",
      data: [expense]
    }
  ];

  return (
    <div className="bg-[#0B1220] p-6 rounded-xl border border-[#1B2A3A]">
      <h3 className="mb-4 text-[#A5B5BF]">Ingresos vs Gastos</h3>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}