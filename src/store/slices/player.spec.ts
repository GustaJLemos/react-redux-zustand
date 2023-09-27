import { describe, it, expect } from 'vitest';
import { player as reducer, playerSlice, play, next } from './player';

describe('player slice', () => {
  it('should be able to play', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer(initialState, play([1, 2]))

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer(initialState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should be able to jump the next module automatically', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer({
      ...initialState,
      currentLessonIndex: 5
    }, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('should not update the current module and lesson index if there is no next lesso available', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer({
      ...initialState,
      currentModuleIndex: 1,
      currentLessonIndex: 3
    }, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(3)
  })
})