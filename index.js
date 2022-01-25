require('dotenv').config();

// Necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

/*----------------------------- COMMANDS START ------------------------------*/
const commands = [
	new SlashCommandBuilder().setName('pepe').setDescription('Wreaks havoc.'),
    new SlashCommandBuilder().setName('uston').setDescription('Stops havoc.')
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);

rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

let interval;

const users = [
    {
        id: '638708207434334219',
        name: 'Justin'
    },
    {
        id: '693467860151828509',
        name: 'Nil'
    }
    ,
    {
        id: '654298520265818113',
        name: 'Hazel'
    }
    ,
    {
        id: '654156387680780309',
        name: 'Rose'
    }
    ,
    {
        id: '747982781564452885',
        name: 'Aposie'
    }
];
/*----------------------------- COMMANDS END ------------------------------*/

const performAction = (interaction) => {
    const user = users[Math.floor(Math.random()*users.length)];
    interaction.channel.send(`<@${user.id}> Tanginamo ${user.name}`);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'pepe') {
        interaction.reply('Edi waw.');

        if (interval) {
            clearInterval(interval);
        }
        
        performAction(interaction);
        interval = setInterval (function () {
            performAction(interaction);
        }, 3600000); // every 1 hour
	}

    if (commandName === 'uston') {
        interaction.reply('Edi wag.');
        clearInterval(interval);
	}
});

const randomReplies = [
    'Hindi kita kinakausap.',
    'Mama mo pango.',
    'Wag ako.',
    "Please lang I'm busy.",
    'Manahimik ka nagtatrabaho ako dito'
];

const getRandomReply = () => {
    return randomReplies[Math.floor(Math.random()*randomReplies.length)];
}

const replyRandom = (message) => {
    message.reply(getRandomReply());
}

client.on('messageCreate', (message) => {
    if (message.author.bot) return false;

    if (message.mentions.has(client.user.id)) {
        replyRandom(message);
    }
});

client.login(process.env.CLIENT_TOKEN);