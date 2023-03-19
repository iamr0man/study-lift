<template>
  <div>
    <NotFound v-if="error" />
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
  </div>
</template>

<script lang="ts">
import { RouterView } from "vue-router";
import { defineComponent } from "vue";
import NotFound from "@/components/error/NotFound.vue";

export default defineComponent({
  components: {
    RouterView,
    NotFound
  },
  data: () => ({
    error: false
  }),
  errorCaptured () {
    this.error = true
  },
})
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
