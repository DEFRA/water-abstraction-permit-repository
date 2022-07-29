const ACCEPTANCE_TEST_SOURCE = 'acceptance-test-setup'
const { pool } = require('../../lib/connectors/db')

const deleteTestData = async (request, h) => {
  await pool.query(`
    delete
    from permit.licence
    where metadata->>'source' = '${ACCEPTANCE_TEST_SOURCE}';
  `)

  return h.response().code(204)
}

exports.deleteTestData = deleteTestData
