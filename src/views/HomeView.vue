<template>
  <main class="grid grid-cols-2 gap-y-40 gap-x-40">
    <CourseItem
      v-for="course in courses"
      :key="course.id"
      :course="course"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { axios } from "@/utils/axios";
import type { ICourse } from "@/components/courses/CourseItem.types";
import CourseItem from "@/components/courses/CourseItem.vue";

export default defineComponent({
  components: { CourseItem },
  async setup () {
    const { data } = await axios.get<ICourse.Item[]>('/core/preview-courses')

    return {
      courses: data
    }
  }
 })
</script>

