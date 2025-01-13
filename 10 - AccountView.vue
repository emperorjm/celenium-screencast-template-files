<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const hash = route.params.hash;
console.log("Hash: ", hash);
</script>

<template>
  <header class="py-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-white">Address: {{ hash }}</h1>
    </div>
  </header>

  <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
    <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
      <!-- Add address info here -->
    </div>
  </div>

  <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
      <div class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div class="flex w-full items-center justify-between space-x-6 p-6">
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <!-- Add address transactions here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.error {
  color: red;
}
.loading {
  color: blue;
}
</style>