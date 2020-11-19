const { CommandoClient } = require("discord.js-commando"), 
      { join } = require("path"), 
      { config } = require("dotenv"), 
      { MessageEmbed, WebhookClient, MessageAttachment } = require("discord.js"),
        mongoose = require("mongoose"),
        canvacord = require("canvacord"),

client = new CommandoClient({
    commandPrefix: '.',
    owner: [
        '248947473161256972', //VAL
        '248454903058530305', //Evka
        '391326742574268417', //Quantum-Spore
        '622258974040784896', //Bebay
        '476460377996132362',//Porschechic
    ],
    invite: '', 
    messageCacheLifetime: 60, 
    messageCacheMaxSize: 30, 
    fetchAllMembers: false, 
    restTimeOffset: 0,
    messageSweepInterval: 60,
    http: {
        host: 'https://discord.com'
    },
    ws: {
        intents: [
            "GUILD_MESSAGES",
            "GUILDS",
            "DIRECT_MESSAGES",
            "DIRECT_MESSAGE_REACTIONS",
            "GUILD_MESSAGE_REACTIONS"
        ],
        properties: { $browser: "Discord Android" }
    }
})

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['main', 'Main'],
        ['misc', 'Misc']

    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        unknownCommand: false,
        help: false,
        eval: true,
    })
.registerCommandsIn(join(__dirname, 'commands'))

config({
    path: __dirname + "/.env"
});

mongoose.connect(process.env.MONGODB, {
    keepAlive: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(() => console.log(`Mongodb | (Connected)`))
.catch((err) => {
    console.log(`Mongodb | (Error)\n`, err.stack);
})


client.dbs = {
    leaderboards: require("./database/models/leaderboards")
}

global.servers = {}



client.once('ready', async () => {

    console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
    client.user.setPresence({
        activity: {
            name: `${client.commandPrefix}help`,
            type: "WATCHING"
        }
        })
    setInterval(() => {
        client.user.setPresence({
            activity: {
                name: `${client.commandPrefix}help`,
                type: "WATCHING"
            }
            })
    }, 60000)

});

const webhooks = {
    errors: process.env.WEBHOOKURL,
}
const webhook = async(url, embed) => {

    if (!embed || embed === null || embed === undefined) return `[Webhook Function] - Error, you need to provide content or an embed!`
    let link = await url.replace('https://discord.com/api/webhooks/', '').split("/");
    let hook = new WebhookClient(link[0], link[1]);
    return hook.send(embed).catch(() => {});
};

    client.dispatcher.addInhibitor(msg => {
        if (msg.command && msg.command.name === "eval" && msg.author.id !== "248947473161256972") {
                  return "null"
              }
          })

//Error logging

client.on("commandError", (cmd, error, msg, args, fromPatter, result) => {
            console.log(`${cmd.name} - (Error)`, error.stack)
    let embed = new MessageEmbed()
    .setAuthor(`${msg.guild ? `Server: ${msg.guild.name} (${msg.guild.id})` : `DM: @${msg.author.tag} (${msg.author.id})`}`, msg.guild ? msg.guild.iconURL({dynamic: true}) : msg.author.displayAvatarURL({dynamic: true}))
    .setTitle(`Command "${msg.command.name}"  **Error**`)
    .setFooter(`Reported At`)
    .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
    .setTimestamp()
    .setColor(`#FF8300`)
  msg.guild ? embed.addField(`Server`, `${msg.guild.name} (${msg.guild.id})`) : embed.addField(`DM`, `@${msg.author.tag} (${msg.author.id})`)
  msg.channel.type === "text" ? embed.addField(`Channel`, `${msg.channel.name} (${msg.channel.id})`) : null
  embed.addField(`User`, `${msg.author} \`@${msg.author.tag}\` (${msg.author.id})`)
  webhook(webhooks.errors, embed)
});

client.on(`error`, (err) => {
  if (err === undefined || err === "undefined") return null;
  if(!err) return null;
  if(!err.stack) return null;
  if(err.stack === "undefined") return null;
  webhook(webhooks.errors,
    new MessageEmbed()
      .setTitle(`Discord Error`)
      .setDescription(`\`\`\`js\n${err.stack}\`\`\``)
      .setColor(`#FAFF00`)
      .setTimestamp()
      .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic: true}))
  )
});

process.on('unhandledRejection', error => {
        let ignoreErrors = [
            `DiscordAPIError: Unknown Message`,
            `DiscordAPIError: Missing Permissions`,
            `DiscordAPIError: Missing Access`,
            `DiscordAPIError: Unknown Channel`,
            `DiscordAPIError: Cannot send messages to this user`
        ], there = [];
        for (const ignore of ignoreErrors){
            if(error.stack.includes(ignore)) there.push(true);
        };
        if(there.length !== 0) return null;
      console.log(`UnhandledRejection: \n${error.stack}`);
  webhook(webhooks.errors,
    new MessageEmbed()
      .setColor(`#FF0000`)
      .setTimestamp()
      .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
      .setTitle(`Unhandled Rejection`)
      .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic: true}))
  )
}).on('uncaughtException', error => {
  console.log(`UncaughtException: \n${error.stack}`);
  webhook(webhooks.errors,
    new MessageEmbed()
      .setColor(`#FF0000`)
      .setTimestamp()
      .setFooter(`The process will be ending in 2s due to this.`)
      .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
      .setTitle(`Uncaught Exception`)
      .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic: true}))
  );
  setTimeout(() => process.exit(1), 2000);
});




client.login(process.env.TOKEN).catch(err => {
    console.log(`Client Login Error\n`, err.stack)
})