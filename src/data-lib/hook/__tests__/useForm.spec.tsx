import { act, renderHook } from '@testing-library/react-hooks';
import useError from '../useError';
import useForm from '../useForm';

jest.mock('../useError');

describe('useForm', () => {
    test('Should reset form', () => {
        const removeErrorSpy = jest.fn();
        (useError as jest.Mock).mockReturnValue({removeError: removeErrorSpy});
        const { result } = renderHook<any,any>(() => useForm());
        const testHok = result.current;

        act(() => {
            testHok.resetForm('temp.settings');
        })

        expect(removeErrorSpy).toHaveBeenCalled();
    })
})