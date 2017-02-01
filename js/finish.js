var finishState = {
    create: function() {
        game.add.image(0, 0, 'backgroundImage');
        this.panel = game.add.sprite(game.world.centerX, game.world.centerY, 'panel');
        this.panel.anchor.setTo(0.5, 0.5);

        this.restartButton = game.add.button(game.world.centerX, game.global.height - 60, 'restart_button', this.restartClicked, this);
        this.restartButton.anchor.setTo(0.5, 0.5);

        this.levelsButton = game.add.button(game.world.centerX - 160, game.global.height - 60, 'levels_button', this.levelsClicked, this);
        this.levelsButton.anchor.setTo(0.5, 0.5);

        if (game.global.level < game.global.starsArray.length) {
            this.nextButton = game.add.button(game.world.centerX + 160, game.global.height - 60, 'right_arrow', this.nextClicked, this);
            this.nextButton.anchor.setTo(0.5, 0.5);
        }

        this.title = game.add.bitmapText(game.world.centerX, 95, 'carter_one', "Level " + game.global.level + " cleared", 42);
        this.title.anchor.setTo(0.5, 0.5);

        this.msg = game.add.bitmapText(game.world.centerX, game.world.centerY + 50, 'carter_one_small', "Share your progress:", 20);
        this.msg.anchor.setTo(0.5, 0.5);

        this.score = game.add.sprite(game.world.centerX, game.world.centerY - 90, 'stars', game.global.stars - 1);
        this.score.anchor.setTo(0.5, 0.5);

        this.twitterButton = game.add.button(game.world.centerX - 100, game.world.centerY + 120, 'twitter_button', this.twitter, game.global.stars);
        this.twitterButton.anchor.setTo(0.5, 0.5);
        this.facebookButton = game.add.button(game.world.centerX, game.world.centerY + 120, 'facebook_button', this.facebook, this);
        this.facebookButton.anchor.setTo(0.5, 0.5);
        this.googleButton = game.add.button(game.world.centerX + 100, game.world.centerY + 120, 'google_button', this.google, game.global.stars);
        this.googleButton.anchor.setTo(0.5, 0.5);
        game.global.stars = 0;
        game.global.deathsCount = 0;
    },
    restartClicked: function() {
        game.state.start('Play');
    },
    levelsClicked: function() {
        game.state.start('Select');
    },
    nextClicked: function() {
        game.global.level++;
        game.state.start('Play');
    },
    twitter: function(score) {
        window.open('http://twitter.com/share?text=I+just+finished+' + game.global.level + '+level+of+"upside+down"!+I+got+' + this + '+star\(s\)!+Check if you can beat my score at &url=' + window.location.href, '_blank');
    },
    facebook: function() {
        window.open('https://www.facebook.com/dialog/feed?app_id=140586622674265&link=' + window.location.href + '&name=upside down&redirect_uri=http%3A%2F%2Fs7.addthis.com%2Fstatic%2Fpostshare%2Fc00.html', '_blank');
    },
    google: function(score) {
        window.open('https://plus.google.com/share?url=' + window.location.href);
    },
};
