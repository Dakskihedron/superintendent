import { SlashCommandBuilder } from '@discordjs/builders';
import { ColorResolvable } from 'discord.js';
import Command, { CommandParams } from '../../types/Command';

export default new class implements Command {
    name = 'role'
    description ='Change role name or colour.';
    build(): SlashCommandBuilder {
        const builder = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
        builder.addSubcommand(subcommand =>
            subcommand
                .setName('name')
                .setDescription('Change role name.')
                .addStringOption(option => option.setName('name').setDescription('Name to change to.').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('colour')
                .setDescription('Change role colour.')
                .addStringOption(option => option.setName('hex').setDescription('Hex value of colour to change to.').setRequired(true)));
        return builder;
    };
    async execute({ interaction, bot }: CommandParams): Promise<void> {
        const member = bot.client.guilds.cache.get(interaction.guildId as string)!.members.cache.get(interaction.user.id);
        if (member!.roles.cache.size === 1) return await interaction.reply({ content: 'You have no valid roles.', ephemeral: true });

        if (interaction.options.getSubcommand() === 'name') {
            const newName = interaction.options.getString('name');
            const oldName = member!.roles.highest.name;
            member!.roles.highest.setName(newName!);
            await interaction.reply(`Role name was changed from \`${oldName}\` => \`${newName}\`.`);
        } else if (interaction.options.getSubcommand() === 'colour') {
            const newColour = interaction.options.getString('hex');
            const oldColour = member!.roles.highest.hexColor;
            member!.roles.highest.setColor(newColour as ColorResolvable);
            await interaction.reply(`Role colour was changed from \`${oldColour}\` => \`${newColour}\`.`);
        };
    };
};