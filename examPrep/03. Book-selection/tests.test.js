const { expect } = require('chai')
const bookSelection = require('./solution')

describe("Test for bookSelection", function () {
    describe("Test isGenreSuitable", function () {
        it('happy case', () => {
            expect(bookSelection.isGenreSuitable('Thriller', 20)).to.equal(`Those books are suitable`);
            expect(bookSelection.isGenreSuitable('Horror', 20)).to.equal(`Those books are suitable`);
            expect(bookSelection.isGenreSuitable('a', 20)).to.equal(`Those books are suitable`);
            expect(bookSelection.isGenreSuitable('a', 10)).to.equal(`Those books are suitable`);
        })

        it('inappropriate genre', () => {
            expect(bookSelection.isGenreSuitable('Thriller', 10)).to.equal(`Books with Thriller genre are not suitable for kids at 10 age`);
            expect(bookSelection.isGenreSuitable('Horror', 10)).to.equal(`Books with Horror genre are not suitable for kids at 10 age`);
        })

        it('inappropriate genre at edge', () => {
            expect(bookSelection.isGenreSuitable('Thriller', 12)).to.equal(`Books with Thriller genre are not suitable for kids at 12 age`);
            expect(bookSelection.isGenreSuitable('Horror', 12)).to.equal(`Books with Horror genre are not suitable for kids at 12 age`);
        })

        describe('Test isItAffordable', function () {
            it('should return error if price is not number', () => {
                expect(() => bookSelection.isItAffordable('1', 13)).to.throw();
                expect(() => bookSelection.isItAffordable('1', '1')).to.throw();
                expect(() => bookSelection.isItAffordable(1, '1')).to.throw();
            })

            it('happy cases', () => {
                expect(bookSelection.isItAffordable(1, 2)).to.equal(`Book bought. You have 1$ left`);
                expect(bookSelection.isItAffordable(2, 3)).to.equal(`Book bought. You have 1$ left`);
            })

            it('happy cases on edge', () => {
                expect(bookSelection.isItAffordable(1, 1)).to.equal(`Book bought. You have 0$ left`);
            })

            it('not enough money', () => {
                expect(bookSelection.isItAffordable(3, 2)).to.equal("You don't have enough money");
            })
        })

        describe('Test suitableTitles', function () {
            it('input is not an array or genre is not a string', () => {
                expect(() => bookSelection.suitableTitles('1, 2, 3', 'Thriller')).to.throw();
                expect(() => bookSelection.suitableTitles([1, 2, 3], 3)).to.throw();
                expect(() => bookSelection.suitableTitles('1, 2, 3', 3)).to.throw();
            })

            it('genre added to array', () => {
                expect(bookSelection.suitableTitles([{
                    title: 'aa',
                    genre: 'a'
                }], 'a')).to.deep.equal(['aa']);
            })

            it('genre added to array two matches', () => {
                expect(bookSelection.suitableTitles([{
                    title: 'aa',
                    genre: 'a'
                }, {
                    title: 'ab',
                    genre: 'a'
                }], 'a')).to.deep.equal(['aa', 'ab']);
            })

            it('no matches', () => {
                expect(bookSelection.suitableTitles([{
                    title: 'aa',
                    genre: 'b'
                }], 'a')).to.deep.equal([]);
            })
        })
    });
});