const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")

module.exports = class help extends Command {
    constructor(client){
        super(client, {
            name: "help", 
            description: "View info on all commands", 
            group: "main",
            memberName: "help",
          })
    }

    async run(msg){

        let prefix = this.client.commandPrefix

        let embed = new MessageEmbed()
        .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
        .setTitle('KEY: ⋆ = command | ■ = description | ▸ = alias')
        .setDescription(stripIndents`
        ======__For everyone__======
        ⋆ ${prefix}leaderboard maps
        ■ View all map leaderboards
        ▸ [lb maps]

        ⋆ ${prefix}top [map name]
        ■ View the leaderboard for a specific map

        ⋆ ${prefix}leaderboard players
        ■ View players leaderboard
        ▸ [lb players]

        
        ======__For Admins Only__======
        ⋆ ${prefix}newmapentry [map name] [username] [waves]
        ■ Add a new user to a map leaderboard
        ▸ [nme]

        ⋆ ${prefix}newplayerentry [username] [level] [kills]
        ■ Add a new user to the player leaderboard
        ▸ [npe]
        
        ⋆ ${prefix}updatemapplayer [map] [username] [new value]
        ■ Edit map leaderboard stats for a specific user
        ▸ [ump]

        ⋆ ${prefix} updateplayerleaderboard [username] [field] [new value]
        ■ Edit player leaderboard stats for a specific user
        ▸ [upl]

        ⋆ ${prefix}updateusername [old username] [new username]
        ■ Update a user's username across all leaderboard
        ▸ [uu]

        ⋆ ${prefix}deletemapentry [map] [username]
        ■ Delete a user from a map's leaderboard
        ▸ [dme]

        ⋆ ${prefix}deleteplayerentry [username]
        ■ Delete a user from the players leaderboard
        ▸ [dpe]
        
        ⋆ ${prefix}resetleaderboard [all/map name/playerleaderboard]
        ■ Reset a specific map leaderboard or clear all map leaderboards
        ▸ [rl]
        **WARNING** - This is __**irreversible**__!!!`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))

        msg.say(embed).catch(err => console.log(err))

    }

}