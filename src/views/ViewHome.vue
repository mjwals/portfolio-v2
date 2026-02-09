<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { NAV_LINKS, CATEGORIES } from '@/common/constants'
import TheFilter from '@/components/TheFilter.vue'
import TheDrawer from '@/components/TheDrawer.vue'
import TheDialog from '@/components/TheDialog.vue'
import BaseCard from '@/components/BaseCard.vue'

const projects = ref([])
const project = ref(null)

const getData = async () => {
  try {
    const res = await fetch('/data/data.json')

    if (!res.ok) throw new Error(`Failed to fetch JSON: ${res.status}`)

    const data = await res.json()

    // add dynamic values here
    return data.map((i) => ({
      ...i,
      id: uuidv4(),
    }))
  } catch (error) {
    console.log(`Error loading project data ${error.message}`)
    return []
  }
}

const category = ref(CATEGORIES.code)
const mainContainerRef = ref(null)

const setCategory = (value) => {
  category.value = value
  mainContainerRef.value.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const getProjectsByCategory = computed(() => {
  return projects.value
    .filter((item) => item.category === category.value)
    .sort((a, b) => b.date - a.date)
})

const getProjectById = (projectId) => {
  project.value = projects.value.find((item) => item.id === projectId)
}

// back to top functionality
const showBackToTop = ref(false)
const pixelAmount = ref(100)

const handleBackToTop = () => {
  // handle behaviour
  mainContainerRef.value.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const handleShowBackToTop = () => {
  // handle visibility
  if (!mainContainerRef.value) return
  showBackToTop.value = mainContainerRef.value.scrollTop > pixelAmount.value
}

// drawer functionality
const showDrawer = ref(false)

const handleShowDrawer = (projectId) => {
  showDrawer.value = true
  getProjectById(projectId)
}

const handleHideDrawer = () => {
  showDrawer.value = false
}

// dialog functionality
const showDialog = ref(false)

const handleShowDialog = () => {
  showDialog.value = true
}

const handleHideDialog = () => {
  showDialog.value = false
}

onMounted(async () => {
  projects.value = await getData()
  mainContainerRef.value?.addEventListener('scroll', handleShowBackToTop)
})

onUnmounted(() => {
  mainContainerRef.value?.removeEventListener('scroll', handleShowBackToTop)
})
</script>

<template>
  <div class="flex w-full h-full">
    <div
      class="w-full h-full md:h-[660px] lg:w-[1000px] bg-neutral-100 flex overflow-hidden m-auto relative"
    >
      <!-- nav desktop -->
      <nav
        class="hidden md:flex md:flex-col md:justify-between w-[61px] bg-neutral-200 border-r border-white-400"
      >
        <div class="flex justify-center items-center text-[24px] mt-[19px]">
          <span class="font-sarina text-white-100 leading-none">M</span>
        </div>

        <div class="flex flex-col items-center gap-[12px] mb-[20px]">
          <a
            :href="NAV_LINKS.email"
            class="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-neutral-100 hover:bg-neutral-200 border border-white-400 text-white-100"
          >
            <font-awesome-icon icon="fa-solid fa-envelope" class="text-[18px]" />
          </a>
          <a
            :href="NAV_LINKS.linkedIn"
            target="_blank"
            class="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-neutral-100 hover:bg-neutral-200 border border-white-400 text-white-100"
          >
            <font-awesome-icon icon="fa-brands fa-linkedin" class="text-[18px]" />
          </a>
          <a
            :href="NAV_LINKS.gitHub"
            target="_blank"
            class="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-neutral-100 hover:bg-neutral-200 border border-white-400 text-white-100"
          >
            <font-awesome-icon icon="fa-brands fa-square-github" class="text-[18px]" />
          </a>
        </div>
      </nav>

      <!-- drawer container -->
      <TheDrawer
        :project="project"
        :showDrawer="showDrawer"
        @handleHideDrawer="handleHideDrawer"
        @handleShowDialog="handleShowDialog"
      />

      <!-- main content -->
      <div
        ref="mainContainerRef"
        class="grow flex flex-col md:flex-row bg-neutral-200 overflow-y-scroll scrollbar-stable"
        :class="showDrawer ? '!overflow-hidden' : ''"
      >
        <!-- nav mobile -->
        <nav
          class="sticky top-0 z-10 flex justify-between items-center shrink-0 h-[60px] px-[20px] bg-neutral-200 border-b border-white-400 md:hidden"
        >
          <div class="flex justify-center items-center text-[24px]">
            <span class="font-sarina text-white-100 leading-none">M</span>
          </div>

          <div class="flex items-center gap-[12px]">
            <a
              :href="NAV_LINKS.email"
              class="flex justify-center items-center w-[40px] h-[40px] rounded-full border border-white-400 text-white-200 hover:text-white-100"
            >
              <font-awesome-icon icon="fa-solid fa-envelope" class="text-[18px]" />
            </a>
            <a
              :href="NAV_LINKS.linkedIn"
              target="_blank"
              class="flex justify-center items-center w-[40px] h-[40px] rounded-full border border-white-400 text-white-200 hover:text-white-100"
            >
              <font-awesome-icon icon="fa-brands fa-linkedin" class="text-[18px]" />
            </a>
            <a
              :href="NAV_LINKS.gitHub"
              target="_blank"
              class="flex justify-center items-center w-[40px] h-[40px] rounded-full border border-white-400 text-white-200 hover:text-white-100"
            >
              <font-awesome-icon icon="fa-brands fa-square-github" class="text-[18px]" />
            </a>
          </div>
        </nav>

        <!-- filter -->
        <div
          class="text-center mt-[80px] md:text-left md:fixed md:top-[50%] md:-mt-[78px] md:ml-[60px] lg:ml-[80px]"
        >
          <h1 class="text-[64px] text-white-100 leading-none font-bold">Work.</h1>
          <TheFilter :category="category" @emitCategory="setCategory" />
        </div>

        <!-- projects -->
        <div class="grow flex justify-center md:justify-end">
          <div class="min-h-full">
            <!-- projects -->
            <section
              class="flex flex-col gap-[40px] w-[280px] mt-[61px] md:mt-[61px] md:mr-[61px] lg:mt-[81px] lg:mr-[81px] pb-[61px] md:pb-[61px] lg:pb-[81px]"
            >
              <!-- project card -->
              <template v-for="item in getProjectsByCategory" :key="item.id">
                <BaseCard :project="item" @handleShowDrawer="handleShowDrawer" />
              </template>
            </section>
          </div>
        </div>
      </div>

      <!-- back to top -->
      <button
        v-show="showBackToTop"
        class="absolute bottom-[20px] right-[20px] md:right-[27px] z-10 w-[52px] h-[52px] rounded-full bg-accent-100 hover:bg-accent-200 text-white-100 border border-neutral-200 cursor-pointer flex justify-center items-center"
        @click="handleBackToTop"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-up" class="text-[18px]" />
      </button>
    </div>
  </div>

  <!-- dialog -->
  <TheDialog :project="project" :showDialog="showDialog" @handleHideDialog="handleHideDialog" />
</template>
