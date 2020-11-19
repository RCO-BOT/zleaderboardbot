const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class newstatsentry extends Command {
    constructor(client){
        super(client, {
            name: "newplayerentry", 
            description: "Add a new leaderboard entry", 
            group: "main",
            memberName: "newplayerentry",
            aliases: ["npe"],
            ownerOnly: true, 
            args: [{
                type: "string", 
                prompt: "What's their username?", 
                key: "username",
            },{
                type: "integer", 
                prompt: "What's their current level?", 
                key: "level",
                min: 1
            },{
                type: "integer", 
                prompt: "What's their current kills?", 
                key: "kills", 
                min: 1
            }]
            
        })
    }

    async run(msg, {username, level, kills}){

        const DB = await this.client.dbs.leaderboards.findOne({dbID: this.client.user.id })

        if(!DB){
            new this.client.dbs.leaderboards({
                dbID: this.client.user.id, 
                leaderboard: [],
                maps: [{
                    name: "bio-lab",
                    leaderboard: [],
                    img: ""
                
                },
                
                {
                    name: "candyland",
                    leaderboard: [],
                    img: ""
                
                },
                
                {
                    name: "castle",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/1/1f/Castle.png/revision/latest?cb=20180513181234"
                },

                {
                    name: "catacombs",
                    leaderboard: [],
                    img: ""
                
                },
                
                {
                    name: "cave",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/4/46/Cave.png/revision/latest?cb=20180513181235"
                
                },

                {
                    name: "cemetery",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/4/46/Cave.png/revision/latest?cb=20180513181235"
                
                },
                
                {
                    name: "corrosion",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/1/16/Corrosion.png/revision/latest?cb=20180513181345"
                },
                
                {
                    name: "depot",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/f/ff/Depot.png/revision/latest?cb=20180513181346"
                },
                
                {
                    name: "facility",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/8/8a/Facility.png/revision/latest?cb=20180513181344"
                },
                
                {
                    name: "farm",
                    leaderboard: [],
                    img: ""
                },
                
                {
                    name: "forest",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/c/c1/Forest.png/revision/latest?cb=20180513181349"
                },

                {
                    name: "forest-2",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/c/c1/Forest.png/revision/latest?cb=20180513181349"
                },

                {
                    name: "galactic-prison",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/d/d5/Graveyard.png/revision/latest?cb=20180513181348"
                },
                
                {
                    name: "graveyard-old",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/d/d5/Graveyard.png/revision/latest?cb=20180513181348"
                },
                
                {
                    name: "hospital",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/6/66/Hospital.png/revision/latest?cb=20180513181350"
                },

                {
                    name: "liandri",
                    leaderboard: [],
                    img: ""
                },
                
                {
                    name: "mars-habitat",
                    leaderboard: [],
                    img: ""
                },

                {
                    name: "morpheus",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/c/c6/Morpheus.png/revision/latest?cb=20180513181347"
                },

                {
                    name: "snow-lodge",
                    leaderboard: [],
                    img: ""
                
                },
                
                {
                    name: "space-nox",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/a/ad/Space_Noxx.png/revision/latest?cb=20180513181047"
                },
                
                {
                    name: "space-ship",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/3/31/Space_Ship.png/revision/latest?cb=20180513181047"
                },

                {
                    name: "spacestation-2",
                    leaderboard: [],
                    img: ""
                },
                
                {
                    name: "volcano-lab",
                    leaderboard: [],
                    img: "https://vignette.wikia.nocookie.net/zombie-rush/images/7/74/Volcano_Lab.png/revision/latest?cb=20180513181046"
                }]
            }).save().catch(err => console.log(err))
            return msg.say(`Database created - Please run that command again`)
        }else{
        
            let exists = DB.leaderboard.find(u => u.username === username)
            if(exists) return msg.say(new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
                .setDescription(`Stats for ${username} already exists in the database. Please use \`${this.client.commandPrefix}updateleaderboardstats\` to update stats for this user!`)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))

            DB.leaderboard.push({
                username,
                level, 
                kills
            })
            
            DB.markModified(`maps`)
            DB.save().catch(err => console.log(err))

              return msg.say(new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
                .setDescription(`__**Stats for ${username} Added**__
                • Level: **${level}**
                • Kills: **${kills}**`)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))


        }

    }

}
