import { SlashCommandBuilder } from '@discordjs/builders';
import Command, { CommandParams } from '../../types/Command';

export default new class implements Command {
    name = 'ping'
    description ='Return websocket heartbeat and response time.';
    build(): SlashCommandBuilder {
        return new SlashCommandBuilder().setName(this.name).setDescription(this.description);
    };
    async execute({ interaction, bot }: CommandParams): Promise<void> {
        await interaction.reply(`**Websocket heartbeat:** ${bot.client.ws.ping}ms\n**Response time:** ${Date.now() - interaction.createdTimestamp}ms`);
    };
};