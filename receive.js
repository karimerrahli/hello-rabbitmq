const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function(err, conn){
    conn.createChannel((err, ch) => {
        let ex = 'logs'

        ch.assertExchange(ex, 'fanout', {durable: false})
        //ch.prefetch(1)
        ch.assertQueue('', {exclusive: true}, (err, q) => {
            ch.bindQueue(q.queue, ex, '')

            ch.consume(q.queue, (msg) => {
                let secs = msg.content.toString().split('.').length - 1
                console.log(q.queue)
                console.log(`received ${msg.content}`)
                
                setTimeout(() => {
                    console.log(`done ${msg.content}`)
                    ch.ack(msg)
                }, secs * 1000)
            }, {noAck: false})
        })
    })
})
