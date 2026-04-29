<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const props = defineProps<{
  mobile?: boolean
}>()

const { site, page, theme, hash, localeIndex } = useData()
const route = useRoute()

function ensureStartingSlash(path: string) {
  return path.startsWith('/') ? path : `/${path}`
}

function localeBase(key: string) {
  const locale = site.value.locales[key]
  if (locale?.link) {
    return locale.link
  }
  return key === 'root' ? '/' : `/${key}/`
}

function normalizeLink(base: string, relativePath: string) {
  const path = relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, site.value.cleanUrls ? '' : '.html')

  return `${base.replace(/\/$/, '')}${ensureStartingSlash(path)}`
}

function localeHref(targetKey: string) {
  if (targetKey === localeIndex.value) {
    return route.path + hash.value
  }

  if (theme.value.i18nRouting === false) {
    return localeBase(targetKey) + hash.value
  }

  const currentBase = localeBase(localeIndex.value)
  const relativePath = page.value.relativePath.slice(currentBase.length - 1)
  return normalizeLink(localeBase(targetKey), relativePath) + hash.value
}

const label = computed(() => (localeIndex.value === 'root' ? 'Язык' : 'Language'))

const items = computed(() => [
  {
    key: 'root',
    code: 'RU',
    title: 'Русский',
    href: localeHref('root'),
    active: localeIndex.value === 'root',
  },
  {
    key: 'en',
    code: 'EN',
    title: 'English',
    href: localeHref('en'),
    active: localeIndex.value === 'en',
  },
])
</script>

<template>
  <nav class="locale-switch" :class="{ 'locale-switch--screen': props.mobile }" :aria-label="label">
    <div class="locale-switch__items">
      <a
        v-for="item in items"
        :key="item.key"
        :href="item.href"
        class="locale-switch__pill"
        :class="{ 'is-active': item.active }"
        :aria-current="item.active ? 'page' : undefined"
        :title="item.title"
      >
        {{ item.code }}
      </a>
    </div>
  </nav>
</template>
