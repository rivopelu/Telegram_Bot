const { Telegraf } = require('telegraf')

const mysql = require('mysql')

const conn = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bot-test'

});


conn.connect(function (err) {
    if (err) {
        throw err;
    }

    console.log("connected !");

    conn.query('SELECT * FROM toko', function (err, result, fields) {
        if (err) {
            throw err;
        }
        dataStore = [];
        // console.log(result)
        result.forEach(item => {
            // console.log(item.nama_toko)
            dataStore.push({
                id: item.id,
                namaToko: item.nama_toko,
                ip: item.ip
            })
        });
    })
})




const bot = new Telegraf('5309427849:AAGRsu-meHhPdVb5i5W3fgj56X5qbFL81zY')
const helpMessage = 'Hallo selamat datang di percobaan bot rivo pelu. \n /tokoList --> menanpilkan seluruh data Toko \n \n/toko nama toko -->menampilkan detail dari data toko';




bot.start((ctx) => ctx.reply('hallo slmat datang'))
bot.help((ctx) => ctx.reply(helpMessage))
bot.command('tokoList', ctx => {
    let data = 'data toko : \n\n'
    dataStore.forEach(item => {
        data += `id : ${item.id} \nnama toko : ${item.namaToko} \nip : ${item.ip}\n\n`
    })

    ctx.reply(data)
})

bot.command('toko', ctx => {


    let input = ctx.message.text.split(' ');
    if (input.length != 2) {
        ctx.reply('anda harus memberi nama toko pada argument ke 2')
        return;
    }
    // console.log(input[1])
    let namaInput = input[1]


    dataStore.forEach(item => {
        if (item.namaToko.includes(namaInput)) {
            ctx.reply(`ID = ${item.id}\nNama Toko = TOKO ${item.namaToko}\nIP = ${item.ip}`)
        }


    })


})


bot.launch()

