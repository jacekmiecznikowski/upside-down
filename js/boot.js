var bootState = {
    init: function() {
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.ARCADE);
    },
    preload: function() {
        game.load.image('progressBar', 'assets/gfx/progress_bar.png');
        game.load.image('backgroundImage', 'assets/gfx/background.png');
        game.load.bitmapFont('carter_one', 'assets/font/carter_one.png', 'assets/font/carter_one.fnt');
        game.load.bitmapFont('carter_one_small', 'assets/font/carter_one_small.png', 'assets/font/carter_one_small.fnt');
    },
    create: function() {
        game.state.start('Load');
    }
};
