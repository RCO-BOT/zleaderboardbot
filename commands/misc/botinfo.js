const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")

const moment = require("moment")
require("moment-duration-format")
const CPU = require('cpu-stat')

module.exports = class botinfo extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            description: 'View bot info and stats',
            group: 'misc',
            memberName: 'botinfo',
            aliases: ['bi']
        })
    }

    async run(msg) {

        let pl = { "win32": "Windows", "linux": "Linux", "darwin": "Darwin", "undefined": "Unknown" }
        const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        msg.say(new MessageEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
            .setDescription(stripIndents`Created by <@248947473161256972>
            Built using **Discord.js** & **Discord.js-commando**
            
            **__System Info__**
            **CPU: **${CPU.totalCores()} Cores ${CPU.avgClockMHz()}MHz
            **Memory Used: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
            **Operating System: **${pl[process.platform]}
            **Uptime** ${duration}
            **Bot Created On** ${moment(this.client.user.createdAt).format(`MMMM Do YYYY, h:mm:ss a`)} (**${moment(this.client.user.createdAt, "MMMM Do YYYY, h:mm:ss a").fromNow()}**)
            **Default prefix**: \`${this.client.commandPrefix}\` or \`@${this.client.user.username}\``)
            .setThumbnail(this.client.user.displayAvatarURL({dynamic: true}))
            .setColor("#FF0000")
            .setTimestamp()).catch(err => { })

    }
}