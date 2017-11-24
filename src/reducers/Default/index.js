import { fromJS } from 'immutable'
export const DEFAULT = 'src/default/DEFAULT'

export const getDefault = (data) => ({ type: DEFAULT, data })

const initialState = fromJS({
  isFetching: false
})

const defaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT:
      return state.merge({ isFetching: true })
    default:
      return state
  }
}

export default defaultReducer
