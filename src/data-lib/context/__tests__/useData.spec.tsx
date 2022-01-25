import { renderHook } from '@testing-library/react-hooks';
import useData from "../useData";

export {};

describe('useData', () => {
    test('Should init with prepop data', () => {
        const initData = { page1: {comp1: 'Hello'} };
        const {result} = renderHook<AnalyserNode, any>(() => useData(initData));
        expect(result.current.data).toStrictEqual(initData);
    })
})