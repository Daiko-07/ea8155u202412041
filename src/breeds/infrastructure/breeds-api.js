import axios from 'axios'
const api = axios.create({
    baseURL: import.meta.env.VITE_DOG_API_URL

})

export const getDogBreeds = async () => {
    const response = await api.get('/breeds/list/all')
    return Object.entries(response.data.message).flatMap(
        ([breed, subBreeds]) => {
            if (subBreeds.length === 0) {
                return [{ label: breed, value: breed }]
            }

            return [
                { label: breed, value: breed },
                ...subBreeds.map(sub => ({
                    label: `${sub} ${breed}`,
                    value: `${breed}/${sub}`
                }))
            ]
        }
    )
}
export const getBreedImage = async (breed) => {

    const response = await api.get(`/breed/${breed}/images/random`)
    return response.data.message

}