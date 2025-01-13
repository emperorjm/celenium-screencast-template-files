import { defineStore } from 'pinia';
import axios from 'axios';

export const useAddressStore = defineStore('address', {
    state: () => ({
      addressCount: 0,
      loading: false,
      error: null,
    }),
    actions: {
      async fetchAddressCount() {
        try {
          const response = await axios.get(
            `https://api-mainnet.celenium.io/v1/address/count`
          );
          
          if (response.data && response.data.status !== 200) {
            this.addressCount = response.data;
          } else {
            throw new Error('Invalid response structure');
          }
        } catch (err) {
          this.error = 'Unable to fetch address count.';
          this.addressCount = 0;
        }
      },
    },
  });
  
