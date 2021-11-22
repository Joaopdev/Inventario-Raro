export type driverErrorTypeOrm = {
  code: string;
  errno: number;
  sqlMessage: string;
  sqlState: string;
  index: 0;
  sql: string;
};

export type TypeOrmError = {
  driverError: driverErrorTypeOrm;
  message: string;
  name: string;
  parameters: string[];
  query: string;
  stack?: string;
};
