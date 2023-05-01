import React from 'react';
import BankAccount from '../services/interfaces/BankAccount';
import Transaction from '../services/interfaces/Transaction';
import bankData from '../services/data/bankData.json';

const { id, accountType, accountNumber, balance, transactions } = bankData as unknown as BankAccount;
// On utilise 'as unknown as' pour contourner l'erreur

const formattedTransactions: Transaction[] = transactions.map((transaction) => ({
    id: transaction.id.toString(),
    date: new Date(transaction.date),
    description: transaction.description,
    category: transaction.category,
    amount: transaction.amount
}));

const formattedBankData: BankAccount = {
    id: id.toString(),
    accountType,
    accountNumber,
    balance,
    transactions: formattedTransactions
};

const Home: React.FC = () => {
    return (
        <div>
            <h1>Bank Account</h1>
            <p>Account Type: {formattedBankData.accountType}</p>
            <p>Account Number: {formattedBankData.accountNumber}</p>
            <p>Balance: {formattedBankData.balance}</p>
            <h2>Transactions</h2>
            <ul>
                {formattedBankData.transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.date.toDateString()} - {transaction.description}: ${transaction.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;