<template>
  <Container>
    <div class="grid grid-cols-3 gap-y-12 gap-x-12">
      <CourseItem
        v-for="course in paginatedCourses"
        :key="course.id"
        :course="course"
      />
      <button
        v-if="!loadDisabled"
        type="button"
        class="col-start-2 col-span-1 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="incrementPage"
      >
        Load more
      </button>
    </div>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CourseItem from "@/components/courses/CourseItem.vue";
import { getCourses } from "@/database/courses.gateway";
import Container from "@/components/ui/Container.vue";

const MAX_ITEM_PER_LOAD = 6

export default defineComponent({
  components: {Container, CourseItem },
  async setup () {
    const courses = await getCourses()

    return {
      courses
    }
  },
  data: () => ({
    page: 1
  }),
  computed: {
    paginatedCourses () {
      return this.courses.slice(0, this.page * MAX_ITEM_PER_LOAD)
    },
    loadDisabled () {
      return this.paginatedCourses.length === this.courses.length
    }
  },
  methods: {
    incrementPage () {
      this.page += 1
    }
  }
 })
</script>

