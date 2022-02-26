import moment from 'moment';
import { SlashCommandBuilder } from '@discordjs/builders';
import Command, { CommandParams } from '../../types/Command';

export default new class implements Command {
    name = 'userinfo';
    description = 'Return information about yourself or a user.';
    build(): SlashCommandBuilder {
        const builder = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
        builder.addUserOption(option => option.setName('user').setDescription('Return information about a user.'));
        return builder;
    };
    async execute({ interaction, bot }: CommandParams): Promise<void> {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = bot.client.guilds.cache.get(interaction.guildId as string)!.members.cache.get(user.id);
        const memberRoles = member!.roles.cache.size === 1 ? 'User has no roles.' : member!.roles.cache.filter(roles => roles.id !== interaction.guildId).map(role => role.toString());
        const embed = {
            color: (await user.fetch(true)).hexAccentColor || 0x5865F2,
            title: member?.displayName,
            thumbnail: {
                url: user.displayAvatarURL({ dynamic: true, size: 1024 })
            },
            fields: [
                {
                    name: '**User Information**',
                    value: `
                        Username: ${user.tag}
                        ID: ${user.id}
                        Created: ${moment(user.createdAt).format('ddd, D MMM YYYY @ HH:mm:ss [GMT]ZZ')}
                        `,
                    inline: false
                },
                {
                    name: '**Member Information**',
                    value: `
                        Joined: ${moment(member?.joinedAt).format('ddd, D MMM YYYY @ HH:mm:ss [GMT]ZZ')}
                        Roles: ${memberRoles}
                        `,
                    inline: false
                }
            ]
        }
        await interaction.reply({ embeds: [embed] });
    };
};