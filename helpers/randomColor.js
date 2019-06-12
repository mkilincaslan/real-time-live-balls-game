const colors = ['blue', 'green', 'red', 'yellow', 'orange', 'pink', 'brown', 'aqua', 'gray', 'magenta'];

const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

module.exports = randomColor;