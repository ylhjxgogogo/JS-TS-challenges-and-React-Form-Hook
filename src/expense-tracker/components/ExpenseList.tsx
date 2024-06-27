import React from "react";
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}
type Props = {
  expense: Expense[];
  onDelete: (id: number) => void;
};
const ExpenseList = ({ expense, onDelete }: Props) => {
  if (!expense.length) return null;
  return (
    <table className="table table-bordered center">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {expense.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>{item.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            $
            {expense
              .reduce((acc, item) => {
                return item.amount + acc;
              }, 0)
              .toFixed(2)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
