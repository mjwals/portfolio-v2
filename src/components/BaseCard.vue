<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['handleShowDrawer'])

const handleShowDrawer = (projectId) => {
  emit('handleShowDrawer', projectId)
}
</script>

<template>
  <div
    class="flex flex-col justify-between items-center h-[440px] outline outline-white-400 rounded-[4px] p-[10px]"
  >
    <div>
      <!-- thumbnail -->
      <img
        v-if="project?.thumbnail?.path"
        :src="project.thumbnail.path"
        :alt="project.thumbnail.alt"
      />

      <!-- title -->
      <h3
        class="text-white-100 font-bold text-[22px] text-center capitalize leading-none mt-[26px] mb-[18px]"
      >
        {{ project?.title }}
      </h3>

      <!-- tags -->
      <div class="flex justify-center items-center gap-[6px]">
        <span
          v-for="(technology, index) in project?.technologies"
          :key="index"
          :style="{ zIndex: index++ }"
          class="flex justify-center items-center bg-accent-100 rounded text-white-100 text-[11px] uppercase font-semibold px-[10px] py-[2px]"
        >
          {{ technology }}
        </span>
      </div>
    </div>

    <!-- cta -->
    <button
      class="flex justify-center items-center w-full h-[52px] rounded-[4px] cursor-pointer bg-primary-100 hover:bg-primary-200 text-white-100 font-bold text-[14px] uppercase"
      @click="handleShowDrawer(project?.id)"
    >
      details
    </button>
  </div>
</template>
