import 'dotenv/config';
import fetch from 'node-fetch';
import { SlashCommandBuilder } from '@discordjs/builders';
import Command, { CommandParams } from '../../types/Command';

export default new class implements Command {
    name = 'apod'
    description ='Return the Astronomical Picture of the Day.';
    build(): SlashCommandBuilder {
        const builder = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
        builder.addStringOption(option => option.setName('date').setDescription('Date of APOD image to retrieve in the format yyyy-mm-dd.'));
        return builder;
    };
    async execute({ interaction }: CommandParams): Promise<void> {
        await interaction.deferReply();
        const date = interaction.options.getString('date') || '';
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${date}`)
            .then(response => (response.ok) ? response.json().then(data => data['url']) : response.json().then(data => data['msg']));
        await interaction.editReply(response);
    };
};