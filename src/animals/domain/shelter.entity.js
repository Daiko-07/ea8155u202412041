export class ShelterAnimal {
    constructor(locationId, dogbreed , petName) {
        this.locationId = locationId;
        this.dogbreed = dogbreed;
        this.petName = petName;
        this.registeredAt = new Date().toISOString();
    }
}