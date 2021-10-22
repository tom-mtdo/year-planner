import { Countries } from '../constant';
import { countriesToSelect, stateToSelect } from '../util';


describe('Util', () => {
    describe('countriesToSelect', () => {
        it('should return array of country for select', () => {
            const expected = [
                ['AU', 'Australia'],
                ['NZ', 'New Zealand']
            ];
            const output = countriesToSelect(Countries);
            expect(output).toEqual(expected);
        })
    })

    describe('stateToSelect', () => {
        it('should return array of state for a country for select', () => {
            const expected = [
                ['ACT', 'Australian Capital Territory'],
                ['NSW', 'New South Wales'],
                ['NT', 'Northern Territory'],
                ['QLD', 'Queensland'],
                ['SA', 'South Australia'],
                ['TAS', 'Tasmania'],
                ['VIC', 'Victoria'],
                ['WA', 'Western Australia'],
            ];
            const output = stateToSelect('AU');
            expect(output).toEqual(expected);
        })
    })
})