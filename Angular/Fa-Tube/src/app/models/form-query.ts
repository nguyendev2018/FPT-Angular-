import { OptionSort } from './option-sort';


export interface FormQuery {
  keyWordControl: string;
  orderControl: string | OptionSort;
  dateFromControl: string;
  dateToControl: string;
}
