const amqp = require('amqplib/callback_api')
const json = require('./test.json')
const util = require('util')

console.log(util.inspect(process.argv, false, 5, true))

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        let ex = 'logs'
        let q = 'helloo'
        let msg = process.argv.slice(2).join(' ') || 'Hello world'

        ch.assertExchange('logs', 'fanout', {durable: false})
        ch.publish(ex, '', new Buffer(msg))
        console.log(`Message sent: ${msg}`)
    })


    setTimeout(() => {
        conn.close()
        process.exit(0)
    }, 500)
})
