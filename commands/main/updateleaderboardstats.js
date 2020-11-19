const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")

module.exports = class updateplayerleaderboard extends Command {
    constructor(client){
        super(client, {
            name: "updateplayerleaderboard", 
            description: "Update a players leaderboard stats", 
            group: "main",
            memberName: "updateplayerleaderboard",
            aliases: ["upl"],
            ownerOnly: true,
            args: [{
                type: "string", 
                prompt: "Which username?", 
                key: "username"
            },{
                type: "string", 
                prompt: "Which field are you changing?", 
                key: "field",
                oneOf: ["kills", 'level']
            },{
                type: "integer", 
                prompt: "What's the new value?", 
                key: "newValue", 
                min: 1
            }]
            
        })
    }

    async run(msg, {username, field, newValue}){

        const DB = await this.client.dbs.leaderboards.findOne({dbID: this.client.user.id })

        if(!DB) return msg.say(`You need to add a user to the database first`)

        let personToEdit = DB.leaderboard.find(u => u.username === username)
        if(!personToEdit)   return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`No leaderboard record for ${username}`)
            .setColor("RED")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))

        
        let fieldToEdit = personToEdit[field]
        if(!fieldToEdit)  return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`${field} isn't a valid field to edit`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))

        personToEdit[field] = newValue

        DB.markModified('leaderboard')
        DB.save().catch(err => console.log(err))

          return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`Stats for ${username} have been changed`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))

    }

}