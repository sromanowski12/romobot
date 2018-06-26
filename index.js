const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const Webhook = require("webhook-discord");
const Hook = new Webhook("https://discordapp.com/api/webhooks/458735033948176385/WVJ9eOouH0Q-TmUUAO6zmui0wZBsnGsLFygK3QD3-rhpUKRQHEI4qX6jfY_Ke97k5yKO");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const responseObject = {
	"ayy": "Ayy, lmao!",
	"wat": "Say what?"
};
const helloResponses = ["Hello","Hi", "Hi there"];

client.on('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	var args2 = message.content.substring("!".length).split(" ");

    switch (args2[0].toLowerCase()) {
        case "hello":
            var response = helloResponses [Math.floor(Math.random()*helloResponses .length)];

            message.channel.send(response).then().catch(console.error);
            break;
        default:
            break;
    }
	if(message.isMentioned(client.user)){
			message.reply('Good work!');
			message.react('💸');
	}
	if(message.isMentioned("@sromanowski")){
		message.reply('Good work!');
		message.react('💸');
}
	if(responseObject[message.content]){
		message.channel.send(responseObject[message.content]);
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);

	}


	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

//	Hook.info("Example Webhook", "Warning");
//	Hook.success("Example Webhook", "Success!");
});
client.login(token);


