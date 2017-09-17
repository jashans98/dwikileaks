import { createSelector } from 'reselect'

const selectAdmin = (state) => state['admin']

const selectGetLeakStatus = createSelector(
  selectAdmin,
  (status) => ({
    pending: status.get('getLeakPending'),
    fail: status.get('getLeakFail'),
    success: status.get('getLeakSuccess'),
  })
)

const selectLeakData = createSelector(
  selectAdmin,
  (admin) => admin.get('data')
)

export {
  selectGetLeakStatus,
  selectLeakData,
}
