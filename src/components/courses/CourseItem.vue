<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <video
      v-if="course.meta.courseVideoPreview"
      ref="video"
      class="video-js"
      @mouseover="playVideo"
      width="600"
      height="130"
      muted
      :poster="previewImageLink"
    />
<!--      @mouseleave="stopVideo"-->
<!--      :src="course.meta.courseVideoPreview.link"-->

    <img
      v-else
      class="rounded-t-lg"
      :src="previewImageLink"
      :alt="course.title"
    />

    <div class="flex flex-col items-start justify-between p-5">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ course.title }}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ course.description }}
        </p>
        <div class="flex justify-between">
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ course.lessonsCount }} lessons
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ course.rating }} stars
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ course.tags.join(', ') }}
          </p>
        </div>
      </a>
      <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <IconArrow />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue";
import IconArrow from "../icons/IconArrow.vue";
import type { ICourse } from "@/components/courses/CourseItem.types";
import Hls from "hls.js";

export default defineComponent({
  name: "CourseItem",
  components: {IconArrow},
  props: {
    course: {
      type: Object as PropType<ICourse.Item>,
      required: true
    }
  },
  setup(props) {
    const video = ref<HTMLVideoElement | null>(null);
    const videoElement = ref(null);
    const paused = ref(null);
    const playVideo = () => {
      if (!video.value) {
        return
      }

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource('https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8');
        hls.attachMedia(video.value);
        const playPromise = video.value.play();

        if (playPromise !== undefined) {
          playPromise.then(_ => {
            video.value && video.value.pause();
          })
          .catch(error => {});
        }
      } else if (video.value.canPlayType('application/vnd.apple.mpegurl')) {
        video.value.src = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';
        video.value.addEventListener('loadedmetadata', () => {
          video.value && video.value.play();
        });
      }
    };
    const stopVideo = () => {
      if (!video.value) {
        return
      }
      video.value.pause();
      video.value.currentTime = 0;
    };

    return {
      video,
      videoElement,
      paused,
      playVideo,
      stopVideo,
    };
  },
  computed: {
    previewImageLink () {
      return this.course.previewImageLink + '/cover.webp'
    }
  },
})
</script>

<style>
.preview {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.preview img {
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}

.preview .play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
}

.preview:hover {
  opacity: 1;
}

</style>