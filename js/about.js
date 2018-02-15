var aboutState = {
    create: function() {
        game.add.image(0, 0, 'backgroundImage');
        this.panel = game.add.sprite(game.world.centerX, game.world.centerY, 'panel');
        this.panel.anchor.setTo(0.5, 0.5);
        this.logo = game.add.sprite(game.world.centerX, game.world.centerY-40 , 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.scale.setTo(0.5, 0.5);
        this.cancelButton = game.add.button(game.world.centerX + 250, 90, 'cancel_button', this.cancelClicked, this);
        this.cancelButton.anchor.setTo(0.5);

        this.title = game.add.bitmapText(game.world.centerX, 95, 'carter_one', "About", 42);
        this.title.anchor.setTo(0.5, 0.5);

        this.msg = "Code, art, sounds & everything by:\n";
        this.msg += "Jacek Miecznikowski";

        this.info = game.add.bitmapText(game.world.centerX, 450, 'carter_one_small', this.msg, 20);
        this.info.anchor.setTo(0.5, 0.5);
        this.info.align = "center";
    },
    update: function() {
        this.logo.rotation += 0.005;
    },
    cancelClicked: function() {
        game.state.start("Menu");
    },
};
