import { Car } from "./car";

export type GetCompaniesResponse = {
  data: Company[];
};

export type Company = {
  id: number;
  name: string;
  userId: number;
  car?: Car[];
};
