/*
 * A hook to update a record instead of creating a new one, based on an array of keys
 */
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if (options.updateByKeys && options.updateByKeys.length > 0) {
      const primaryKeyField = hook.app.service(options.service).id

      const query = {}
      for (const updateByKey of options.updateByKeys) {
        query[updateByKey] = hook.data[updateByKey]
      }
      return hook.app.service(options.service)
        .find({ query }).then(page => {
          if (page.total === 0) {
          } else {
            // console.info(`Existing record found in service: ${options.service} with keys(s): '${options.updateByKeys.join(', ')}' updating...`);
            hook.app.service(options.service).update(page.data[0][primaryKeyField], hook.data)
            hook.result = page.data[0]
          }
          return Promise.resolve(hook)
        })
    } else {
      return Promise.resolve(hook)
    }
  }
}
