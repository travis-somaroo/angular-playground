export interface User {
  gender: string;
  name: {
    first: string;
    last: string;
  };
}

export interface Pagination {
  selectedSize: number;
  currentPage: number;
  pageSizes: number[];
}

export interface RandomUserResponse {
  results: User[];
}
