import Layout from "../layout/Layout";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";

const ExpensePage = () => {
  let expense = JSON.parse(localStorage.getItem("EXPENSE")) || [];
  const [data, setData] = useState([]);
  let [FormObj, setFormObj] = useState({
    amount: "",
    discription: "",
  });
  let [showtotal, setTotal] = useState(0);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("EXPENSE"));
    if (storedData) {
      storeData(storedData);
    }
  }, [FormObj]);

  const storeData = (data) => {
    setData(data);
    setTotal(data.reduce((prev, next) => prev + Number(next.amount), 0));
  };

  const inputOnChange = (property, value) => {
    setFormObj((preObj) => ({
      ...preObj,
      [property]: value,
    }));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!FormObj.amount) return;
    expense.push({
      ...FormObj,
      id: Date.now(),
    });
    localStorage.setItem("EXPENSE", JSON.stringify(expense));
    setFormObj({
      amount: "",
      discription: "",
    });
    toast.success("Expense Data Save Successfully.");
  };

  // remove item
  const removeItem = (id) => {
    expense = expense.filter((item) => item.id !== id);
    localStorage.setItem("EXPENSE", JSON.stringify(expense));
    storeData(expense);
    toast.warn("Expense Data Delete Successfully.");
  };

  return (
    <Layout>
      <div className="sm:h-screen bg-center">
        <div className="container mx-auto my-16 pt-10">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex justify-center rounded-xl">
              <div className="card w-full shadow-xl p-9 bg-orange-200">
                <h1 className="text-center pb-4 font-bold">
                  Expense Entry
                </h1>
                <form onSubmit={formSubmit}>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Discription
                      </span>
                    </label>
                    <textarea
                      value={FormObj.discription}
                      onChange={(e) => {
                        inputOnChange("discription", e.target.value);
                      }}
                      className="textarea textarea-bordered h-24"
                      placeholder="Expense Description Here"
                    ></textarea>
                  </div>
                  <div className="form-control w-full pt-2">
                    <label className="label">
                      <span className="label-text font-semibold">Amount</span>
                    </label>
                    <input
                      value={FormObj.amount}
                      onChange={(e) => {
                        inputOnChange("amount", e.target.value);
                      }}
                      type="number"
                      placeholder="Expense Amount Here"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="card-actions justify-end pt-5">
                    <button className="btn btn-active btn-neutral">
                      Save Expense
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex justify-center rounded-xl">
              <div className="card w-full shadow-xl p-9 bg-orange-200">
                <h1 className="text-center pb-12 font-bold">
                  Expense List
                </h1>
                <div className="overflow-x-auto">
                  <table className="table table-xs">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Discription</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th>{index + 1}</th>
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
                            <td>
                              <button
                                onClick={() => {
                                  removeItem(item.id);
                                }}
                              >
                               {/* Delete Icon  */}
                              <TiDelete />  
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="2" className="text-end">
                          Total:
                        </th>
                        <th>
                          <NumericFormat
                            displayType="text"
                            value={showtotal}
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExpensePage;
