const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('do it'),
    async execute(interaction) {
        await interaction.reply('ara ara.');
        console.log('Pong!');
    },
};