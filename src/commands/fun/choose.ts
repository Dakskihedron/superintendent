import { SlashCommandBuilder } from '@discordjs/builders';
import Command, { CommandParams } from '../../types/Command';

export default new class implements Command {
    name = 'choose'
    description ='Randomly pick from a list of choices.';
    build(): SlashCommandBuilder {
        const builder = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
        builder.addStringOption(option => option.setName('choices').setDescription('List of choices to choose from.').setRequired(true));
        return builder
    };
    async execute({ interaction }: CommandParams): Promise<void> {
        const choices = interaction.options.getString('choices')!.split(',');
        await interaction.reply(choices[Math.floor(Math.random() * choices.length)])
    };
};