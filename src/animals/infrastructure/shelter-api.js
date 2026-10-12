import axios from 'axios'
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const getShelterLocations = async () => {
    const response = await api.get('/shelter-locations')
    return response.data
}
export const getShelterAnimals = async () => {
    const response = await api.get('/shelter-animals')
    return response.data
}
export const createShelterAnimal = async (animal) => {
    const response = await api.post('/shelter-animals', animal)
    return response.data
}

