import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Merchant",
    lastName:"Account",
    email:"my@marchant.com",
    password:"123456789",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName:"Test",
    lastName:"User",
    email:"test@test.com",
    password:"test123",
    createdAt:formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Customer",
    lastName: "Account",
    email: "my@customer.com",
    password: "123456789",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];