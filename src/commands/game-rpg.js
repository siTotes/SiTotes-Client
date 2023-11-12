//━━━[ untuk memanggil code yang di luar folder ini ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const home = (path) => __base + path
require(home('./src/options/settings'))

//━━━[ ALL MODULE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const fs = require('fs')
const moment = require("moment-timezone");
const similarity = require('similarity')
const threshold = 0.72

//━━━[ @SITOTES LIB ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const svdata = () => fs.writeFileSync(home(`/src/.sitotes/data/database.json`), JSON.stringify(db, null, 2))
const {
    smsg,
    getGroupAdmins,
    formatp,
    tanggal,
    tanggal_,
    tanggal__,
    formatDate,
    getTime,
    isUrl,
    sleep,
    clockString,
    runtime,
    fetchJson,
    getBuffer,
    jsonformat,
    format,
    logic,
    generateProfilePicture,
    parseMention,
    getRandom
} = require(home('./lib/myfunc'))
const lang = require(home('./src/options/lang_id'))

//━━━[ @BOCHILTEAM ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const {
    tebakgambar,
    caklontong,
    family100,
    asahotak,
    tebakkata,
    tekateki,
    tebakkimia,
    tebakkabupaten,
    siapakahaku,
    susunkata,
    tebakbendera,
    tebaklirik,
    tebaktebakan,
} = require('@bochilteam/scraper')

//━━━[ DATA BASE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const _tebakgambar = (db.data.game['tebakgambar'] = {})
const _caklontong = (db.data.game['caklontong'] = {})
const _family100 = (db.data.game['family100'] = {})


let lgm = {
    "gamelist": [
        'tebakgambar',
        'caklontong',
        'family100',
        'asahotak',
        'tebakkata',
        'tekateki',
        'tebakkimia',
        'tebakkabupaten',
        'siapakahaku',
        'susunkata',
        'tebakbendera',
        'tebaklirik',
        'tebaktebakan'
    ]
}
let isInGame = false

const totalScore = (soal) => {
    let iswin = {}
    let dibagi
    iswin['lvl'] = soal.index

    if (soal.index < 10000) {
        //3092
        dibagi = 2000 * (iswin.lvl / 100) * 1
        iswin['coin'] = dibagi / 2
        iswin['xp'] = (iswin.lvl / 100) * 100.0 / 4
    } else if (soal.index < 1000) {
        //309
        iswin['coin'] = 2000 * (iswin.lvl / 100) * 1
        iswin['xp'] = (iswin.lvl / 100) * 100.0 / 2
    } else if (soal.index < 100) {
        //30
        iswin['coin'] = 2000 * (iswin.lvl / 100) * 10
        iswin['xp'] = iswin.lvl / 2 * 6
    } else {
        //3
        iswin['coin'] = 2000 * (iswin.lvl / 100) * 100
        iswin['xp'] = iswin.lvl / 2 * 16
    }
    return iswin
}

//━━━[ If user chat rpg-game ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
module.exports = onic = async (onic, m, command, mek) => {
    //try{
    var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
    var budy = (typeof m.text == 'string' ? m.text : '')
    const type = Object.keys(mek.message)[0];
    const isCmd = mek.key.fromMe ? /^[$]/.test(body) : /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
    const prefix = isCmd ? budy[0] : ''
    const salam = moment(Date.now()).tz(timezone).locale('id').format('a')
    const pushname = m.pushName || "No Name"


    const reply = async (teks) => {
        return await onic.sendFakeLink(m.chat, teks, salam, pushname, ownername, logo, myweb, m)
    }

    isInGame = false
    for (let gameNo = 0; gameNo < lgm.gamelist.length; gameNo++) {
        var ver = db.data.game[lgm.gamelist[gameNo]] ? db.data.game[lgm.gamelist[gameNo]] : false
        if (ver[m.chat] ? true : false) {
            isInGame = true
        }
    }

    if (_tebakgambar[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == _tebakgambar[m.chat]['gameid']) {
            let json = JSON.parse(JSON.stringify(_tebakgambar[m.chat]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (m.text.toLowerCase() == jawaban) {
                delete _tebakgambar[m.chat]
                await onic.sendMessage(m.chat, {
                    text: lang.JwbTrue('Tebak Gambar', json.hadiah.coin.toLocaleString('en-US'), json.hadiah.xp, 'tebakgambar')
                })
            } else if (similarity(m.text.toLowerCase(), jawaban) >= threshold) {
                reply(lang.JwbHampir())
            } else {
                onic.sendMessage(m.chat, {
                    text: lang.JwbErr()
                }, {
                    quoted: m
                })
            }
        }
    }
    if (_caklontong[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == _caklontong[m.chat]['gameid']) {
            let json = JSON.parse(JSON.stringify(_caklontong[m.chat]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (m.text.toLowerCase() == jawaban) {
                delete _caklontong[m.chat]
                await onic.sendMessage(m.chat, {
                    text: lang.JwbTrue('Cak Lontong', json.hadiah.coin.toLocaleString('en-US'), json.hadiah.xp, 'caklontong')
                })
            } else if (similarity(m.text.toLowerCase(), jawaban) >= threshold) {
                reply(lang.JwbHampir())
            } else {
                onic.sendMessage(m.chat, {
                    text: lang.JwbErr()
                }, {
                    quoted: m
                })
            }
        }
    }

    let soal
    let gam
    let vlet
    let hadiahahah

    switch (command) {
         //sitotes 2023, bot client free

    }

    // }catch(e){
    // console.log('error path:\n'+ __dirname+'\n\nerror log:\n'+e)
    // }finally{
    // //console.log('GAME-RPG → global.db ')
    // svdata()
    // }
}