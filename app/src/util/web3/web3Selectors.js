import { createSelector } from 'reselect'

const selectWeb3 = (state) => state['web3']

const selectWeb3Status = createSelector(
  selectWeb3,
  (web3) => ({
    exists: web3.get('web3Instance'),
    checked: web3.get('existenceChecked'),
  })
)

export {
  selectWeb3Status,
}
