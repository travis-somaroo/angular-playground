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

export interface UserState {
  users: User[];
  pagination: Pagination;
  criteria: string;
  loading: boolean;
}


