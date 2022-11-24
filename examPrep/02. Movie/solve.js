class Movie {
    constructor(movieName, ticketPrice) {
        this.movieName = movieName;
        this.ticketPrice = Number(ticketPrice);
        this.screenings = []
        this.totalProfit = 0
        this.totalSoldMovieTickets = 0
    }

    newScreening(date, hall, description) {
        if (this.screenings.some(s => s.date == date && s.hall == hall)) {
            throw new Error(`Sorry, ${hall} hall is not available on ${date}`)
        }

        this.screenings.push({
            date,
            hall,
            description
        })
        return `New screening of ${this.movieName} is added.`
    }

    endScreening(date, hall, soldTickets) {
        const screening = this.screenings.find(s => s.date == date && s.hall == hall); // returns object if not returns undefined

        if (screening == undefined) {
            throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`)
        }

        const index = this.screenings.indexOf(screening);
        this.screenings.splice(index, 1);

        let screeningProfit = 0
        screeningProfit += soldTickets * this.ticketPrice

        this.totalProfit += screeningProfit
        this.totalSoldMovieTickets += soldTickets

        return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${screeningProfit}`



    }

    toString() {
        let result = `${this.movieName} full information:\n`;

        result += `Total profit: ${this.totalProfit.toFixed(0)}$\n`;
        result += `Sold Tickets: ${this.totalSoldMovieTickets}\n`;

        if (this.screenings.length == 0) {
            result += `No more screenings!`
        } else {
            result += `Remaining film screenings:\n`;

            this.screenings.sort((a, b) => a.hall.localeCompare(b.hall));

            for (let el of this.screenings) {
                result += `${el.hall} - ${el.date} - ${el.description}\n`
            }
        }

        return result.trim()

    }
}

let m = new Movie('Wonder Woman 1984', '10.00');
console.log(m.newScreening('October 2, 2020', 'IMAX 3D', `3D`));
console.log(m.newScreening('October 3, 2020', 'Main', `regular`));
console.log(m.newScreening('October 4, 2020', 'IMAX 3D', `3D`));
console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150));
console.log(m.endScreening('October 3, 2020', 'Main', 78));
console.log(m.toString());

m.newScreening('October 4, 2020', '235', `regular`);
m.newScreening('October 5, 2020', 'Main', `regular`);
m.newScreening('October 3, 2020', '235', `regular`);
m.newScreening('October 4, 2020', 'Main', `regular`);
console.log(m.toString());