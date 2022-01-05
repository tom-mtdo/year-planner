import { names } from '../../util/constant';

export const settings = {
    [names.year]: {
        required: { expression: true, message: 'Please provide year YYYY'},
        length: { expression: 4, message: 'Length is 4 chars' }
    },
    [names.country]: {
        required: { expression: true, message: 'Please select a country'},
    }
}