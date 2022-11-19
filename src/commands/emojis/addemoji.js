const { SlashCommandBuilder } = require('discord.js');
const isImageURL = require('image-url-validator').default;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addemoji')
        .setDescription("Add an emoji to the server.")
        .addSubcommand(subcommand =>
            subcommand.setName('link')
                .setDescription('Upload an emoji to the server using an image URL.')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('Provide a name for the emoji.')
                        .setMinLength(2)
                        .setMaxLength(32)
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('url')
                        .setDescription('image URL')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('attach')
                .setDescription('Upload an emoji to the server using an attached image.')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('Provide a name for the emoji.')
                        .setMinLength(2)
                        .setMaxLength(32)
                        .setRequired(true)
                )
                .addAttachmentOption(option =>
                    option.setName('attachment')
                        .setDescription('PNG, JPG, or GIF')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('emoji')
                .setDescription('Upload an existing emoji to the server.')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('Provide a name for the emoji.')
                        .setMinLength(2)
                        .setMaxLength(32)
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('emoji')
                        .setDescription('external emoji')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        if (interaction.options.getSubcommand() === 'link') {
            const URL = interaction.options.getString('url');

            if (await isImageURL(URL)) {
                interaction.guild.emojis.create({ attachment: URL, name: name })
                .then(emoji => console.log(`Created new emoji in ${interaction.guild.name} with name ${emoji.name}.`))
                .catch(console.error);
                await interaction.reply({
                    content: `Created new emoji with name ${name}.`
                })
            }
            else {
                console.log(`Failed to upload emoji with name ${name}.`);
                await interaction.reply({
                    content: `Failed to upload emoji with name ${name}.`,
                    ephemeral: true
                });
            };
        }

        else if (interaction.options.getSubcommand() === 'attach') {
            await interaction.reply('Coming soon!');
        }

        else if (interaction.options.getSubcommand() === 'emoji') {
            await interaction.reply('Coming soon!');
        }
    }
}