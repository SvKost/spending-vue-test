<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitles = {
  tables: 'Таблиця',
  graphics: 'Графік',
}

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/')
  const crumbs = []

  let link = ''

  pathArray.forEach((path, index) => {
    if (path) {
      link += `/${path}`
      const pageTitle =
        pageTitles[path] || path.charAt(0).toUpperCase() + path.slice(1)
      crumbs.push({
        text: pageTitle,
        link: link,
        isLast: index === pathArray.length - 1,
      })
    }
  })

  if (crumbs.length > 0) {
    crumbs.unshift({
      text: 'Головна',
      link: '/',
      isLast: crumbs.length === 0,
    })
  }

  return crumbs
})
</script>

<template>
  <nav aria-label="Breadcrumbs" class="mb-4">
    <ol class="flex items-center space-x-2 text-sm text-gray-600">
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <div class="flex items-center">
          <span v-if="index > 0" class="mx-2 text-gray-400">&gt;</span>
          <template v-if="crumb.isLast">
            <span class="font-medium text-gray-600">{{ crumb.text }}</span>
          </template>
          <template v-else>
            <router-link
              :to="crumb.link"
              :class="[
                'hover:text-gray-900 transition-colors',
                index === 0 ? 'text-gray-600' : 'text-gray-600',
              ]"
            >
              {{ crumb.text }}
            </router-link>
          </template>
        </div>
      </li>
    </ol>
  </nav>
</template>
