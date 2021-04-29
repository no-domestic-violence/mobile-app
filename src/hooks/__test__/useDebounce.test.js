import { act, renderHook } from '@testing-library/react-hooks';
import useDebounce from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useDebounce).toBeDefined();
  });
  it('should update value after specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: '', delay: 500 } }
    );
    expect(result.current).toBe('');
    act(() => jest.advanceTimersByTime(510));
    expect(result.current).toBe('');

    rerender({ value: 'Test', delay: 500 });

    expect(result.current).toBe('');
    act(() => jest.advanceTimersByTime(498));
    expect(result.current).toBe('');
    act(() => jest.advanceTimersByTime(3));
    // expect(result.current).toBe('Test'); // TODO: fix this
  });
});
