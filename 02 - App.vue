<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router';

const router = useRouter();

const isCurrentPage = (path) => {
  return router.currentRoute.value.path === path;
};
</script>

<template>
  
<div class="min-h-full">
  <div class="bg-indigo-600 pb-32">
    <nav class="border-b border-indigo-300/25 bg-indigo-600 lg:border-none">
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div class="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400/25">

          <!-- Adrian: This is the menu -->
          <div class="flex items-center px-2 lg:px-0">
            <div class="shrink-0">
              <img class="block size-8" src="https://cryptologos.cc/logos/celestia-tia-logo.svg?color=indigo&shade=300" alt="Celestia Block Explorer">
            </div>
            <div class="hidden lg:ml-10 lg:block">
              <div class="flex space-x-4">
                <router-link
                  to="/" 
                  :class="{
                    'bg-indigo-700 text-white': isCurrentPage('/'),
                    'hover:bg-indigo-500/75': !isCurrentPage('/')
                  }" 
                  class="rounded-md px-3 py-2 text-sm font-medium text-white">
                    Dashboard
                </router-link>
                <router-link
                  to="/about" 
                  :class="{
                    'bg-indigo-700 text-white': isCurrentPage('/about'),
                    'hover:bg-indigo-500/75': !isCurrentPage('/about')
                  }" 
                  class="rounded-md px-3 py-2 text-sm font-medium text-white">
                    Accounts
                </router-link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  </div>

  <main class="-mt-32">
    <RouterView />
  </main>
</div>

  
</template>

<style scoped>

</style>
