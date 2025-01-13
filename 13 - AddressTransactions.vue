<template>
  <div class="flex-1 truncate">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="transactions.length">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold text-gray-900">Latest Transactions</h1>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">ID</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Hash</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Height</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="transaction in transactions" :key="transaction.id">
                  <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ transaction.id }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 truncat">{{ transaction.hash }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{{ transaction.height }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.status }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="prevPage" :disabled="offset === 0" type="button" class="disabled:bg-gray-400 disabled:cursor-not-allowed mr-5 mt-10 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Previous
      </button>
      <button @click="nextPage" type="button" class="disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAddressStore } from '../stores/address';
import { computed, onMounted, watch, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const addressStore = useAddressStore();
const limit = 10;
const offset = computed(() => addressStore.offset);
const transactions = computed(() => addressStore.transactions);
const loading = computed(() => addressStore.loading);
const error = computed(() => addressStore.error);

const route = useRoute();
const hash = route.params.hash;

const props = defineProps({
  address: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  await addressStore.fetchAddressTransactions(limit, offset.value, hash); // Then fetch transactions
};

const prevPage = async () => {
  if (offset.value >= limit) {
    await addressStore.fetchAddressTransactions(limit, offset.value - limit, hash);
    addressStore.offset = offset.value - limit; // Update the offset
  }
};

const nextPage = async () => {
  await addressStore.fetchAddressTransactions(limit, offset.value + limit, hash);
  addressStore.offset = offset.value + limit;
};
</script>

<style>
.error {
  color: red;
}
.loading {
  color: blue;
}
</style>
