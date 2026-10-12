<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useShelterStore } from '../../application/shelter.store.js'
import ShelterLocationSummary from '../components/shelter-location-summary.vue'
const { t } = useI18n()
const store = useShelterStore()
const error = ref(false)
onMounted(async () => {
  try {
    await store.loadData()
  } catch {
    error.value = true
  }
})
</script>

<template>
  <main class="p-4" aria-label="Home">
    <h1>{{ t('home') }}</h1>

    <p class="subtitle">{{ t('welcome') }}</p>
    <h2>{{ t('myIntakes') }}</h2>
    <p v-if="error" role="alert">
      {{ t('loadError') }}

    </p>
    <div v-if="store.loading" class="p-3">
      Loading...
    </div>
    <div v-else class="grid">
      <div

          v-for="location in store.locations"
          :key="location.id"
          class="col-12 md:col-6"
      >
        <shelter-location-summary
            :location="location"
            :animals="store.getAnimalsByLocation(location.id)"
        />

      </div>
    </div>

  </main>

</template>