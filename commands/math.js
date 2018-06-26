id = "demo";
var array = [1, 5, 3, 7, 9];

var even = function(element){
    return element % 2 === 0;
};

// console.log(array.some(even));

module.exports = {
	name: 'math',
	description: 'Display math info.',
	execute(message) {
        message.channel.send("The numbers are: " + array+ "\nAny element even?: " + array.some(even));
	},
};