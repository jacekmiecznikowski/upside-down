var helpState = {
    create: function() {
        game.add.image(0, 0, 'backgroundImage');
        this.panel = game.add.sprite(game.world.centerX, game.world.centerY, 'panel');
        this.panel.anchor.setTo(0.5, 0.5);
        this.cancelButton = game.add.button(game.world.centerX + 250, 90, "cancel_button", this.cancelClicked, this);
        this.cancelButton.anchor.setTo(0.5);

        this.title = game.add.bitmapText(game.world.centerX, 95, 'carter_one', "Help", 42);
        this.title.anchor.setTo(0.5, 0.5);

        this.msg = "Hello! Do you need any help?\n";
        this.msg += "\n";
        this.msg += "Use arrow keys to move your character.\n";
        this.msg += "Press up or down to switch gravity.\n";
        this.msg += "To finish each level, you'll need to:\n";
        this.msg += "collect all coins\n";
        this.msg += "and\n";
        this.msg += "jump through the open portal.\n";
        this.msg += "\n";
        this.msg += "There are plenty of levels for you to complete.\n";
        this.msg += "Good luck!";

        this.info = game.add.bitmapText(game.world.centerX, game.world.centerY + 25, 'carter_one_small', this.msg, 20);
        this.info.anchor.setTo(0.5, 0.5);
        this.info.align = "center";


    },
    cancelClicked: function() {
        game.state.start("Menu");
    },
};
