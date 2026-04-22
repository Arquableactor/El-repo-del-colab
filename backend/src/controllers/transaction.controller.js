const createTransaction = async (req, res, next) => {
  try {
    const { description, amount, type, category } = req.body;

    if (!description || !amount || !type || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const typeMap = {
      Ingreso: "income",
      Gasto: "expense",
    };

    const categoryMap = {
      Comida: "food",
      Transporte: "transport",
      Entretenimiento: "entertainment",
      Salud: "health",
      Educación: "education",
      Compras: "shopping",
      Otros: "other",
    };

    const transaction = await Transaction.create({
      title: description,
      description,
      amount: Number(amount),
      type: typeMap[type] || type,
      category: categoryMap[category] || "other",
      date: new Date(),
      paymentMethod: "cash",
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};