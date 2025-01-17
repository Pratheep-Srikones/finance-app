export interface Expense {
  expense_id: string;
  user_id: string;
  type: string;
  amount: number;
  description: string;
  happened_at: string;
}

export interface User {
  username: string;
  email: string;
  picture_link: string;
}
