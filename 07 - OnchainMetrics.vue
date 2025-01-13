<template>
<div>
  <h3 class="text-base font-semibold text-gray-900">Onchain Metrics</h3>

  <dl class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden bg-white  md:grid-cols-3 md:divide-x md:divide-y-0">
    <div class="px-4 py-5 sm:p-6">
      <dt class="text-base font-normal text-gray-900">Current Block Height</dt>
      <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
          {{ blockCount }}
        </div>
      </dd>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <dt class="text-base font-normal text-gray-900">Transactions</dt>
      <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
          {{ transactionCount }}
        </div>
      </dd>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <dt class="text-base font-normal text-gray-900">Total Addresses</dt>
      <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
          {{ addressCount }}
        </div>
      </dd>
    </div>
  </dl>
</div>
</template>

<script setup>
import { useTransactionStore } from '../stores/transaction';
import { useBlockStore } from '../stores/block';
import { useAddressStore } from '../stores/address';
import { computed, onMounted, onUnmounted, watch } from 'vue';

const blockStore = useBlockStore();
const blockCount = computed(() => blockStore.blockCount.toLocaleString());

const transactionStore = useTransactionStore();
const transactionCount = computed(() => transactionStore.transactionCount.toLocaleString());

const addressStore = useAddressStore();
const addressCount = computed(() => addressStore.addressCount.toLocaleString());

let intervalId;

onMounted(() => {
  fetchData();
  
  // Adrian: Fetch updated values every 10 seconds
  /**intervalId = setInterval(() => {
    fetchData();
  }, 10000);**/
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

const fetchData = async () => {
  await blockStore.fetchBlockCount();
  await transactionStore.fetchTransactionCount();
  await addressStore.fetchAddressCount();
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
