import { defineStore } from 'pinia';
import axios from 'axios';

export const useBlockStore = defineStore('block', {
    state: () => ({
      blockCount: 0,
      loading: false,
      error: null,
    }),
    actions: {
      async fetchBlockCount() {
        try {
          const response = await axios.get(
            `https://api-mainnet.celenium.io/v1/block/count`
          );
          
          if (response.data && response.data.status !== 200) {
            this.blockCount = response.data;
          } else {
            throw new Error('Invalid response structure');
          }
        } catch (err) {
          this.error = 'Unable to fetch block count.';
          this.blockCount = 0;
        }
      },
    },
  });
  
