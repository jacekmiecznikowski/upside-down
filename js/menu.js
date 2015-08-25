var menuState = {
    create: function() {

        game.add.image(0, 0, 'backgroundImage');
        this.logo = game.add.sprite(game.world.centerX, game.world.centerY - 150, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.scale.x = 0.7;
        this.logo.scale.y = 0.7;

        this.playButton = game.add.button(game.world.centerX, game.world.centerY + 70, 'play_button', this.startGame, this);
        this.playButton.anchor.setTo(0.5, 0.5);
        this.tweenButtons(this.playButton);

        this.infoButton = game.add.button(game.world.centerX - 100, game.world.centerY + 220, 'info_button', this.info, this);
        this.infoButton.anchor.setTo(0.5, 0.5);
        this.tweenButtons(this.infoButton);

        this.helpButton = game.add.button(game.world.centerX + 100, game.world.centerY + 220, 'help_button', this.help, this);
        this.helpButton.anchor.setTo(0.5, 0.5);
        this.tweenButtons(this.helpButton);

        this.soundButton = game.add.button(game.world.centerX, game.world.centerY + 220, 'sound_button', this.toggleAudio, this);
        this.soundButton.anchor.setTo(0.5, 0.5);
        if (game.sound.mute) {
            this.soundButton.frame = 1;
        } else {
            this.soundButton.frame = 2;
        }
        this.tweenButtons(this.soundButton);
    },
    update: function() {
        this.logo.rotation += 0.005;
    },
    tweenButtons: function(button) {
        var randomInt = game.rnd.integerInRange(5, 10);
        game.add.tween(button)
            .to({
                y: button.y + randomInt
            }, 2000)
            .to({
                y: button.y
            }, 2000)
            .loop()
            .start();
    },
    startGame: function() {
        game.state.start('Select');
    },
    info: function() {
        game.state.start('About');
    },
    help: function() {
        game.state.start('Help');
    },
    toggleAudio: function() {
        if (!game.sound.mute) {
            game.sound.mute = true;
            this.soundButton.frame = 1;
        } else {
            game.sound.mute = false;
            this.soundButton.frame = 2;
        }
    }

};
