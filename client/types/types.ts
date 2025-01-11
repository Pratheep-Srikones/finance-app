export interface Expense {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
}

export interface User {
  username: string;
  email: string;
  picture_link: string;
}
