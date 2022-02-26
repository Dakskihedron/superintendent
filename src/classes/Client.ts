import 'dotenv/config';
import { Client, Collection, Intents, Interaction } from 'discord.js';
import { REST } from '@discordjs/rest';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v10';
import Command from '../types/Command';
import commandList from '../commands';

export class Superintendent {
    client: Client<true>;
    commands: Collection<string, Command> = new Collection();

    constructor() {
        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
        this.start();
    };

    async start(): Promise<void> {
        this.client.once('ready', () => {
            console.log(`Logged in as ${this.client.user.tag} on ${this.client.guilds.cache.size} servers.`);
            this.registerCommands();
        });
        this.client.on('interactionCreate', int => this.onInteractionCreate(int));
        this.client.login(process.env.DISCORD_TOKEN);
    };

    async registerCommands(): Promise<void> {
        const deployList: RESTPostAPIApplicationCommandsJSONBody[] = [];
        commandList.map(command => {
            this.commands.set(command.name, command);
            deployList.push(command.build().toJSON() as RESTPostAPIApplicationCommandsJSONBody);
        });
        this.deployCommands(deployList);
    };

    async deployCommands(body: any[]): Promise<void> {
        const guilds = this.client.guilds.cache;
        const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN as string);
        for (const [id] of guilds) {
            const guild = await guilds.get(id)?.fetch();
            if (!guild) continue;
            rest.put(Routes.applicationGuildCommands(this.client.user.id, id), { body })
            .then(() => console.log(`Successfully registered and deployed commands to ${guild.name}.`))
            .catch(console.error);
        };
    };

    async onInteractionCreate(interaction: Interaction): Promise<void> {
        if (!interaction.isCommand()) return;

        const command = this.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute({ interaction, bot: this});
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error when executing this command!', ephemeral: true });
        }
    }
};