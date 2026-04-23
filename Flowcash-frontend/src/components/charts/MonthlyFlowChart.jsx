import Chart from "react-apexcharts";

export default function MonthlyFlowChart({ transactions = [] }) {

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-[#0B1220] p-6 rounded-xl border border-[#1B2A3A]">
        <h3 className="mb-4 text-[#A5B5BF]">Flujo mensual</h3>
        <p className="text-[#A5B5BF]">No hay datos suficientes</p>
      </div>
    );
  }

  const monthlyData = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);

    const key = `${date.getFullYear()}-${date.getMonth()}`; // clave única
    const label = date.toLocaleString("default", { month: "short" });

    if (!monthlyData[key]) {
      monthlyData[key] = {
        label,
        income: 0,
        expense: 0,
      };
    }

    if (tx.type === "income") {
      monthlyData[key].income += tx.amount;
    } else {
      monthlyData[key].expense += tx.amount;
    }
  });

  // 🔥 ordenar cronológicamente
  const sortedMonths = Object.keys(monthlyData).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const labels = sortedMonths.map((key) => monthlyData[key].label);
  const incomeData = sortedMonths.map((key) => monthlyData[key].income);
  const expenseData = sortedMonths.map((key) => monthlyData[key].expense);

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "transparent"
    },
    theme: {
      mode: "dark"
    },
    stroke: {
      curve: "smooth"
    },
    colors: ["#00D4FF", "#FF6B6B"],
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: "#A5B5BF"
        }
      }
    },
    yaxis: {
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
      data: incomeData
    },
    {
      name: "Gastos",
      data: expenseData
    }
  ];

  return (
    <div className="bg-[#0B1220] p-6 rounded-xl border border-[#1B2A3A]">
      <h3 className="mb-4 text-[#A5B5BF]">Flujo mensual</h3>
      <Chart options={options} series={series} type="area" height={300} />
    </div>
  );
}