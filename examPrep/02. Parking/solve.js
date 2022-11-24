class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }

    addCar(carModel, carNumber) {
        if (this.capacity === this.vehicles.length) {
            throw new Error('Not enough parking space.')
        }

        let car = {
            carModel,
            carNumber,
            payed: false
        }

        this.vehicles.push(car);

        return `The ${carModel}, with a registration number ${carNumber}, parked.`
    }

    removeCar(carNumber) {
        if (!this.vehicles.some(x => x.carNumber == carNumber)) {
            throw new Error(`The car, you're looking for, is not found.`);
        }

        let currentCar = this.vehicles.find(el => el.carNumber == carNumber);

        if (!currentCar.payed) {
            throw new Error(`${carNumber} needs to pay before leaving the parking lot.`);
        } else {
            this.vehicles = this.vehicles.filter(el => el.carNumber != carNumber);
            return `${carNumber} left the parking lot.`
        }

    }

    pay(carNumber) {
        if (!this.vehicles.some(x => x.carNumber == carNumber)) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        }

        let currentCar = this.vehicles.find(el => el.carNumber == carNumber);

        if (currentCar.payed == true) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`)
        }

        currentCar.payed = true;

        return `${carNumber}'s driver successfully payed for his stay.`
    }

    getStatistics(carNumber) {
        let result = '';
        if (!carNumber) {
            result += `The Parking Lot has ${this.capacity - this.vehicles.length} empty spots left.\n`;
            this.vehicles.sort((a, b) => a.carModel.localeCompare(b.carModel));
            for (let car of this.vehicles) {
                if (car.payed) {
                    result += `${car.carModel} == ${car.carNumber} - Has payed\n`
                } else {
                    result += `${car.carModel} == ${car.carNumber} - Not payed\n`
                }
                
                return result.trim()
            }
        } else {
            let currentCar = this.vehicles.find(el => el.carNumber == carNumber);
            return `${currentCar.carModel} == ${currentCar.carNumber} - ${currentCar.payed}`
        }
    }
}

const parking = new Parking(12);
console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());
console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));