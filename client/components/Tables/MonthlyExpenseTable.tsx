"use client";
import { Expense } from "@/types/types";
import { formatToReadableDate } from "@/utils/convert";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const MonthlyExpenseTable = ({ expenses }: { expenses: Expense[] }) => {
  //const isLoggedin = localStorage.getItem("token");
  const [action, setAction] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [currExpense, setCurrExpense] = useState<Expense>({
    expense_id: "",
    happened_at: "",
    type: "",
    amount: 0,
    description: "",
    user_id: "",
  });

  const handleEditModalOpen = (id: string) => {
    console.log(id);
    setCurrExpense(expenses.find((expense) => expense.expense_id === id)!);
    setAction("Edit");
    setModalOpen(true);
  };

  const handleDeleteModalOpen = (id: string) => {
    console.log(id);
    setCurrExpense(expenses.find((expense) => expense.expense_id === id)!);
    setAction("Delete");
    setModalOpen(true);
  };

  const handleViewModalOpen = (id: string) => {
    console.log(id);
    setCurrExpense(expenses.find((expense) => expense.expense_id === id)!);
    setAction("View");
    setModalOpen(true);
  };

  const handleModalSubmit = () => {};

  return (
    <div className="rounded-sm border border-stroke bg-gray-900/80 px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className=" bg-gray-500/45 text-left">
              <th className="min-w-[80px] py-4 px-4 font-medium text-white xl:pl-11">
                Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white">
                Type
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white">
                Amount
              </th>

              <th className="py-4 px-4 font-medium text-center text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              {expenses &&
                expenses.map((expense, key) => {
                  return (
                    <tr key={key}>
                      <td
                        rowSpan={1}
                        className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11"
                      >
                        <p className="text-white">
                          {formatToReadableDate(expense.happened_at)}
                        </p>
                      </td>
                      <td rowSpan={1} className="border-black/40 py-5 px-4">
                        <p className="text-white dark:text-white">
                          {expense.type}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4">
                        <p className="text-white dark:text-white">
                          {expense.amount}/=
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4">
                        <div className="flex items-center justify-center space-x-3.5">
                          <button
                            onClick={() =>
                              handleViewModalOpen(expense.expense_id)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                stroke="white"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                stroke="white"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              handleEditModalOpen(expense.expense_id)
                            }
                            className="hover:text-blue-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="white"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteModalOpen(expense.expense_id)
                            }
                            className="hover:text-blue-600"
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill="white"
                              />
                              <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill="white"
                              />
                              <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill="white"
                              />
                              <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </>
          </tbody>
        </table>
      </div>
      <div
        className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 overflow-y-auto ${
          !modalOpen && "hidden"
        }`}
      >
        <div className="w-full max-w-[700px] rounded-lg bg-gray-700 px-8 py-12 md:px-17.5 md:py-15 max-h-screen overflow-y-auto">
          <h3 className="text-xl font-bold text-white dark:text-white sm:text-2xl">
            {
              {
                Edit: `Edit Expense`,
                Delete: "Delete Expense",
                View: " Expense Details",
              }[action]
            }
          </h3>
          <span className="bg-blue-500 h-[10px] w-16 sm:w-20 lg:w-24 block mb-2 rounded-2xl"></span>
          {action == "Delete" && (
            <>
              <div className="mb-4 text-white">
                Confirm to delete Transaction: {currExpense.type} of amount{" "}
                {currExpense.amount} on{" "}
                {new Date(currExpense.happened_at).toLocaleDateString()}
              </div>
              <div className="m-3 flex flex-row gap-y-4">
                <div className="w-full px-3 2xsm:w-1/2">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="block w-full rounded-lg  bg-gray-600 p-3 text-center font-medium text-white transition hover:border-red-600 hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
                <div className="w-full px-3 2xsm:w-1/2">
                  <button
                    onClick={handleModalSubmit}
                    className="block w-full rounded-lg   bg-gray-600 p-3 text-center font-medium text-white transition hover:bg-blue-950"
                  >
                    {action} Transaction
                  </button>
                </div>
              </div>
            </>
          )}

          {action == "Edit" && (
            <>
              <div className=" gap-4">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-white">
                    Type <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={currExpense.type}
                    onChange={(e) =>
                      setCurrExpense({ ...currExpense, type: e.target.value })
                    }
                    placeholder="Enter Type"
                    list="preset-options"
                    className="w-full border-2 border-gray-600 bg-transparent text-white p-2 rounded-lg focus:outline-none focus:border-blue-500 max-w-[300px]"
                  />
                  <datalist id="preset-options">
                    <option value="Food" />
                    <option value="Travel" />
                    <option value="Rent" />
                    <option value="Bills (Electricity, Water, Mobile)" />
                    <option value="Entertainment" />
                  </datalist>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-white dark:text-white">
                    Amount <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={currExpense.amount}
                    onChange={(e) =>
                      setCurrExpense({
                        ...currExpense,
                        amount: Number(e.target.value),
                      })
                    }
                    placeholder="Enter Amount"
                    className="w-full border-2 border-gray-600 bg-transparent text-white p-2 rounded-lg focus:outline-none focus:border-blue-500 max-w-[300px]"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-white dark:text-white">
                    Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={currExpense.happened_at}
                    onChange={(e) =>
                      setCurrExpense({
                        ...currExpense,
                        happened_at: e.target.value,
                      })
                    }
                    placeholder="Enter Date"
                    className="w-full border-2 border-gray-600 bg-transparent text-white p-2 rounded-lg focus:outline-none focus:border-blue-500 max-w-[300px]"
                  />
                </div>
                <div>
                  <label className="text-white my-2 block font-medium">
                    Description:
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-600 bg-transparent text-white p-2 rounded-lg focus:outline-none focus:border-blue-500 max-w-[300px]"
                    value={currExpense.description}
                    onChange={(e) =>
                      setCurrExpense({
                        ...currExpense,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="m-3 flex flex-row gap-y-4">
                  <div className="w-full px-3 2xsm:w-1/2">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="block w-full rounded-lg  bg-gray-600 p-3 text-center font-medium text-white transition hover:border-red-600 hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="w-full px-3 2xsm:w-1/2">
                    <button
                      onClick={handleModalSubmit}
                      className="block w-full rounded-lg   bg-gray-600 p-3 text-center font-medium text-white transition hover:bg-blue-950"
                    >
                      {action} Transaction
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {action === "View" && (
            <div className=" gap-4">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h1 className="text-gray-400 font-semibold">Type:</h1>
                  <p className="text-white">{currExpense.type}</p>
                </div>

                <div className="flex justify-between">
                  <h1 className="text-gray-400 font-semibold">Amount:</h1>
                  <p className="text-white">{currExpense.amount}</p>
                </div>

                <div className="flex justify-between">
                  <h1 className="text-gray-400 font-semibold">Date:</h1>
                  <p className="text-white">{currExpense.happened_at}</p>
                </div>

                <div>
                  <h1 className="text-gray-400 font-semibold mb-1">
                    Description:
                  </h1>
                  <p className="text-white">{currExpense.description}</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="block w-full rounded-lg  bg-gray-600 p-3 text-center font-medium text-white transition hover:border-red-600 hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MonthlyExpenseTable;
