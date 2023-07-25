import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { NumericFormat } from "react-number-format";

const HomePage = () => {
  const [incomedata, setIncomeData] = useState([]);
  let [incomeTotal, setIncomeTotal] = useState(0);
  const [expensedata, setExpenseData] = useState([]);
  let [expenseTotal, setExpenseTotal] = useState(0);

  const storeData = (storedIncomeData) => {
    setIncomeData(storedIncomeData);
    setIncomeTotal(
      storedIncomeData.reduce((prev, next) => prev + Number(next.amount), 0)
    );
  };

  const storeExpenseData = (storedExpenseData) => {
    setExpenseData(storedExpenseData);
    setExpenseTotal(
      storedExpenseData.reduce((prev, next) => prev + Number(next.amount), 0)
    );
  };

  useEffect(() => {
    const storedIncomeData = JSON.parse(localStorage.getItem("INCOME"));
    if (storedIncomeData) {
      storeData(storedIncomeData);
    }
    const storedExpenseData = JSON.parse(localStorage.getItem("EXPENSE"));
    if (storedExpenseData) {
      storeExpenseData(storedExpenseData);
    }
  }, []);





  return (
    <Layout>
      {/* <div className="lg:h-screen bg-[url('../pattern.svg')] bg-center"> */}
      <div className="lg:h-screen bg-center">
        <div className="container mx-auto my-16 p-5">
          <div className="grid grid-cols-1 p-8 justify-center">
            <div
              className={`card p-8 col-span-2 justify-center justify-self-center mx-auto
              text-white text-center text-lg ${
                incomeTotal - expenseTotal > 10 ? "bg-green-300" : "bg-red-400"
              }`}
            >
              <span className="italic font-semibold text-black">
                Current Balance:
              </span>
              <p className="italic font-semibold text-black">
                <NumericFormat
                  displayType="text"
                  value={incomeTotal - expenseTotal}
                  decimalScale={2}
                  fixedDecimalScale
                  thousandsGroupStyle="lakh"
                  thousandSeparator=","
                  prefix={"৳ "}
                />
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2">
            {incomedata.length != 0 ? (
              <div className="card w-full shadow-xl bg-green-300 p-9 bg-opacity-25">
                <h1 className="text-center pb-12 font-bold">
                  Income List
                </h1>
                <div className="overflow-x-auto">
                  <table className="table table-xs text-black-900">
                    <thead className="text-black">
                      <tr>
                        <th>#</th>
                        <th>Discription</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomedata.map((income, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{income.discription}</td>
                            <td>
                              <NumericFormat
                                displayType="text"
                                value={income.amount}
                                decimalScale={2}
                                fixedDecimalScale
                                thousandsGroupStyle="lakh"
                                thousandSeparator=","
                                prefix={"৳ "}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="2" className="text-end text-black">
                          Total Income:
                        </th>
                        <th className="text-black">
                          <NumericFormat
                            displayType="text"
                            value={incomeTotal}
                            decimalScale={2}
                            fixedDecimalScale
                            thousandsGroupStyle="lakh"
                            thousandSeparator=","
                            prefix={"৳ "}
                          />
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ) : (
              ""
            )}
            {expensedata.length != 0 ? (
              <div className="card w-full shadow-xl bg-orange-200 p-9">
                <h1 className="text-center pb-12 font-bold">
                  Expense List
                </h1>
                <div className="overflow-x-auto">
                  <table className="table table-xs">
                    <thead className="text-black">
                      <tr>
                        <th>#</th>
                        <th>Discription</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expensedata.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.discription}</td>
                            <td>
                              <NumericFormat
                                displayType="text"
                                value={item.amount}
                                decimalScale={2}
                                fixedDecimalScale
                                thousandsGroupStyle="lakh"
                                thousandSeparator=","
                                prefix={"৳ "}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="2" className="text-end text-black">
                          Total Expense:
                        </th>
                        <th className="text-black">
                          <NumericFormat
                            displayType="text"
                            value={expenseTotal}
                            decimalScale={2}
                            fixedDecimalScale
                            thousandsGroupStyle="lakh"
                            thousandSeparator=","
                            prefix={"৳ "}
                          />
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
