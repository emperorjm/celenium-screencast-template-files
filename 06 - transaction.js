import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', {
    state: () => ({
      transactionCount: 0,
      loading: false,
      error: null,
    }),
    actions: {
      async fetchTransactionCount() {
        try {
          const response = await axios.get(
            `https://api-mainnet.celenium.io/v1/tx/count`
          );

          if (response.data && response.data.status !== 200) {
            this.transactionCount = response.data;
          } else {
            throw new Error('Invalid response structure');
          }
        } catch (err) {
          this.error = 'Unable to fetch transaction count.';
          this.transactionCount = 0;
        }
      },
    },
  });
  
