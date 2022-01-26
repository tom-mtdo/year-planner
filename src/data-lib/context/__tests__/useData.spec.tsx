import { act, renderHook } from '@testing-library/react-hooks';
import useData from "../useData";

export {};

describe('useData', () => {
    test('Should init with prepop data', () => {
        const initData = { page1: {comp1: 'Hello'} };
        const {result} = renderHook<AnalyserNode, any>(() => useData(initData));
        expect(result.current.data).toStrictEqual(initData);
    })

    test('Should remove value', async () => {
        const initData = { page1: {
            comp1: 'Hello',
            comp12: 'Hi'
        }};
        const {result} = renderHook<AnalyserNode, any>(() => useData(initData));
        const testHook = result.current;
        const expected = { page1:{
            comp12: 'Hi'
        }};
        let output;

        act(() => {
            output = testHook.removeValue('page1', 'comp1');
        });

        // TODO config jest to support await
        // await waitForNextUpdate();
        // expect(output).toStrictEqual(expected);

        expect(output).toStrictEqual(expected);

    })

    // test('Should remove value - including children', async () => {
    //     const initData = { page1: {
    //         comp1: 'Hello',
    //         comp12: 'Hi',
    //         comp2: 'what'
    //     }};
    //     const {result} = renderHook<AnalyserNode, any>(() => useData(initData));
    //     const testHook = result.current;
    //     const expected = { page1:{ comp2: 'what' }};
    //     let output;

    //     act(() => {
    //         output = testHook.removeValue('page1', 'comp1', true);
    //     });

    //     // TODO config jest to support await
    //     // await waitForNextUpdate();
    //     // expect(output).toStrictEqual(expected);

    //     expect(output).toStrictEqual(expected);

    // })
})