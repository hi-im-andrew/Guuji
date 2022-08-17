const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('peepoShy'),
    async execute(interaction) {
        await interaction.reply('ara ara');
    },
};