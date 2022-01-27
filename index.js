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

const getRandomElement = (collection) => {
    return collection[Math.floor(Math.random()*collection.length)];
}

const performAction = (interaction) => {
    const user = getRandomElement(users);
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
        }, 86400000); // every 24 hours
	}

    if (commandName === 'uston') {
        interaction.reply('Edi wag.');
        clearInterval(interval);
	}
});

const randomReplies = [
    'Hindi kita kinakausap.',
    'Wag ako.',
    "Please lang I'm busy.",
    'Manahimik ka nagtatrabaho ako dito'
];

const model = [
    {
        intent: 'greeting',
        patterns: ['hi', 'hello', 'how are you', 'good morning', 'good day', "what's up", 'whats up', 'hey'],
        responses: {
            generic: ['Wag ako.', "Please lang I'm busy.", 'Manahimik ka nagtatrabaho ako dito.', 'hello', 'kumain ka na?']
        }
    },
    {
        intent: 'goodbye',
        patterns: ['bye', 'good bye', 'goodbye', 'balakajan'],
        responses: {
            generic: ['Inkan ukinam.', 'Just go omg']
        }
    },
    {
        intent: 'insult-looks',
        patterns: ['pangit', 'panget', 'kamuka mo', 'kamukha mo', 'muka mo', 'mukha mo', 'ganda ka'],
        responses: {
            generic: ['mas pangit ka', 'mukha kang libag', 'mukha kang pwet']
        }
    },
    {
        intent: 'insult-intelligence',
        patterns: ['bobo', 'tanga'],
        responses: {
            generic: ['hindi ka mahal ng mama mo', 'mas lalo ka']
        }
    },
    {
        intent: 'insult-generic',
        patterns: ['gago', 'tangina mo', 'tanginamo', 'animal', 'bastos', 'wala kang pake', 'wala kang paki', 'la kang pake', 'la kang paki', 'lakampake', 'lakangpaki', 'gagoh', 'gagoe', 'gagoeh'],
        responses: {
            generic: ['iyak ka?', 'hindi ka mahal ng mama mo', 'wala akong pake sayo', 'kaya walang nagmamahal sayo', 'kaya ka natatalo sa valo', 'and boring mo naman']
        }
    },
    {
        intent: 'question-identity',
        patterns: ['who are you', 'who you', 'who u', 'hu u'],
        responses: {
            generic: ['your mom.', 'wala kang pake.']
        }
    },
    {
        intent: 'question-generic',
        patterns: ['bakit', 'ano', 'anong', 'kailan', 'saan', 'bat', '?'],
        responses: {
            generic: ['hindi ko rin alam.', 'Tanong ng tanong imbis na magtrabaho. Kaya wala kang pera.', 'i Google mo.']
        }
    },
    {
        intent: 'negating',
        patterns: ['hindi', 'no', 'nope', 'di'],
        responses: {
            generic: ['Wag ako.', 'Edi wag.', 'pangit kabonding']
        }
    },
    {
        intent: 'agreeing',
        patterns: ['oo', 'yes', 'yis', 'yup', 'yeah'],
        responses: {
            generic: ['Edi waw.', 'Beri gud.']
        }
    },
    {
        intent: 'geh',
        patterns: ['geh'],
        responses: {
            generic: ['periodt']
        }
    }
];

client.on('messageCreate', (message) => {
    if (message.author.bot) return false;

    if (message.mentions.has(client.user.id)) {
        let found;

        model.forEach(modelItem => {
            modelItem.patterns.forEach(pattern => {
                if (message.content.toLowerCase().includes(pattern.toLowerCase())) {
                    found = modelItem;
                }
            });
        });

        if (found) {
            message.reply(getRandomElement(found.responses.generic));
        } else {
            message.reply(getRandomElement(randomReplies));
        }
    } else {
        return false;
    }
});

client.login(process.env.CLIENT_TOKEN).catch(error => {
    console.log(error);
    process.exit();
});
