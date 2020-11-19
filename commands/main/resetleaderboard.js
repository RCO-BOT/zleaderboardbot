const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")

module.exports = class resetleaderboard extends Command {
    constructor(client){
        super(client, {
            name: "resetleaderboard", 
            description: "Reset leaderboards", 
            group: "main",
            memberName: "resetleaderboard",
            aliases: ["rl"],
            ownerOnly: true,
            args: [{
                type: "string", 
                prompt: "Which leaderboard? [\`map name\`, \`playerleaderboard\` or \`all\` to reset all leaderboards]", 
                key: "map",
            }, {
                type: "string", 
                prompt: "Are you sure?? This is irreversible! [Yes/No]",
                key: "answer", 
                oneOf: ["yes", "no"]
            }]
            
        })
    }

    async run(msg, {map, answer}){

        if(answer.toLowerCase() === "no") return msg.say(`Ok, Nothing has been deleted!`) 

        if(answer.toLowerCase() === "yes"){

        const DB = await this.client.dbs.leaderboards.findOne({dbID: this.client.user.id })
        if(!DB) return msg.say(`You need to add a user to the database first`)

        if(map.toLowerCase() === 'all'){
            DB.leaderboard = []
            DB.maps.forEach(m => {
                m.leaderboard = []
            })
               msg.say(new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
                .setDescription(`All map leaderboards have been reset!`)
                .setColor("GREEN")
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
        }else if(map.toLowerCase === "playerleaderboard"){
            DB.leaderboard = []
            msg.say(new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
                .setDescription(`Player leaderboard has been reset`)
                .setColor("GREEN")
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
        }else{
            let findMap = DB.maps.find(m => m.name.toLowerCase() === map.toLowerCase())
            if(!findMap)   return msg.say(new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
                .setDescription(`${map} isn't a valid map`)
                .setColor("RED")
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
            findMap.leaderboard = []

               msg.say(new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
                .setDescription(`Leaderboard for ${findMap.name} has been reset!`)
                .setColor("GREEN")
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
        }

        DB.markModified("maps");
        DB.markModified("leaderboard");
        DB.save().catch(err => console.log(err));
    }

    }
}