export type Car = {
  id: number;
  plateCode: string;
  vinCode: string;
  userId: number;
  companyId: number;
  modelId: number;
  year: number;
  acquiredDate: Date;
  insuranceValidFrom: Date;
  insuranceExpiresOn: Date;
  technicalInspectionValidFrom: Date;
  technicalInspectionExpiresOn: Date;
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
