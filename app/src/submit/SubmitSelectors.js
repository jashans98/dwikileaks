import { createSelector } from 'reselect'

const selectSubmit = (state) => state['submit']

const selectSubmitStatus = createSelector(
  selectSubmit,
  (status) => ({
    pending: status.get('submitPending'),
    fail: status.get('submitFail'),
    success: status.get('submitSuccess'),
  })
)

export {
  selectSubmitStatus,
}
