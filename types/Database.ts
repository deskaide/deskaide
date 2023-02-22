type Order = 'ascending' | 'descending';

export type GetAllQuery = {
  limit?: number;
  startKey?: string;
  endKey?: string;
  order?: Order;
};

export type GetAllQueryResponse<T> = {
  items: T[];
  nextStartKey?: string;
};
