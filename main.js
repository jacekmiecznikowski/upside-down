var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

game.global = {
    levelRows: 2,
    levelCols: 3,
    levelWidth: 83,
    levelHeight: 91,
    levelSpacing: 10,
    starsArray: [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    level: 1,
    stars: 0,
    deathsCount: 0,
    width: 800,
    height: 600
};

if (JSON.parse(localStorage.getItem('upside_down_score'))) {
    game.global.starsArray = JSON.parse(localStorage.getItem('upside_down_score'));
}

game.state.add('Boot', bootState);
game.state.add('Load', loadState);
game.state.add('Menu', menuState);
game.state.add('About', aboutState);
game.state.add('Help', helpState);
game.state.add('Select', selectState);
game.state.add('Play', playState);
game.state.add('Finish', finishState);

game.state.start('Boot');
