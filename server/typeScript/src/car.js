"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Car {
    constructor(car) {
        this.id = car.id;
        this.name = car.name;
        this.brand = car.brand;
        this.price = car.price;
        this.color = car.color;
    }
    update(car) {
        this.name = car.name;
        this.brand = car.brand;
        this.price = car.price;
        this.color = car.color;
    }
}
exports.Car = Car;
//# sourceMappingURL=car.js.map