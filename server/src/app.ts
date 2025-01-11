import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.route";
import expenseRoutes from "./routes/expense.route";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

export default app;
