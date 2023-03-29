"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const car_1 = require("./car");
class CarService {
    constructor() {
        this.cars = [];
        this.idCount = 0;
    }
    add(car) {
        if (this.cars.length >= 10)
            return null;
        const newCar = new car_1.Car(Object.assign({ id: this.idCount }, car));
        if (newCar.price <= 0) {
            throw Error("Price can't equal or less than zero");
        }
        this.cars.push(newCar);
        this.idCount++;
        return newCar;
    }
    update(car) {
        console.log(this.cars);
        var result = this.cars.find(c => c.id == c.id);
        if (result)
            result.update(car);
        return result;
    }
    get() {
        return this.cars;
    }
    getById(carId) {
        return this.cars.find(({ id }) => id == carId);
    }
}
exports.CarService = CarService;
//# sourceMappingURL=cars-service.js.map