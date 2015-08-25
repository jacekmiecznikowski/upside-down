var loadState = {
    preload: function() {
        game.add.image(0, 0, 'backgroundImage');
        this.loadingLabel = game.add.bitmapText(game.world.centerX, game.world.centerY - 70, 'carter_one', "loading...", 42);
        this.loadingLabel.anchor.setTo(0.5, 0.5);
        this.progressBar = game.add.sprite(game.world.centerX, game.world.centerY, 'progressBar');
        this.progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(this.progressBar);

        game.load.image('logo', 'assets/gfx/logo.png');
        game.load.image('panel', 'assets/gfx/panel.png');
        game.load.image('wide_panel', 'assets/gfx/wide_panel.png');
        game.load.image('play_button', 'assets/gfx/play_button.png');
        game.load.image('restart_button', 'assets/gfx/restart_button.png');
        game.load.image('levels_button', 'assets/gfx/levels_button.png');
        game.load.spritesheet("sound_button", "assets/gfx/sound_button.png", 78, 78);
        game.load.image('info_button', 'assets/gfx/info_button.png');
        game.load.image('help_button', 'assets/gfx/help_button.png');
        game.load.image('cancel_button', 'assets/gfx/cancel_button.png');
        game.load.image('left_arrow', 'assets/gfx/left_arrow.png');
        game.load.image('right_arrow', 'assets/gfx/right_arrow.png');
        game.load.image('twitter_button', 'assets/gfx/twitter_button.png');
        game.load.image('facebook_button', 'assets/gfx/facebook_button.png');
        game.load.image('google_button', 'assets/gfx/google_button.png');


        game.load.image('pixel1', 'assets/gfx/pixel1.png');
        game.load.image('pixel2', 'assets/gfx/pixel2.png');
        game.load.image('tilemap', 'assets/gfx/tilemap.png');
        game.load.image('enemies', 'assets/gfx/enemies.png');

        game.load.tilemap('level1', 'js/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2', 'js/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level3', 'js/levels/level3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level4', 'js/levels/level4.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level5', 'js/levels/level5.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level6', 'js/levels/level6.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level7', 'js/levels/level7.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level8', 'js/levels/level8.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level9', 'js/levels/level9.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level10', 'js/levels/level10.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level11', 'js/levels/level11.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level12', 'js/levels/level12.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.audio('jump', ['assets/sfx/jump.ogg', 'assets/sfx/jump.mp3']);
        game.load.audio('coin', ['assets/sfx/coin.ogg', 'assets/sfx/coin.mp3']);
        game.load.audio('portal', ['assets/sfx/portal.ogg', 'assets/sfx/portal.mp3']);
        game.load.audio('death', ['assets/sfx/death.ogg', 'assets/sfx/death.mp3']);
        game.load.audio('teleport', ['assets/sfx/teleport.ogg', 'assets/sfx/teleport.mp3']);
        game.load.audio('song', ['assets/sfx/song.ogg', 'assets/sfx/song.mp3']);


        game.load.spritesheet('stars', 'assets/gfx/stars.png', 340, 120);
        game.load.spritesheet('spinner', 'assets/gfx/spinner_sprite_sheet.png', 32, 32);
        game.load.spritesheet('coins', 'assets/gfx/coin_sprite_sheet.png', 32, 32);
        game.load.spritesheet('portals', 'assets/gfx/portal_sprite_sheet.png', 94, 150);
        game.load.spritesheet('levels', 'assets/gfx/levels.png', game.global.levelWidth, game.global.levelHeight);
        game.load.spritesheet('hero', 'assets/gfx/hero_sprite_sheet.png', 43, 50);
    },
    create: function() {
        this.music = game.add.sound('song', 0.2, true);
        this.music.play();
        game.state.start('Menu');
    }

};
