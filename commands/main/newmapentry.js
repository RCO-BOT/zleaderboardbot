const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class newmapentry extends Command {
    constructor(client){
        super(client, {
            name: "newmapentry", 
            description: "Add a new leaderboard entry", 
            group: "main",
            memberName: "newmapentry",
            aliases: ["nme"], 
            ownerOnly: true,
            args: [{
                type: "string", 
                prompt: "Which map?", 
                key: "map",
            },{
                type: "string", 
                prompt: "Username?", 
                key: "username",
            },{
                type: "integer", 
                prompt: "Please enter the waves reached", 
                key: "waves",
                min: 1
            }]
            
        })
    }

    async run(msg, {map, username, waves}){

        const maps = await this.client.dbs.leaderboards.findOne({dbID: this.client.user.id })

        if(!maps){
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
        
            let mapToEdit = maps.maps.find(m => m.name.toLowerCase() === map.toLowerCase())
            if(!mapToEdit)  return msg.say(new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
                .setDescription(`${map} isn't a valid map`)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))

            let userExists = mapToEdit.leaderboard.find(u => u.username === username)
            if(userExists)   return msg.say(new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
                .setDescription(`There's already a record for ${username} in the ${map} map.`)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
            
            mapToEdit.leaderboard.push({
                    username, 
                    waves,
                })

            
            maps.markModified(`maps`)
            maps.save().catch(err => console.log(err))

              return msg.say(new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
                .setDescription(`__**User Added**__
                • Map: **${map}**
                • Username: **${username}**
                • Waves: **${waves}**`)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))


        }

    }

}
