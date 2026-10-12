export class ShelterAnimal {
    constructor(locationId, dogBreed , petName) {
        this.locationId = locationId;
        this.dogBreed = dogBreed;
        this.petName = petName;
        this.registeredAt = new Date().toISOString();
    }
}