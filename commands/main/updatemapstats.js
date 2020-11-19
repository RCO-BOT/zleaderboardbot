const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")

module.exports = class updatemapstats extends Command {
    constructor(client){
        super(client, {
            name: "updatemapplayer", 
            description: "Update a players map stats", 
            group: "main",
            memberName: "updatemapplayer",
            aliases: ["ump"],
            ownerOnly: true,
            args: [{
                type: "string", 
                prompt: "Which map?", 
                key: "map",
            },{
                type: "string", 
                prompt: "Which username?", 
                key: "username"
            },{
                type: "integer", 
                prompt: "Whats their new wave count?", 
                key: "newValue",
                min: 1
            }]
            
        })
    }

    async run(msg, {map, username, newValue}){

        const DB = await this.client.dbs.leaderboards.findOne({dbID: this.client.user.id })

        if(!DB) return msg.say(`You need to add a user to the database first`)

        let mapToEdit = DB.maps.find(m => m.name.toLowerCase() === map.toLowerCase())
        if(!mapToEdit)   return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`Can not find ${map} in the database`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))

        let personToEdit = mapToEdit.leaderboard.find(u => u.username === username)
        if(!personToEdit)   return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`Can not find ${username} in the database`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))

        personToEdit.waves = newValue

        DB.markModified('maps')
        DB.save().catch(err => console.log(err))

          return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`${username}'s stats for ${map} have been updated!  `)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))


    }

}