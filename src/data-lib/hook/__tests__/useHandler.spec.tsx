import { DataContext } from '../../context/DataProvider';
import { renderHook } from '@testing-library/react-hooks';
import useHandler from '../useHandler';
import { act } from 'react-dom/test-utils';

describe('useHandler', () => {
    test('Should handle onChange', () => {
        const setValueSpy = jest.fn();
        const dataContext = {setValue: setValueSpy};

        //@ts-ignore
        const wrapper = ({children}) => {
            return <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
        }

        const {result} = renderHook<any,any>(() => useHandler(), {wrapper});
        const testHook = result.current;

        const event = {target: {
            dataset: {
                compDataPath: 'page1.comp1'
            },
            value: 'value1'
        }}

        act(() => {
            testHook.onChange(event);
        });

        expect(setValueSpy).toHaveBeenCalled();
    })
})