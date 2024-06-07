const mock = require('mockjs')

const data = mock.mock({
    'list|1-10': [{
        'id|+1': 1,
        name: '@name',
        url: '@url()',
        date: '@date("yyyy-MMM-dd")'
    }],
    email: ['@email']
})

module.exports = data
