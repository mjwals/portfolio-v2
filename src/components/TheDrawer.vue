<script setup>
const props = defineProps({
  showDrawer: {
    type: Boolean,
    required: true,
  },
  project: {
    type: [null, Object],
    required: true,
  },
})

const emit = defineEmits(['handleHideDrawer', 'handleShowDialog'])

const handleHideDrawer = () => {
  emit('handleHideDrawer')
}

const handleShowDialog = () => {
  emit('handleShowDialog')
}

const handleOpenLink = (url) => {
  window.open(url, '_blank')
}
</script>

<template>
  <!-- drawer -->
  <div
    class="absolute top-0 right-0 bottom-0 z-30 transition-transform duration-300 flex items-center"
    :class="showDrawer ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- drawer close button -->
    <button
      class="flex justify-center items-center w-[52px] h-[52px] bg-neutral-100 hover:bg-neutral-200 rounded border border-white-400 mr-[10px] cursor-pointer text-white-100"
      @click="handleHideDrawer"
    >
      <font-awesome-icon icon="fa-solid fa-xmark" class="text-[18px]" />
    </button>

    <!-- drawer content -->
    <div
      class="bg-neutral-100 w-[304px] md:w-[320px] h-full border-l border-white-400 p-[10px] flex flex-col justify-between items-center"
    >
      <div class="flex flex-col items-center w-full">
        <!-- preview -->
        <div
          v-if="project?.preview?.path"
          class="rounded"
          :style="{
            backgroundImage: `url(${project.preview.path})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left top',
            width: '100%',
            height: '210px',
          }"
        ></div>

        <!-- details -->
        <h3 class="text-white-100 font-bold text-[22px] capitalize leading-none mt-[26px]">
          {{ project?.title }}
        </h3>

        <p class="text-white-200 leading-none text-[14px] font-semibold mt-[16px]">
          {{ project?.date }}
        </p>

        <!-- tags -->
        <div class="flex items-center gap-[6px] mt-[18px] mb-[24px]">
          <span
            v-for="(technology, index) in project?.technologies"
            :key="index"
            :style="{ zIndex: index++ }"
            class="flex justify-center items-center bg-accent-100 rounded text-white-100 text-[11px] uppercase font-semibold px-[10px] py-[2px]"
          >
            {{ technology }}
          </span>
        </div>

        <p class="text-white-200 text-[14px] text-center max-w-[240px]">{{ project?.desc }}</p>
      </div>

      <!-- cta -->
      <div class="flex flex-col gap-[10px] w-full">
        <button
          v-if="project?.codeUrl?.length"
          class="group flex justify-center items-center w-full h-[52px] rounded-[4px] cursor-pointer bg-neutral-100 hover:bg-neutral-200 border border-white-400 text-white-100 font-semibold text-[14px] uppercase"
          @click="handleOpenLink(`${project?.previewUrl}`)"
        >
          <span class="group-hover:!hidden">demo</span>
          <font-awesome-icon
            icon="fa-solid fa-arrow-up-right-from-square"
            class="!hidden group-hover:!inline-block text-[14px]"
          />
        </button>

        <button
          v-if="project?.previewUrl?.length"
          class="group flex justify-center items-center w-full h-[52px] rounded-[4px] cursor-pointer bg-primary-100 hover:bg-primary-200 border border-primary-100 text-white-100 font-semibold text-[14px] uppercase"
          @click="handleOpenLink(`${project?.codeUrl}`)"
        >
          <span class="group-hover:!hidden">code</span>
          <font-awesome-icon
            icon="fa-solid fa-arrow-up-right-from-square"
            class="!hidden group-hover:!inline-block text-[14px]"
          />
        </button>

        <button
          v-if="project?.category === 'design'"
          class="group flex justify-center items-center w-full h-[52px] rounded-[4px] cursor-pointer bg-primary-100 hover:bg-primary-200 border border-primary-100 text-white-100 font-semibold text-[14px] uppercase"
          @click="handleShowDialog"
        >
          <span class="group-hover:!hidden">view</span>
          <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            class="!hidden group-hover:!inline-block text-[14px]"
          />
        </button>
      </div>
    </div>
  </div>

  <!-- drawer overlay -->
  <div
    class="absolute inset-0 bg-neutral-200/86 z-20 opacity-0 transition-opacity duration-300"
    :class="showDrawer ? 'opacity-100 backdrop-blur-[10px]' : 'opacity-0 pointer-events-none'"
    @click="handleHideDrawer"
  ></div>
</template>
