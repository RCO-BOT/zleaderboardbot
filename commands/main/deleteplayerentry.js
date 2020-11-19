const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")

module.exports = class deleteplayerentry extends Command {
    constructor(client){
        super(client, {
            name: "deleteplayerentry", 
            description: "Delete an entry from the player leaderboard", 
            group: "main",
            memberName: "deleteplayerentry",
            aliases: ["dpe"],
            ownerOnly: true,
            args: [{
                type: "string", 
                prompt: "Which username?", 
                key: "username"
            }]
            
        })
    }

    async run(msg, {username}){

        const DB = await this.client.dbs.leaderboards.findOne({dbID: this.client.user.id })
        if(!DB) return msg.say(`You need to add a user to the database first`)
            
        let findPlayer = DB.leaderboard.find(u => u.username === username)
        if(!findPlayer)  return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`No leaderboard entry for ${username}`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
        
        DB.leaderboard = DB.leaderboard.filter(u => u !== findPlayer)

        DB.markModified('leaderboards')
        DB.save().catch(err => console.log(err))
        
          return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`${username} has been deleted from the players leaderboard`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
    }
}