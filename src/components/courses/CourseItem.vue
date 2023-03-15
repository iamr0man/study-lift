<template>
  <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <img class="rounded-t-lg" :src="previewImageLink" :alt="course.title" />
    </a>
    <div class="p-5">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ course.title }}
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ course.description }}
      </p>
      <div class="flex justify-between">
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ course.lessonsCount }} lessons
        </p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ course.tags.join(', ') }}
        </p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ course.rating }}
        </p>
      </div>
      <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <IconArrow />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import IconArrow from "../icons/IconArrow.vue";
import type { ICourse } from "@/components/courses/CourseItem.types";

export default defineComponent({
  name: "CourseItem",
  components: {IconArrow},
  props: {
    course: {
      type: Object as PropType<ICourse.Item>,
      required: true
    }
  },
  computed: {
    previewImageLink () {
      return this.course.previewImageLink + '/cover.webp'
    }
  }
})
</script>
