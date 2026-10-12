<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PvButton from 'primevue/button'
import PvSelect from 'primevue/select'
import PvInputText from 'primevue/inputtext'
import PvCard from 'primevue/card'
import { useShelterStore } from '../../application/shelter.store.js'
import { ShelterAnimal } from '../../domain/shelter.entity.js'
import {
  getDogBreeds,

  getBreedImage

} from '../../../breeds/infrastructure/breeds-api.js'



const router = useRouter()

const { t } = useI18n()

const store = useShelterStore()



const location = ref(null)

const breed = ref(null)

const petName = ref('')

const breeds = ref([])

const image = ref('')

const errorKey = ref('')

const saving = ref(false)



onMounted(async () => {
  try {
    await Promise.all([
      store.loadData(),
      getDogBreeds().then(data => {
        breeds.value = data
      })

    ])

  } catch {

    errorKey.value = 'loadError'

  }

})



const filteredBreeds = computed(() => {

  if (!location.value) return []



  const allowed = String(location.value.dogBreeds || '')

      .split(',')

      .map(value => value.trim().toLowerCase())

      .filter(Boolean)



  return breeds.value.filter(item => {

    const mainBreed = item.value.split('/')[0].toLowerCase()

    const label = item.label.toLowerCase()



    return allowed.some(

        name =>

            name === mainBreed ||

            name === label ||

            name === item.value.toLowerCase()

    )

  })

})



watch(location, () => {

  breed.value = null

  image.value = ''

})



watch(breed, async (value, _, onCleanup) => {

  image.value = ''



  if (!value) return



  let cancelled = false

  onCleanup(() => {

    cancelled = true

  })



  try {

    const result = await getBreedImage(value)

    if (!cancelled) image.value = result

  } catch {

    image.value = ''

  }

})



const createAnimal = async () => {

  errorKey.value = ''



  if (!location.value || !breed.value || !petName.value.trim()) {

    errorKey.value = 'required'

    return

  }



  if (store.getAvailableCapacity(location.value) <= 0) {

    errorKey.value = 'full'

    return

  }



  saving.value = true



  try {

    const animal = new ShelterAnimal(

        location.value.id,

        breed.value,

        petName.value.trim()

    )



    await store.addAnimal(animal)

    router.push('/home')

  } catch {

    errorKey.value = 'savedError'

  } finally {

    saving.value = false

  }

}

</script>



<template>

  <main class="p-4" aria-label="New Animal Intake">

    <h1>{{ t('newIntake') }}</h1>

    <p class="subtitle">{{ t('addRescued') }}</p>



    <pv-card>

      <template #content>

        <form

            class="flex flex-column gap-3"

            @submit.prevent="createAnimal"

        >

          <label for="location">{{ t('location') }}</label>



          <pv-select

              inputId="location"

              v-model="location"

              :options="store.locations"

              optionLabel="name"

              :placeholder="t('selectLocation')"

              fluid

          />



          <p v-if="location">

            {{ t('availableCapacity') }}:

            {{ store.getAvailableCapacity(location) }}

          </p>



          <label for="breed">{{ t('breed') }}</label>



          <pv-select

              inputId="breed"

              v-model="breed"

              :options="filteredBreeds"

              optionLabel="label"

              optionValue="value"

              :placeholder="t('selectBreed')"

              :disabled="!location"

              filter

              fluid

          />



          <div v-if="image" class="preview">

            <h3>{{ t('imagePreview') }}</h3>

            <img

                :src="image"

                :alt="breed"

                class="breed-image"

            />

          </div>



          <label for="pet-name">{{ t('petName') }}</label>



          <pv-input-text

              id="pet-name"

              v-model="petName"

              :placeholder="t('enterName')"

              maxlength="100"

              fluid

          />



          <p v-if="errorKey" role="alert" class="error">

            {{ t(errorKey) }}

          </p>



          <div class="flex gap-2">

            <pv-button

                :label="t('cancel')"

                severity="secondary"

                type="button"

                @click="router.push('/home')"

            />



            <pv-button

                :label="t('create')"

                type="submit"

                :loading="saving"

                :disabled="saving"

            />

          </div>

        </form>

      </template>

    </pv-card>

  </main>

</template>