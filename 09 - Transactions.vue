<template>
  <div class="flex-1 truncate">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="transactions.length">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold text-gray-900">Transactions</h1>
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
                  <!--<th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>-->
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Signer</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="transaction in transactions" :key="transaction.id">
                  <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ transaction.id }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 truncat">{{ transaction.hash }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{{ transaction.height }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.status }}</td>
                  <!--<td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.time }}</td>-->
                  <td class="whitespace-nowrap px-2 py-2 text-sm">
                    <router-link
                      :to="{ path: `account/${transaction.signers[0]}` }"
                      class="text-indigo-500"
                    >{{ transaction.signers[0] }}</router-link>
                  </td> <!-- For demo purposes we'll only use the first address -->
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
      <button @click="nextPage" :disabled="offset + limit >= transactionCount" type="button" class="disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTransactionStore } from '../stores/transaction';
import { computed, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';

const transactionStore = useTransactionStore();
const limit = 10;
const offset = computed(() => transactionStore.offset);
const transactions = computed(() => transactionStore.transactions);
const transactionCount = computed(() => transactionStore.transactionCount);
const loading = computed(() => transactionStore.loading);
const error = computed(() => transactionStore.error);
const selectedTransaction = computed(() => transactionStore.selectedTransaction);

onMounted(() => {
  fetchData();
});

watch(() => transactionCount.value, (newVal) => {
  console.log('Transaction Count Updated:', newVal);
});

const fetchData = async () => {
  await transactionStore.fetchTransactionCount(); // Fetch count first
  transactionStore.fetchTransactions(limit, offset.value); // Then fetch transactions
};

const prevPage = () => {
  if (offset.value >= limit) {
    transactionStore.fetchTransactions(limit, offset.value - limit);
    transactionStore.offset = offset.value - limit; // Update the offset
  }
};

const nextPage = () => {
  if (offset.value + limit < transactionStore.transactionCount) {
    transactionStore.fetchTransactions(limit, offset.value + limit);
    transactionStore.offset = offset.value + limit; // Update the offset
  } else {
    console.log("This is not suppose to be triggered");
  }
};

const selectTransaction = (id) => {
  transactionStore.selectedTransaction = id;
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
