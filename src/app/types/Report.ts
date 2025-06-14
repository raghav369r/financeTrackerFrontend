type dayReport = {
  date: Date;
  expense: number;
  income: number;
};
type expense = {
  category: string;
  expense: number;
};

type Report = {
  overallSummary: [
    { type: string; sum: number },
    { type: string; sum: number }
  ];
  monthlySummary: dayReport[];
  expenseSummary: expense[];
};
export default Report;

const res = {
  overallSummary: [
    {
      type: 'Expense',
      sum: 36140,
    },
    {
      type: 'Income',
      sum: 976230,
    },
  ],
  monthlySummary: [
    {
      date: '2025-06-01',
      expense: 8700,
      income: 0,
    },
    {
      date: '2025-06-02',
      expense: 1000,
      income: 0,
    },
    {
      date: '2025-06-06',
      expense: 1000,
      income: 0,
    },
    {
      date: '2025-06-08',
      expense: 16000,
      income: 10000,
    },
    {
      date: '2025-06-09',
      expense: 1500,
      income: 0,
    },
    {
      date: '2025-06-10',
      expense: 1000,
      income: 0,
    },
    {
      date: '2025-06-12',
      expense: 0,
      income: 10000,
    },
    {
      date: '2025-06-13',
      expense: 120,
      income: 0,
    },
    {
      date: '2025-06-19',
      expense: 0,
      income: 900000,
    },
    {
      date: '2025-06-20',
      expense: 90,
      income: 0,
    },
    {
      date: '2025-06-21',
      expense: 400,
      income: 0,
    },
  ],
  expenseSummary: [
    {
      category: 'Fuel',
      expense: 600,
    },
    {
      category: 'Others',
      expense: 90,
    },
    {
      category: 'Rent',
      expense: 20410,
    },
    {
      category: 'Travel',
      expense: 8900,
    },
    {
      category: 'UtilityBill',
      expense: 6140,
    },
  ],
};
