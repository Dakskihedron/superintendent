import { SlashCommandBuilder } from '@discordjs/builders';
import Command, { CommandParams } from '../../types/Command';

export default new class implements Command {
    name = 'avatar';
    description ='Return your or a user\'s avatar.';
    build(): SlashCommandBuilder {
        const builder = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
        builder.addUserOption(option => option.setName('user').setDescription('Return a user\'s avatar.'));
        return builder;
    };
    async execute({ interaction }: CommandParams): Promise<void> {
        const user = interaction.options.getUser('user') || interaction.user;
        await interaction.reply(user.displayAvatarURL({ dynamic: true, size: 1024 }));
    };
};