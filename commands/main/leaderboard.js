const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")
const {RichDisplay} = require("great-commando")
const table = require('markdown-table')

module.exports = class leaderboard extends Command {
    constructor(client){
        super(client, {
            name: "leaderboard", 
            description: "", 
            group: "main",
            memberName: "leaderboard", 
            aliases: ["lb"],
            args: [{
                type: "string", 
                prompt: "Which leaderboard? maps or players", 
                key: "type", 
                oneOf: ["maps", "players"]
            }]
        })
    }

    async run(msg, {type}){

        let DB = await this.client.dbs.leaderboards.findOne({dbID: this.client.user.id})
        if(!DB) return msg.say(`DB missing`)
        const menu = new RichDisplay(new MessageEmbed())

        if(type.toLowerCase() === 'players'){
            let tempArray = []
            let LB = DB.leaderboard.sort((a, b) => b.level - a.level)
            LB.forEach(i => tempArray.push(i))

            const chunking = (array, chunkSize) => {
                let R = [];
                for (let i = 0; i < array.length; i += chunkSize)
                  R.push(array.slice(i, i + chunkSize));
                return R;
            };
            let chunks = chunking(DB.leaderboard, 10);

            chunks.forEach(c => {
                let formatted = [['Rank', 'Player', 'Level', 'Kills']]
                c.forEach(e => {
                    tempArray.push(e)
                    formatted.push([`#${tempArray.indexOf(e) + 1}`, e.username, e.level, e.kills])
                })
                const T = table(formatted)
                menu.addPage(e => e.setDescription(`\`\`\`\n${T}\n\`\`\``)
                .setColor("RANDOM")
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))})
                
                if(tempArray.length < 1)   return msg.say(new MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
                    .setDescription(`All player leaderboards are empty`)
                    .setColor("RANDOM")
                    .setTimestamp()
                    .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))

                menu.run(msg, {filter: (r, user) => user.id === msg.author.id});
        }else{
            const menu = new RichDisplay(new MessageEmbed())

            DB.maps.forEach(map => {
     
             const LB = map.leaderboard.sort((a, b) => b.waves - a.waves).slice(0, 10)
             let formatted = [['Rank', 'Player', 'Waves']]
             LB.forEach(e => {
                 formatted.push([`#${LB.indexOf(e) + 1}`, e.username, e.waves])
             })
             const T = table(formatted)
     
             menu.addPage(e => e.setDescription(`\`\`\`\n${T}\n\`\`\``).setTitle(`__**${map.name.toUpperCase()}**__`).setThumbnail(map.img).setColor("RANDOM").setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true})).setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
            })
     
     
             menu.run(msg, {filter: (r, user) => user.id === msg.author.id});
        }
       
    }

}