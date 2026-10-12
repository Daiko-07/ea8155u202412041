import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getShelterLocations,
    getShelterAnimals,
    createShelterAnimal
} from '../infrastructure/shelter-api.js'
export const useShelterStore = defineStore('shelter', () => {

    const locations = ref([])
    const animals = ref([])
    const loading = ref(false)
    const loadData = async () => {

        loading.value = true
        try {
            const [locationData, animalData] = await Promise.all([
                getShelterLocations(),
                getShelterAnimals()
            ])
            locations.value = locationData
            animals.value = animalData

        } finally {
            loading.value = false
        }

    }



    const getAnimalsByLocation = (locationId) => {

        return animals.value.filter(

            animal => String(animal.locationId) === String(locationId)

        )

    }



    const getAvailableCapacity = (location) => {
        return Number(location.maxCapacity) -
            getAnimalsByLocation(location.id).length
    }

    const addAnimal = async (animal) => {
        const created = await createShelterAnimal(animal)
        animals.value.push(created)
        return created
    }

    return {
        locations,
        animals,
        loading,
        loadData,
        getAnimalsByLocation,
        getAvailableCapacity,
        addAnimal
    }

})