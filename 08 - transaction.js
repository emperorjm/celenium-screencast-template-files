import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', {
    state: () => ({
      transactionData: null,
      transactions: [],
      transactionCount: 0,
      offset: 0, // Add offset to the state
      loading: false,
      error: null,
    }),
    actions: {
      async fetchTransactionData() {
        this.error = null;
        this.loading = true;
        this.transactionData = null;
  
        try {
          const response = await axios.get(
            `https://api-docs.celenium.io/api/transaction/${this.selectedTransaction}`
          );
          this.transactionData = response.data;
        } catch (err) {
          this.error = 'Unable to fetch transaction data. Please check the Transaction ID.';
        } finally {
          this.loading = false;
        }
      },
      async fetchTransactions(limit = 10, offset = 0) {
        this.error = null;
        this.loading = true;
      
        try {
          const response = await axios.get(
            `https://api-mainnet.celenium.io/v1/tx?limit=${limit}&offset=${offset}&sort=desc&&messages=false`
          );
          this.transactions = response.data; // Update transactions
          this.offset = offset;           // Set the current offset
        } catch (err) {
          this.error = 'Unable to fetch transactions.';
        } finally {
          this.loading = false;
        }
      },      
      async fetchTransactionCount() {
        try {
          const response = await axios.get(
            `https://api-mainnet.celenium.io/v1/tx/count`
          );
          console.log("This is the response", response.data);
          if (response.data && response.data.status !== 200) {
            console.log("This is the count", response);
            this.transactionCount = response.data;
          } else {
            console.log("This is the count", response);
            throw new Error('Invalid response structure');
          }
        } catch (err) {
          this.error = 'Unable to fetch transaction count.';
          this.transactionCount = 0; // Set a default value to avoid undefined
          console.log("An error was thrown", err);
        }
      },
    },
  });
  
