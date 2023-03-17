<template>
  <div class="PageCourse py-12">
    <Container>
      <div class="flex gap-12 mb-8">
        <div class="basis-3/5">
          <img
            class="h-auto w-full rounded-lg"
            :src="course.previewImageLink + '/cover.webp'"
            alt="image description"
          >
          <div class="flex mt-12">
            <SkillItem
              v-for="(skill, skillIndex) in course.meta.skills"
              :name="skill"
              :index="skillIndex"
            />
          </div>
        </div>
        <div class="flex flex-col justify-between py-4 basis-2/5">
          <div>
            <div class="flex gap-x-4">
              <h1
                class="text-5xl mb-4 font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
                {{ course.title }}</h1>
            </div>
            <p
              class="text-lg font-light text-gray-500 md:text-xl dark:text-gray-400"
            >
              {{ course.description }}
            </p>
          </div>
          <div class="flex items-center gap-x-6">
            <Rating :rating="course.rating" size="large" color="text-yellow-300"/>
          </div>
        </div>
      </div>
      <!---->
      <div class="p-8 rounded-2xl">
        <h2 class="text-3xl font-extrabold dark:text-white mb-4">Lessons:</h2>
        <div class="grid grid-cols-3 gap-8">
          <div v-for="lesson in courseLessons" :key="lesson.id" class="relative cursor-pointer group overflow-hidden rounded-lg">
            <VImage
              class="group-hover:opacity-10"
              :src="`${lesson.previewImageLink}/lesson-${lesson.order}.webp`"
              alt="lesson"
            />
            <div
              class="absolute inset-0 group-hover:bg-blue-900/40 transition transition-all ease-in-out duration-300"></div>
            <p
              class="absolute z-10 -top-10 left-4 font-bold text-gray-500 dark:text-gray-100 group-hover:top-4 transition-all ease-in-out duration-300">
              {{ lesson.title }}
            </p>
            <p class="opacity-0 absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-8xl text-gray-500 dark:text-gray-100 group-hover:opacity-100 transition-all ease-in-out duration-500">
              {{ lesson.order }}
            </p>
            <p
              class="absolute z-10 -bottom-10 left-4 font-light text-gray-500 dark:text-gray-400 group-hover:bottom-4 transition-all ease-in-out duration-300">
              {{ lesson.duration }}
            </p>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { getCourses, getCourseById } from '@/database/courses.gateway';
import Container from '@/components/ui/Container.vue';
import Rating from '@/components/ui/Rating.vue';
import VImage from '@/components/ui/VImage.vue';
import SkillItem from "@/components/courses/SkillItem.vue";

export default defineComponent({
  components: {SkillItem, VImage, Rating, Container },
  async setup() {
    const route = useRoute();
    const courses = await getCourses();
    const courseBySlug = courses.find((course: any) => course.meta.slug === route.params.slug);
    const course = await getCourseById(courseBySlug.id);

    return {
      course: courseBySlug,
      courseLessons: course.lessons,
    };
  }
});
</script>

<style scoped>

</style>
