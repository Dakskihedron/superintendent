import { SlashCommandBuilder } from '@discordjs/builders';
import Command, { CommandParams } from '../../types/Command';

export default new class implements Command {
    name = 'coinflip'
    description ='Flip a coin and return heads or tails.';
    build(): SlashCommandBuilder {
        return new SlashCommandBuilder().setName(this.name).setDescription(this.description);
    };
    async execute({ interaction }: CommandParams): Promise<void> {
        const sides = ['Heads', 'Tails'];
        await interaction.reply(`${sides[Math.floor(Math.random() * sides.length)]}.`);
    };
};