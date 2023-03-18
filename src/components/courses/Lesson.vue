<template>
  <div class="PageLesson min-h-screen">
    <div class="relative flex flex-col flex-1 h-full">
      <div class="flex py-12 gap-x-8">
        <div class="basis-8/12 bg-blue-1100">
          <div class="relative block min-h-[490px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <video
              id="selected-video"
              class="w-full max-w-full p-4"
              :poster="posterPreviewLink"
              playsinline
              controls
              :tabindex="tabbingIndex"
            />
            <div v-if="!unlocked" class="flex flex-col absolute bg-black top-0 left-0 w-full h-full flex items-center justify-center rounded-lg z-1">
              <svg width="72" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
              </svg>
              <p class="text-lg font-bold">No access</p>
            </div>
            <div v-if="notFound" class="flex flex-col absolute bg-black top-0 left-0 w-full h-full flex items-center justify-center rounded-lg z-1">
              <svg width="72" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"></path>
              </svg>
              <p class="text-lg font-bold">Not found</p>
            </div>
          </div>
        </div>
        <ul class="max-h-[490px] text-scroll overflow-y-scroll basis-4/12 p-4 block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <LessonItem
            v-for="lesson in lessons"
            :key="lesson.order"
            :lesson="lesson"
            :selected="lesson.order === lessonNumber"
            @click="lessonNumber = lesson.order"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue';
import Container from '@/components/ui/Container.vue';
import type { ICourse } from "@/types/ICourse.types";
import LessonItem from "@/components/courses/LessonItem.vue";
import Hls from 'hls.js'

const DURATION_TIME_KEY = '--duration-time'

export default defineComponent({
  components: {LessonItem, Container },
  props: {
    course: {
      type: Object as PropType<ICourse.Item>,
      required: true
    }
  },
  data: () => ({
    hls: new Hls(),
    lessonNumber: 1,
    notFound: false
  }),
  computed: {
    lessons () {
      return this.course.lessons.sort((a, b) => a.order - b.order)
    },
    currentLesson () {
      return this.lessons[Number(this.lessonNumber) - 1];
    },
    posterPreviewLink () {
      return `${this.currentLesson.previewImageLink}/lesson-${this.currentLesson.order}.webp`
    },
    unlocked () {
      return this.currentLesson.status === 'unlocked'
    },
    courseLessonKey () {
      return `${this.course.id}-selected-lesson`
    },
    tabbingIndex () {
      return !this.unlocked || this.notFound ? -1 : 0
    },
  },
  watch: {
    currentLesson () {
      this.loadHlsPlayer()
    },
    lessonNumber (newValue: number) {
      this.setSelectedLocal(newValue)
    }
  },
  mounted () {
    this.initSelectedLesson()
    this.loadHlsPlayer()
  },
  beforeUnmount() {
    if (this.hls) {
      this.hls.destroy()
    }
  },
  methods: {
    initSelectedLesson () {
      this.lessonNumber = Number(window.localStorage.getItem(this.courseLessonKey)) || 1
    },
    setSelectedLocal (order: number) {
      window.localStorage.setItem(this.courseLessonKey, order.toString());
    },
    checkCurrentTime(): number {
      const lastSecond = localStorage.getItem(this.currentLesson.id + DURATION_TIME_KEY);
      if (lastSecond) {
        return Number(lastSecond);
      }

      return 0;
    },
    loadHlsPlayer () {
      const video = document.querySelector('#selected-video') as HTMLMediaElement | null;
      if (!video) {
        return
      }

      video.addEventListener('timeupdate', () => {
        let currentTime = JSON.stringify(video.currentTime)
        if (!Number(currentTime)) {
          return
        }
        localStorage.setItem(this.currentLesson.id + DURATION_TIME_KEY, currentTime);
      });

      if (!this.unlocked || this.notFound) {
        this.hls.destroy()
        this.hls = new Hls()
        return
      }

      try {
        if (Hls.isSupported()) {
          this.hls.loadSource(this.currentLesson.link);
          this.hls.attachMedia(video);
          this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.currentTime = this.checkCurrentTime();
          });
          return;
        }
      } catch (err) {
        this.notFound = true
      }
    }
  }
})
</script>
