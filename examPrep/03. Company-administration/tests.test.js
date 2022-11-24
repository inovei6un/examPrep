const {expect, assert} = require('chai')
const companyAdministration = require('./companyAdministration')


describe("Test companyAdministration", function() {
    describe('Test hiringEmployee', function() {
        it('should return was successfully hired edge case', function() {
            let name = 'Gosho'
            let position = 'Programmer'
            let yearsExperience = 3
            let test = companyAdministration.hiringEmployee(name, position, yearsExperience)

            let returnMSG = `${name} was successfully hired for the position ${position}.`

            expect(test).to.be.equal(returnMSG)
        })

        it('should return was successfully hired more years', function() {
            let name = 'Gosho'
            let position = 'Programmer'
            let yearsExperience = 10
            let test = companyAdministration.hiringEmployee(name, position, yearsExperience)

            let returnMSG = `${name} was successfully hired for the position ${position}.`

            expect(test).to.be.equal(returnMSG)
        })

        it('should return is not approved', function() {
            let name = 'Gosho'
            let position = 'Programmer'
            let yearsExperience = 2
            let test = companyAdministration.hiringEmployee(name, position, yearsExperience)

            let returnMSG = `${name} is not approved for this position.`

            expect(test).to.be.equal(returnMSG)
        })

        it('should return is not approved for other position', function() {

            expect(() => companyAdministration.hiringEmployee('Pesho', 'Stripper', 15)).to.throw()
        })

        it('should return is not approved for other position 2', function() {

            expect(() => companyAdministration.hiringEmployee('Pesho', 'Super Star', 1)).to.throw()
        })
    });

    describe('Test calculateSalary', function() {
        it('should throw if hours are wrong input or less than 0', function() {
            expect(() => companyAdministration.calculateSalary(-1)).to.throw()
            expect(() => companyAdministration.calculateSalary('1')).to.throw()
        });

        it('should return payment with and without bonus', function() {
            expect(companyAdministration.calculateSalary(100)).to.equal(1500)
            expect(companyAdministration.calculateSalary(160)).to.equal(2400)
            expect(companyAdministration.calculateSalary(161)).to.equal(3415)
            expect(companyAdministration.calculateSalary(200)).to.equal(4000)
        });
    });

    describe('Test calculateSalary', function() {
        it('should throw if invalid inputs', function() {
            expect(() => companyAdministration.firedEmployee('1, 2, 3', 1)).to.throw();
            expect(() => companyAdministration.firedEmployee([1, 2 ,3], '1')).to.throw();
            expect(() => companyAdministration.firedEmployee([1, 2 ,3], -1)).to.throw();
            expect(() => companyAdministration.firedEmployee([1, 2 ,3], 3)).to.throw();
            expect(() => companyAdministration.firedEmployee('1, 2 ,3', -1)).to.throw();
            expect(() => companyAdministration.firedEmployee('1, 2 ,3', '100')).to.throw();
        });

        it('should return list of employees', function() {
            expect(companyAdministration.firedEmployee(['ivan', 'peter', 'gosho'], 0)).to.equal('peter, gosho')
            expect(companyAdministration.firedEmployee(['ivan'], 0)).to.equal('')
            expect(companyAdministration.firedEmployee(['ivan', 'peter'], 1)).to.equal('ivan')
        });
    });
    
});