import { createSelector } from 'reselect'

const selectWeb3 = (state) => state['web3']

const selectWeb3Status = createSelector(
  selectWeb3,
  (web3) => !!web3.web3Instance
)

export {
  selectWeb3Status,
}
