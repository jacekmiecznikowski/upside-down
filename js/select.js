var selectState = {
    create: function() {
        game.add.image(0, 0, 'backgroundImage');
        panel = game.add.sprite(game.world.centerX, game.world.centerY - 30, 'wide_panel');
        panel.anchor.setTo(0.5, 0.5);

        title = game.add.bitmapText(game.world.centerX, 140, 'carter_one', "Choose level", 42);
        title.anchor.setTo(0.5, 0.5);

        pages = game.global.starsArray.length / (game.global.levelRows * game.global.levelCols);
        currentPage = Math.floor(game.global.level / (game.global.levelRows * game.global.levelCols));
        if (currentPage > pages - 1) {
            currentPage = pages - 1;
        }
        cancelButton = game.add.button(game.world.centerX + 290, 140, "cancel_button", this.cancelClicked, this);
        cancelButton.anchor.setTo(0.5);
        leftArrow = game.add.button(game.world.centerX - 200, 420, "left_arrow", this.arrowClicked, this);
        leftArrow.anchor.setTo(0.5);
        if (currentPage == 0) {
            leftArrow.alpha = 0.3;
        }
        rightArrow = game.add.button(game.world.centerX + 200, 420, "right_arrow", this.arrowClicked, this);
        rightArrow.anchor.setTo(0.5);
        if (currentPage == pages - 1) {
            rightArrow.alpha = 0.3;
        }
        levelThumbsGroup = game.add.group();
        var levelLength = game.global.levelWidth * game.global.levelCols + game.global.levelSpacing * (game.global.levelCols - 1);
        var levelHeight = game.global.levelWidth * game.global.levelRows + game.global.levelSpacing * (game.global.levelRows - 1);
        for (var l = 0; l < pages; l++) {
            var offsetX = (game.width - levelLength) / 2 + game.width * l;
            var offsetY = 190;
            for (var i = 0; i < game.global.levelRows; i++) {
                for (var j = 0; j < game.global.levelCols; j++) {
                    var levelNumber = i * game.global.levelCols + j + l * (game.global.levelRows * game.global.levelCols);
                    var levelThumb = game.add.button(offsetX + j * (game.global.levelWidth + game.global.levelSpacing), offsetY + i * (game.global.levelHeight + game.global.levelSpacing), "levels", this.levelClicked, this);
                    levelThumb.frame = game.global.starsArray[levelNumber];
                    levelThumb.levelNumber = levelNumber + 1;
                    levelThumbsGroup.add(levelThumb);
                    if (game.global.starsArray[levelNumber] < 4) {
                        var levelText = game.add.bitmapText(levelThumb.x + game.global.levelWidth / 2, levelThumb.y + game.global.levelHeight / 2, 'carter_one', (levelNumber + 1).toString(), 35);
                        levelText.anchor.set(0.5, 0.5);
                        levelThumbsGroup.add(levelText);
                    }
                }
            }
        }
        levelThumbsGroup.x = currentPage * game.width * -1;
    },
    arrowClicked: function(button) {
        if (button.key === "right_arrow" && currentPage < pages - 1) {
            leftArrow.alpha = 1;
            currentPage++;
            if (currentPage == pages - 1) {
                button.alpha = 0.3;
            }
            var buttonsTween = game.add.tween(levelThumbsGroup);
            buttonsTween.to({
                x: currentPage * game.width * -1
            }, 500, Phaser.Easing.Cubic.None);
            buttonsTween.start();
        }
        if (button.key == "left_arrow" && currentPage > 0) {
            rightArrow.alpha = 1;
            currentPage--;
            if (currentPage == 0) {
                button.alpha = 0.3;
            }
            var buttonsTween = game.add.tween(levelThumbsGroup);
            buttonsTween.to({
                x: currentPage * game.width * -1
            }, 400, Phaser.Easing.Cubic.None);
            buttonsTween.start();
        }
    },
    cancelClicked: function() {
        game.state.start("Menu");
    },
    levelClicked: function(button) {
        if (button.frame < 4) {
            game.global.level = button.levelNumber;
            game.state.start("Play");
        } else {
            var buttonTween = game.add.tween(button)
            buttonTween.to({
                alpha: 0.5
            }, 20, Phaser.Easing.Cubic.None);
            buttonTween.to({
                alpha: 1
            }, 20, Phaser.Easing.Cubic.None);
            buttonTween.to({
                alpha: 0.5
            }, 20, Phaser.Easing.Cubic.None);
            buttonTween.to({
                alpha: 1
            }, 20, Phaser.Easing.Cubic.None);
            buttonTween.start();
        }
    }
};
