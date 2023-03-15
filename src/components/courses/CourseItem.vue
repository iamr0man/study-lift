<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <video
      ref="video"
      :class="{ 'z-10': !paused }"
      :src="course.meta.courseVideoPreview.link"
      :id="course.meta.slug"
      type="application/x-mpegURL"
      class="absolute min-w-[373px] max-h-[165px]"
      muted
      @mouseleave="stopVideo"
    />
    <img
      :class="{ 'opacity-0': !paused }"
      :src="previewImageLink"
      :alt="course.title"
      class="rounded-t-lg"
      @mouseenter="playVideo"
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
import videojs from "video.js";
import axios from "axios";

export default defineComponent({
  name: "CourseItem",
  components: {IconArrow},
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

    const videoStream = await axios.get(props.course.meta.courseVideoPreview.link)
    const actualLink = videoStream.data.split('\n').filter((row: string) => row.startsWith('preview'))[0]

    const playVideo = () => {
      paused.value = false

      const player = videojs(props.course.meta.slug, {
        controls: false,
        autoplay: false,
        preload: 'auto'
      });

      const linkOriginal = props.course.meta.courseVideoPreview.link.split('/preview.')[0]
      const src = linkOriginal + '/' + actualLink

      player.src({
        src,
        type: 'application/x-mpegURL'
      });

      const playPromise = player.play();

      if (playPromise !== undefined) {
        playPromise.then(function() {}).catch(function(error) {});
      }
    };
    const stopVideo = () => {
      const player = videojs(props.course.meta.slug);
      if (!player) {
        return
      }

      player.dimensions('0', '0')

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