interface Transaction {
    id: string;
    date: Date;
    description: string;
    category: string;
    amount: number;
}

export default Transaction;