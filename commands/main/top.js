const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")
const {RichDisplay} = require("great-commando")
const table = require('markdown-table')
const { ConnectionStates } = require("mongoose")

module.exports = class top extends Command {
    constructor(client){
        super(client, {
            name: "top", 
            description: "Add a new leaderboard entry", 
            group: "main",
            memberName: "top", 
            args: [{
                type: "string", 
                prompt: "Which map?", 
                key: "map"
            }]
        })
    }

    async run(msg, {map}){

        const DB = await this.client.dbs.leaderboards.findOne({dbID: this.client.user.id })
        if(!DB) return msg.say(`Maps database missing`)

        const findMap = DB.maps.find(m => m.name.toLowerCase() === map.toLowerCase())
        if(!findMap)  return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`${map} isn't a valid map`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
            
            const LB = findMap.leaderboard.sort((a, b) => b.waves - a.waves).slice(0, 10)

        let formatted = [['Rank', 'Player', 'Waves']]

        LB.forEach(e => {
            formatted.push([`#${LB.indexOf(e) + 1}`, e.username, e.waves])
        })

        const T = table(
            formatted,
          )
            
        let embed = new MessageEmbed()
        .setTitle(`__${map.toUpperCase()}__`)
        .setDescription(`\`\`\`ml\n${T}\n\`\`\``)
        .setColor("RANDOM")
        
        msg.say(embed)
    }

}