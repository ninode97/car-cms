import { PaginationProps } from "./shared";

export interface CarsRequest extends PaginationProps {}
export interface CarsResponse extends PaginationProps {
  data: Car[];
}

export type Car = {
  id: number;
  plateCode: string;
  vinCode: string;
  userId: number;
  companyId: number;
  modelId: number;
  year: number;
  acquiredDate: string;
  insuranceValidFrom: string;
  insuranceExpiresOn: string;
  technicalInspectionValidFrom: string;
  technicalInspectionExpiresOn: string;
  model: CarModel;
};

export type CarModel = {
  id: number;
  name: string;
  brandId: number;
  Brand: CarBrand;
};

export type CarBrand = {
  id: number;
  name: string;
};
