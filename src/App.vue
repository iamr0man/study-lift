<template>
  <Suspense>
    <template #default>
      <RouterView v-slot="{ Component }">
        <transition name="scale">
          <component :is="Component" />
        </transition>
      </RouterView>
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
