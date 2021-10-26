import {act, renderHook} from '@testing-library/react-hooks'

import {createFileName, useScreenshot} from './index';

describe('checking create file name', () => {
    test('correct file name creation', () => {
        const fileName = createFileName('png', 'test')

        expect(fileName).toBe('test.png')
    })
})

describe('useScreenshot hook', () => {
    test('throw an error if node is null', async () => {
        const {
            result
        } = renderHook(() => useScreenshot())

        await act(async () => {
            try {
                await result.current.takeScreenshot(null as unknown as HTMLElement)
            } catch (error) {
                expect(error).toEqual('You should provide correct html node')
            }
        })
        expect(result.current.isError).toEqual(true)
    })
})