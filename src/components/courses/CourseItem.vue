<template>
  <RouterLink
    :to="course.meta.slug"
    class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <video
      ref="video"
      :class="videoClasses"
      :id="course.meta.slug"
      type="application/x-mpegURL"
      class="absolute min-w-[373px] max-h-[165px]"
      muted
      @mouseleave="stopVideo"
    />
    <img
      :class="imagePreviewClasses"
      :src="previewImageLink"
      :alt="course.title"
      class="rounded-t-lg h-[165px] object-contain mx-auto"
      @mouseenter="playVideo"
    />

    <div class="flex flex-col items-start justify-between p-5">
      <div>
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
          <p class="flex mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ course.rating }}
            <svg width="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
            </svg>
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ course.tags.join(', ') }}
          </p>
        </div>
      </div>
      <button class="flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <IconArrow />
      </button>
    </div>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue";
import IconArrow from "../icons/IconArrow.vue";
import type { ICourse } from "@/components/courses/CourseItem.types";
import videojs from "video.js";
import Rating from "@/components/ui/Rating.vue";

export default defineComponent({
  name: "CourseItem",
  components: {Rating, IconArrow},
  props: {
    course: {
      type: Object as PropType<ICourse.Item>,
      required: true
    }
  },
  async setup(props) {
    const video = ref<HTMLVideoElement | null>(null);
    const videoElement = ref(null);
    const paused = ref(true);

    const playVideo = () => {
      const isAvailable = props.course.meta.courseVideoPreview.duration > 0
      if (!isAvailable) {
        return
      }

      paused.value = false

      const player = videojs(props.course.meta.slug, {
        controls: false,
        autoplay: false,
        preload: 'auto'
      });

      const linkOriginal = props.course.meta.courseVideoPreview.link

      player.src({
        src: linkOriginal,
        type: 'application/x-mpegURL'
      });

      const playPromise = player.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {}).catch(() => {});
      }
    };
    const stopVideo = () => {
      const player = videojs(props.course.meta.slug);
      if (!player) {
        return
      }

      player.pause();
      paused.value = true;
      player.currentTime(0)
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
    },
    videoClasses () {
      return { 'z-10': !this.paused }
    },
    imagePreviewClasses () {
      return { 'opacity-0': !this.paused }
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

.vjs-control-bar,
.vjs-modal-dialog,
.vjs-loading-spinner,
.vjs-big-play-button {
  display: none !important;
}

</style>