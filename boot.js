var bootState = {
    init: function() {
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
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
