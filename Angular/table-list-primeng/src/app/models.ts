export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthday: string;
  salary: number;
  phone: string;
}
export interface CriteriaSort {
  name: string;
  code: string;
  type: string;
}

export interface DirectionSort {
  name: string;
  code: string;
}

export interface FormTableView {
  field: string;
  header: string;
}
