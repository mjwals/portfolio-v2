<script setup>
import { CATEGORIES } from '@/common/constants'

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['emitCategory'])

const handleCategory = (value) => {
  emit('emitCategory', value)
}
</script>

<template>
  <div class="border border-white-400 rounded-full inline-flex p-[10px] mt-[40px]">
    <button
      class="rounded-full w-[100px] h-[30px] text-[14px] text-white-100 uppercase hover:underline cursor-pointer"
      :class="{
        'bg-primary-100 text-white-100 font-bold hover:no-underline! hover:cursor-default!':
          category === CATEGORIES.code,
      }"
      @click="handleCategory(CATEGORIES.code)"
    >
      Code
    </button>
    <button
      class="rounded-full w-[100px] h-[30px] text-[14px] text-white-100 uppercase hover:underline cursor-pointer"
      :class="{
        'bg-primary-100 text-white-100 font-bold hover:no-underline! hover:cursor-default!':
          category === CATEGORIES.design,
      }"
      @click="handleCategory(CATEGORIES.design)"
    >
      Design
    </button>
  </div>
</template>
