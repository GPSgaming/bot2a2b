/**
 * 
 *                          Login-2a2b-Example
 * Vui lòng ghi Credit (bao gồm:  Minhacoustic' : 'MoonU#0001' : 'VaitoSoi#2220' : 'Huybloxgaming.js' : 'Aokoasami') nếu có sử dụng
 * 
 * Đây là 1 bản làm lại dựa trên '2Y2C-Login-API' của MoonU#0001
 * Link dẫn vào bản gốc: https://github.com/MoonVN571/2Y2C-Login-API
 * 
 */

/**
 * 
 * Khai báo
 * 
 */

const mineflayer = require('mineflayer') // Khai báo mineflayer
const info = require('./config.json')   // Khai báo thông tin, vui lòng chỉnh sửa như bên dưới
const { MessageEmbed } = require('discord.js');
const mcstatus = require('mcstatus');
const axios = require('axios');
const ms = require('ms')
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const { mineflayer: mineflayerViewer } = require('prismarine-viewer');
/**
 * Vào file 'config.json'.
 * Chỉnh sửa các mục như dưới:
 *  +  username (là tên của của tài khoản Minecraft của bot)
 *  +  pass (Ngay bên dưới Bot.chat)
 * Có thể chỉnh (muốn chỉnh hay không thì bạn): 
 *  +  ip (IP của sever, mặc định là 2b2c.org)
 *  +  version (phiên bản của Minecraft khi tham gia vào server)
 *  +  port (là cổng để tham gia vào server, mặc định là 25565)
 * 
 * !!Lưu ý:
 *  **  username không được có dấu cách (vd: XiaoWu)
 *  **  pass sửa lại ('/l {mật khẩu} (vd: ('/l 123321) )
 *  -  ip server phải là 1 ip hợp lệ/có tồn tại (vd: 2b2c.org)
 *  -  version phải là 1 phiên bản hợp lệ/có tồn tại (vd: 1.12.2)
 *  -  port phải là 1 cổng hợp lệ (vd: 25565)
 */

/**
 * 
 * Khai báo chương trình
 * 
 */

function run() {

  // Khai báo bot
  const bot = mineflayer.createBot({
    // Tên của Bot
    username: info.username,

    // Version của game
    version: info.version,

    // IP của server
    host: info.ip,

    // Port của server
    port: Number(info.port),

    // Plugin AFK
    plugins: {
      afk: require('./afk')
    }
  })
  let enter = false

  bot.on('messagestr', (message) => {
    if (message.includes('[Server] Chào bạn, bạn cần tạo tài khoản trước khi chơi. Cú pháp: /reg [Mật Khẩu] [Nhập Lại MK]')) {
      bot.chat('/register cocainit123 cocainit123')// set mật khẩu đăng ký ở đây
      console.log('[CONSOLE]» 🟢 | Đã đăng ký')
      ms(`3s`)
    }

    if (message.includes('[Server] Chào bạn, vui lòng đăng nhập: /l [Mật Khẩu]')) {
      bot.chat('/l cocainit123') //set mật khẩu login ở đây
      console.log('[CONSOLE]» 🟢 | Đã đăng nhập')
      ms(`3s`)
    }
  })

  const array = [
    '> xem live: https://discord.gg/shine-l-o-r-d-rat-1134054567378685972',
    '> không biết nói gì =))'
    //...
  ]
  setInterval(
    () =>
      bot.chat(array[
        Math.floor(
          Math.random() * array.length
        )
      ]),
    ms(`30s`)
  )

  // Khi có 1 cửa sổ (bàn chế tạo, rương, lò nung,v.v...) mở
  bot.on('windowOpen', async (window) => {

    // Nếu cửa sổ đó là rương đơn (thường cộng với Inventory và Hotbar là 63)
    if (Number(window.slots.length) == 63) {

      // Thông báo ra console
      console.log('[CONSOLE]» 🟢 | Cửa sổ CHUYỂN-SERVER mở. ')

      // Nhấn vào ô để chuyển server
      bot.simpleClick.leftMouse(13);

      // Thông báo ra console
      console.log('[CONSOLE]» 🟢 | Đã click vào ô CHUYỂN-SERVER.')

      // Nếu cửa sổ đó là bàn chế tạo (thường cộng với Inventory và Hotbar là 46) 
    }
  });

  // Thông báo ra console khi có tin nhắn
  bot.on('messagestr', (msg) => {
    console.log('[LIVECHAT]» ' + msg)
    if (enter = true && msg === '[Server] Đăng nhập thành công! /2a2b để vào server') {
      bot.chat('/2a2b')
      console.log('[CONSOLE]» 🟢 | Đã nhập /2a2b')
    } else if (msg === 'The main server is down. We will be back soon!') bot.end('Sever restart')
  })

  // Khi bot ngắt kết nối đến server
  bot.on('end', (reason) => {
    // Thông báo tới console (làm màu thôi ;-;)
    console.log('[CONSOLE]» 🔴 | Bot mất kết nối với sevrer: ' + info.ip)
    console.log('[CONSOLE]» 🔴 | Với lý do: ' + reason.toString()) // Thông báo lý do
    console.log('[CONSOLE]» 🔴 | Kết nối lại sau 5 phút.')

    setTimeout(() => {
      console.log('[CONSOLE]» 🟡 | Đang kết nối lại với server: ' + info.ip)
      run()
    }, ms(`3s`))
  })

  let switches = 0

  // Khi bot logi vào sevrer
  bot.on('login', () => {
    switches++
    let sevrer = ''

    // Phân loại các cụm (Pin, Queue, Main)
    if (switches == 1) sevrer = 'PIN'
    else if (switches == 2) server = 'QUEUE'
    else if (switches == 3) {
      server = 'MAIN';
      switches = 0;
      setTimeout(() => {
        bot.afk.start()
        console.log('[CONSOLE]» 🟢 | Bot bắt đầu afk')
      }, ms(`3s`))
    }

    // Thông báo ra console
    console.log('[CONSOLE]» 🟢 | Đã kết nối đến server: ' + info.ip)
    console.log('[CONSOLE]» 🟢 | Hiện đang ở cụm sever: ' + sevrer)


  const PREFIX = '';
  client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'bot') {
      message.reply('using bot!');
    }
    
    if (command === 'ip') {
      const description = '**Thông tin máy chủ**\n'
        + '*version?*\n'
        + '*IP: example.net*\n'

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Info Sever')
        .setDescription(description)
        .setTimestamp();

      message.reply({ embeds: [embed] });
    }

    if (command === 'server') {
      if (args.length === 0) {
        message.reply('Hãy cung cấp địa chỉ IP của máy chủ Minecraft.');
      } else {
        const ip = args[0];
        try {
          const response = await axios.get(`https://api.mcsrvstat.us/2/${ip}`);
          const data = response.data;

          if (data.online) {
            const players = data.players.online;
            const maxPlayers = data.players.max;
            const version = data.version;

            const embed = new MessageEmbed()
              .setColor('#0099ff')
              .setTitle(`**Trạng thái máy chủ** ${ip}`)
              .setDescription(`Đang hoạt động - ${players}/${maxPlayers} người chơi`)
              .addField('Phiên bản', version);

            message.reply({ embeds: [embed] });
          } else {
            message.reply(`Máy chủ ${ip} hiện không hoạt động.`);
          }
        } catch (error) {
          console.error(error);
          message.reply('Có lỗi xảy ra khi truy vấn trạng thái máy chủ.');
        }
      }
    }
  });

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  });

  let prefix = '!';
  client.on('messageCreate', (msg) => {

  })
  client.on("ready", async => {
    console.log("Bot đã hoạt động")
  })
  client.on('message', async message => {
    if (!message.guild) return;
    if (message.author.bot || message.author.id === client.user.id) return;
    if (message.channel.id === "ID CHANNEL") {
      message.react('🟢');
      bot.chat(`*[${message.author.tag}]* ${message.content}`);
    }
  });

  bot.on("message", (username, message) => {
    let channel = client.channels.cache.get("ID CHANNEL")
    if (!channel) return;
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#09ED1C')
      .setTitle('🍭  🎀  𝓁𝒾𝓋𝑒 𝒞𝒽𝒶𝓉  🎀  🍭')
      .setDescription(`**${username}**`)
      .setTimestamp()

    channel.send({ embeds: [exampleEmbed] });
  })
}

client.login("TokenBOT")
/**
 * 
 * Chạy chương trình
 * 
 */

run()
