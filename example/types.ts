import { z } from "zod";

interface IAddress {
  street: string;
  postcode: number;
  user: IUser;
}

interface IUser {
  firstName: string;
  age: number;
  address: IAddress;
}

const Address: z.ZodType<IAddress> = z.lazy(() => {
  return z.object({
    street: z.string(),
    postcode: z.number(),
    user: User,
  });
});

const User: z.ZodType<IUser> = z.lazy(() => {
  return z.object({
    firstName: z.string(),
    age: z.number(),
    address: Address,
  });
});

export { Address, User };
