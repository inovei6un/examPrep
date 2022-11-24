class Restaurant {
    constructor(budget) {
        this.budget = Number(budget);
        this.menu = {};
        this.stockProducts = {};
        this.history = [];
    }

    loadProducts(products) {
        products.forEach(el => {
            let [name, quantity, totalPrice] = el.split(' ');

            quantity = Number(quantity);
            totalPrice = Number(totalPrice);

            if (this.budget >= totalPrice) {
                if (!this.stockProducts[name]) {
                    this.stockProducts[name] = quantity;

                } else {
                    this.stockProducts[name] += quantity;
                }
                
                this.budget -= totalPrice;

                this.history.push(`Successfully loaded ${quantity} ${name}`)
            } else {
                this.history.push(`There was not enough money to load ${quantity} ${name}`)
            }

        })

        return this.history.join('\n')
    }

    addToMenu(meal, neededProducts, price) {
        if (!this.menu[meal]) {
            this.menu[meal] = {
                products: {},
                price: price
            }

            neededProducts.forEach(el => {
                let [name, quantity] = el.split(' ');
                quantity = Number(quantity);
                this.menu[meal].products[name] = quantity;
            })

            let mealCount = Object.keys(this.menu).length
            if (mealCount == 1) {
                return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`
            } else {
                return `Great idea! Now with the ${meal} we have ${mealCount} in the menu, other ideas?`
            }

        } else {
            return `The ${meal} is already in the our menu, try something different.`
        }
    }

    showTheMenu() {
        if (Object.keys(this.menu).length == 0) {
            return `Our menu is not ready yet, please com later...`
        } else {
            let result = ''
            
            for (let meal in this.menu) {
                result += `${meal} - $ ${this.menu[meal].price}\n`;
            }

            return result.trim()
        }
    }

    makeTheOrder(meal) {
        if (!this.menu[meal]) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        } else {
            const needProducts = {};
            for (let product in this.menu[meal].products) {
                if (!this.stockProducts[product] || !this.stockProducts[product] < this.menu[meal].products[product]) {
                    return `For the time being, we cannot complete your order (${meal}), we are very sorry...`
                } else {
                    needProducts[product] = this.menu[meal].products[product];
                }
            }

            for (let nP in needProducts) {
                this.stockProducts[nP] -= needProducts[nP]
            }

            this.budget += this.menu[meal].price

            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`
        }
    }
}

let kitchen = new Restaurant(1000);
kitchen.loadProducts(['Yogurt 30 3', 'Honey 50 4', 'Strawberries 2010', 'Banana 5 1']);
kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);
console.log(kitchen.makeTheOrder('frozenYogurt'));