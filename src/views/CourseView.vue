<template>
  <Container>
    <div class="flex gap-12 mb-8 tablet:flex-col">
      <div class="basis-3/5">
        <img
          class="h-auto w-full rounded-lg"
          :src="course.previewImageLink + '/cover.webp'"
          alt="image description"
        >
        <div class="flex mt-12 gap-x-2 gap-y-2 mobile:flex-wrap">
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
              class="text-5xl mb-4 font-extrabold leading-none tracking-tight text-gray-900 mobile:text-4xl dark:text-white">
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
    <Lesson :course="course" />
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { getCourseById } from '@/database/courses.gateway';
import Container from '@/components/ui/Container.vue';
import Rating from '@/components/ui/Rating.vue';
import SkillItem from "@/components/lesson/SkillItem.vue";
import Lesson from "@/components/lesson/Lesson.vue";

export default defineComponent({
  components: {
    Lesson,
    SkillItem,
    Rating,
    Container
  },
  async setup() {
    const route = useRoute();

    const course = await getCourseById(route.params.id as string);

    return {
      course,
    };
  },
});
</script>
