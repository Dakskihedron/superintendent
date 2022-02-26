import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { Superintendent } from '../classes/Client';

export interface CommandParams {
    interaction: CommandInteraction;
    bot: Superintendent;
}

export default interface Command {
    name: string;
    description?: string;
    build(): SlashCommandBuilder;
    execute({ interaction, bot }: CommandParams): Promise<unknown> | unknown;
}