import { SlashCommandBuilder } from '@discordjs/builders';
import Command, { CommandParams } from '../../types/Command';

export default new class implements Command {
    name = 'dice'
    description ='Return a random number between one and the specified number.';
    build(): SlashCommandBuilder {
        const builder = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
        builder.addIntegerOption(option => option.setName('number').setDescription('Highest number possible.').setRequired(true));
        return builder
    };
    async execute({ interaction }: CommandParams): Promise<void> {
        const number = interaction.options.getInteger('number');
        if (number! < 1) return await interaction.reply({ content: 'Number cannot be less than 1.', ephemeral: true });
        await interaction.reply(`${Math.floor(Math.random() * (Math.floor(number!) - Math.ceil(1) + 1) + 1)}`);
    };
};