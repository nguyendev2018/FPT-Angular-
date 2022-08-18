export interface Message {
  folder: string;
  body: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  senderName: SenderName;
  corpus: string;
  _id: string;
}

export interface SenderName {
  last: string;
  first: string;
}
