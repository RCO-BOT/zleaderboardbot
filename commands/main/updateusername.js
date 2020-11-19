const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")

module.exports = class updateusername extends Command {
    constructor(client){
        super(client, {
            name: "updateusername", 
            description: "Add a new leaderboard entry", 
            group: "main",
            memberName: "updateusername",
            aliases: ["uu"],
            ownerOnly: true,
            args: [{
                type: "string", 
                prompt: "Which user?", 
                key: "oldUsername",
            },{
                type: "string", 
                prompt: "Which username?", 
                key: "newUsername"
            }]
            
        })
    }

    async run(msg, {oldUsername, newUsername}){

        const DB = await this.client.dbs.leaderboards.findOne({dbID: this.client.user.id })

        if(!DB) return msg.say(`You need to add a user to the database first`)

        let DBMAPS = DB.maps.filter(c => c.leaderboard.filter(c => c.username === oldUsername).length !== 0);
        let DBLB = DB.leaderboard.filter(u => u.username === oldUsername)
        if(DBMAPS.length === 0 && DBLB.length === 0) return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`Can not find ${oldUsername} in the database`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
        if(DBLB.length !== 0) DBLB[0].username = newUsername
        console.log(DBLB)
        for (const maps of DBMAPS){
          for (const db of maps.leaderboard){
            if(db.username === oldUsername){
              db.username = newUsername
            }
          }
        };

        DB.markModified("maps");
        DB.markModified('leaderboard')
        DB.save().catch(() => null);

        console.log(DBLB)
          return msg.say(new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`All instances of ${oldUsername} have been changed to ${newUsername}`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
        
    }
}