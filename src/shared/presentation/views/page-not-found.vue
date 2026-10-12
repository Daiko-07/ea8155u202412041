<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PvButton from 'primevue/button'
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

</script>



<template>
  <main class="p-5 text-center" aria-label="Page not found">
    <h1>404</h1>
    <h2>{{ t('notFound') }}</h2>
    <p>{{ route.fullPath }}</p>
    <pv-button
        :label="t('returnHome')"
        icon="pi pi-home"
        @click="router.push('/home')"
    />
  </main>
</template>