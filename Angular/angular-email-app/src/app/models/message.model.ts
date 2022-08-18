export interface MessageModel {
    _id: string;
    corpus: string;
    senderName: { last: string; first: string };
    date: string;
    to: string;
    from: string;
    subject: string;
    body: string;
    folder: string;
}
