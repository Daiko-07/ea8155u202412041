<script setup>
import { useI18n } from 'vue-i18n'
import PvCard from 'primevue/card'
const { t } = useI18n()

defineProps({
  location: {
    type: Object,
    required: true
  },

  animals: {
    type: Array,
    default: () => []
  }

})
</script>

<template>
  <pv-card class="h-full">
    <template #title>
      {{ location.name }}
    </template>
    <template #content>
      <p v-if="animals.length === 0">
        {{ t('noAnimals') }}
      </p>

      <ul v-else class="animal-list">
        <li v-for="animal in animals" :key="animal.id">

          <strong>{{ animal.petName }}</strong>

          — {{ animal.dogBreed }}
        </li>
      </ul>

    </template>
    <template #footer>

      <div class="flex flex-column gap-2">
    <span>
     {{ t('totalAnimals') }}: {{ animals.length }}

    </span>
        <span>
     {{ t('availableCapacity') }}:
     {{ Number(location.maxCapacity) - animals.length }}
    </span>

      </div>
    </template>
  </pv-card>
</template>