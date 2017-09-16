import { createSelector } from 'reselect'

const selectSubmit = (state) => state.get('submit')

const selectSubmitStatus = createSelector(
  selectSubmit,
  (status) => ({
    pending: status.submitPending,
    fail: status.submitFail,
    success: status.submitSuccess,
  })
)

export {
  selectSubmitStatus,
}
