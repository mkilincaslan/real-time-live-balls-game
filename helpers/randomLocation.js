const randomLocation = () => {
    return {
        x: Math.floor(Math.random() * 700),
        y: Math.floor(Math.random() * 400)
    };
};

module.exports = randomLocation;