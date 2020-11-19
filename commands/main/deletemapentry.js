const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")

module.exports = class deletemapentry extends Command {
    constructor(client){
        super(client, {
            name: "deletemapentry", 
            description: "Delete an entry from a map", 
            group: "main",
            memberName: "deletemapentry",
            aliases: ["dme"],
            ownerOnly: true,
            args: [{
                type: "string", 
                prompt: "Which map?", 
                key: "map",
            },{
                type: "string", 
                prompt: "Which username?", 
                key: "username"
            }]
            
        })
    }

    async run(msg, {map, username}){

        const DB = await this.client.dbs.leaderboards.findOne({dbID: this.client.user.id })
        if(!DB) return msg.say(`You need to add a user to the database first`)

        let findMap = DB.maps.find(m => m.name.toLowerCase() === map.toLowerCase())
        if(!findMap)   return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`${map} isn't a valid map`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
            
        let findPlayer = findMap.leaderboard.find(u => u.username === username)
        if(!findPlayer)  return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`No entry for ${username} in ${map}`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
        

            findMap.leaderboard = findMap.leaderboard.filter(p => p !== findPlayer)

        DB.markModified('maps')
        DB.save().catch(err => console.log(err))
        
          return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`Stats for ${username} in ${map} have been deleted`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
    }
}