export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "User";
  status: "Free" | "Paid";
  token: string;
}
