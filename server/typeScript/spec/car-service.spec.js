"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const cars_service_1 = require("../src/cars-service");
describe("O servico de carros", () => {
    var carService;
    beforeEach(() => carService = new cars_service_1.CarService());
    it("é inicialmente vazio", () => {
        expect(carService.cars.length).toBe(0);
    });
    it("cadastra carros corretamente", () => {
        const sample = {
            name: "Lancer",
            brand: "Mitsubishi",
            price: 1,
            color: "BLACK"
        };
        carService.add(sample);
        expect(carService.cars.length).toBe(1);
        const result = carService.cars[0];
        expect(result.id).toBe(0);
        expect(result.name).toBe(sample.name);
        expect(result.brand).toBe(sample.brand);
        expect(result.price).toBe(sample.price);
        expect(result.color).toBe(sample.color);
    });
});
//# sourceMappingURL=car-service.spec.js.map