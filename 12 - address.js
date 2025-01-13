import { defineStore } from 'pinia';
import axios from 'axios';

export const useAddressStore = defineStore('address', {
    state: () => ({
      addressData: null,
      addresses: [],
      addressCount: 0,
      transactions: [],
      delegations: [],
      transactionCount: 0,
      offset: 0,
      loading: false,
      error: null,
    }),
    actions: {
      async fetchAddressData(hash) {
        this.error = null;
        this.loading = true;
        this.addressData = null;
  
        try {
          const response = await axios.get(
            `https://api-mainnet.celenium.io/v1/address/${hash}`
          );
          this.addressData = response.data;
          console.log("Address Data response: ", this.addressData.balance);
        } catch (err) {
          this.error = 'Unable to fetch address data. Please check the Address hash.';
        } finally {
          this.loading = false;
        }
      },
      async fetchAddresses(limit = 10, offset = 0) {
        this.error = null;
        this.loading = true;
      
        try {
          const response = await axios.get(
            `https://api-mainnet.celenium.io/v1/address?limit=${limit}&offset=${offset}&sort=desc&sort_by=delegated`
          );
          console.log("Address response: ", response)
          this.addresses = response.data;
          this.offset = offset;
        } catch (err) {
          console.log("Address error: ", err)
          this.error = 'Unable to fetch addresses.';
        } finally {
          this.loading = false;
        }
      },
      async fetchAddressTransactions(limit = 10, offset = 0, address) {
        this.error = null;
        this.loading = true;

        console.log("Address:", address);
      
        try {
          const response = await axios.get(
            `https://api-mainnet.celenium.io/v1/address/${address}/txs?limit=${limit}&offset=${offset}&sort=desc`
          );
          console.log("Address transaction response: ", response)
          this.transactions = response.data;
          this.offset = offset;
        } catch (err) {
          this.error = 'Unable to fetch address transactions.';
        } finally {
          this.loading = false;
        }
      },
      async fetchAddressDelegations(limit = 10, offset = 0, address) {
        this.error = null;
        this.loading = true;
      
        try {
          const response = await axios.get(
            `https://api-mainnet.celenium.io/v1/address/${address}/delegations?limit=${limit}&offset=${offset}&show_zero=false`
          );
          
          this.delegations = response.data;
          console.log("Delegatons: ", this.delegations);
          this.offset = offset;
        } catch (err) {
          this.error = 'Unable to fetch address delegations.';
        } finally {
          this.loading = false;
        }
      },
      async fetchAddressCount() {
        try {
          const response = await axios.get(
            `https://api-mainnet.celenium.io/v1/address/count`
          );
          console.log("This is the response", response.data);
          if (response.data && response.data.status !== 200) {
            console.log("This is the count", response);
            this.addressCount = response.data;
          } else {
            console.log("This is the count", response);
            throw new Error('Invalid response structure');
          }
        } catch (err) {
          this.error = 'Unable to fetch address count.';
          this.addressCount = 0; // Set a default value to avoid undefined
          console.log("An error was thrown", err);
        }
      },
    },
  });
  
