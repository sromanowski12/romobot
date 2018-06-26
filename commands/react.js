module.exports = {
	name: 'react',
	description: 'Display emojis.',
	execute(message) {
        message.react('😋');
        message.react('👌');
	},
};