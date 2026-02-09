<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  project: {
    type: [null, Object],
    required: true,
  },
  showDialog: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['handleHideDialog'])

const handleHideDialog = () => {
  emit('handleHideDialog')
}

// dialog open functionality
const dialogScrollArea = ref(null)

watch(
  () => props.showDialog,
  async (val) => {
    if (val) {
      await nextTick()

      // when the dialog opens reset the scroll to the top
      dialogScrollArea?.value.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <div
      class="bg-neutral-100 absolute inset-0 z-40 opacity-0 transition-opacity duration-300"
      :class="showDialog ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
      <!-- dialog close button -->
      <button
        class="fixed top-[20px] right-[20px] flex justify-center items-center w-[52px] h-[52px] bg-neutral-100 hover:bg-neutral-200 rounded border border-white-400 cursor-pointer text-white-100"
        @click="handleHideDialog"
      >
        <font-awesome-icon icon="fa-solid fa-xmark" class="text-[18px]" />
      </button>

      <div ref="dialogScrollArea" class="flex flex-col h-full overflow-y-auto">
        <div class="grow flex justify-center items-center px-[10px] py-[80px]">
          <img :src="project?.fullSize?.path" :alt="project?.fullSize?.alt" class="rounded" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
