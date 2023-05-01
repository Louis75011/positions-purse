import Transaction from './Transaction';

interface BankAccount {
    id: string;
    accountType: 'checking' | 'savings' | 'moneyMarket';
    accountNumber: string;
    balance: number;
    transactions: Transaction[];
}

export default BankAccount;