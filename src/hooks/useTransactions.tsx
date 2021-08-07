import React from 'react'
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput  = Omit<Transaction, 'id' | 'createdAt'>;
// type TransactionInput  = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

interface TransactionsProviderProps {
  children: React.ReactNode
}


interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}


const TransactionsContext = React.createContext<TransactionsContextData>({} as TransactionsContextData);


export function TransactionsProvider({ children }: TransactionsProviderProps) {

  const [transactions, setTransactions] = React.useState<Transaction[]>([]);



  React.useEffect(() => {
    api.get('transactions')
      .then(response => {
        // console.log("Data", response.data);
        setTransactions(response.data.transactions);

      });
  }, []);


  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()});
    
    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
    
  }


  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );


}

export function useTransactions() {
  const context = React.useContext(TransactionsContext);

  return context;
}