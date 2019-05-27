import request from './base'

export default {
  dataCommit: (commit, data, mutation) => {
    return request.pureDataCommit(commit, data, mutation)
  }
}
