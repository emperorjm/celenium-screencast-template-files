<template>
  <div>
  <h3 class="text-base font-semibold text-gray-900">Token Balance</h3>

  <dl v-if="addressData" class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden bg-white  md:grid-cols-3 md:divide-x md:divide-y-0">
    <div class="px-4 py-5 sm:p-6">
      <dt class="text-base font-normal text-gray-900">{{ addressData.balance.currency }}</dt>
      <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
          {{ addressData.balance.spendable }}
        </div>
      </dd>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <dt class="text-base font-normal text-gray-900">Delegated</dt>
      <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
          {{ addressData.balance.delegated }}
        </div>
      </dd>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <dt class="text-base font-normal text-gray-900">Unbonding</dt>
      <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
          {{ addressData.balance.unbonding }}
        </div>
      </dd>
    </div>
  </dl>
</div>
</template>

<script setup>
import { useAddressStore } from '../stores/address';
import { computed, onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const addressStore = useAddressStore();
const limit = 10;
const offset = computed(() => addressStore.offset);
const loading = computed(() => addressStore.loading);
const error = computed(() => addressStore.error);
const addressData = computed(() => addressStore.addressData);

const formattedSpendable = computed(() => (addressData.balance.spendable / 10 ** 6).toFixed(2));

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
  addressStore.fetchAddressData(props.address);
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
