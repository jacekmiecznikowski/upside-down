var playState = {
    create: function() {
        this.level = 'level' + game.global.level;
        this.msgs = game.add.group();
        this.portals = game.add.group();
        this.portals.enableBody = true;
        this.portals.immovable = true;
        this.coins = game.add.group();
        this.coins.enableBody = true;
        this.player = game.add.sprite(75, game.global.height - 100, 'hero');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('right', [0, 1, 2, 3], 10, true);
        this.player.animations.add('left', [5, 6, 7, 8], 10, true);
        this.side = "right";
        this.velocity = 200;
        this.gravity = 750;
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.global.deathsCount = 0;
        this.player.body.maxVelocity.setTo(700, 700);

        this.enemies = game.add.group();
        this.enemies.enableBody = true;

        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

        this.cursors = game.input.keyboard.createCursorKeys();

        this.enemySpeed = 150;

        this.emitter = game.add.emitter(0, 0, 200);
        this.emitter.makeParticles(['pixel1', 'pixel2']);
        this.emitter.gravity = 0;
        this.emitter.minParticleSpeed.setTo(-200, -200);
        this.emitter.maxParticleSpeed.setTo(200, 200);

        this.killPlayerSnd = game.add.sound('death');
        this.killPlayerSnd.volume = 0.05;

        this.jumpSnd = game.add.sound('jump');
        this.jumpSnd.volume = 0.05;


        this.portalUpSnd = game.add.sound('portal');
        this.portalUpSnd.volume = 0.05;

        this.powerUpSnd = game.add.sound('coin');
        this.powerUpSnd.volume = 0.05;

        this.teleportSnd = game.add.sound('teleport');
        this.teleportSnd.volume = 0.2;

        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.loadLevel();

        this.soundButton = game.add.button(game.global.width - 40, 40, 'sound_button', this.toggleAudio, this);
        this.soundButton.anchor.setTo(0.5, 0.5);
        this.soundButton.scale.setTo(0.7, 0.7);
        this.soundButton.fixedToCamera = true;
        if (game.sound.mute) {
            this.soundButton.frame = 1;
        } else {
            this.soundButton.frame = 2;
        }

        this.restartButton = game.add.button(game.global.width - 100, 40, 'restart_button', this.startGame, this);
        this.restartButton.anchor.setTo(0.5, 0.5);
        this.restartButton.scale.setTo(0.7, 0.7);
        this.restartButton.fixedToCamera = true;

        this.levelsButton = game.add.button(game.global.width - 160, 40, 'levels_button', this.selectLevels, this);
        this.levelsButton.anchor.setTo(0.5, 0.5);
        this.levelsButton.scale.setTo(0.7, 0.7);
        this.levelsButton.fixedToCamera = true;


        this.rightBtn =  game.add.button(200, game.global.height - 40, 'buttons');
        this.rightBtn.frame = 1;
        this.rightBtn.anchor.setTo(0.5, 0.5);
        this.rightBtn.scale.setTo(2, 2);
        this.rightBtn.fixedToCamera = true;
        this.rightBtn.alpha = 0.7;

        this.leftBtn =  game.add.button(50, game.global.height - 40, 'buttons');
        this.leftBtn.frame = 0;
        this.leftBtn.anchor.setTo(0.5, 0.5);
        this.leftBtn.scale.setTo(2, 2);
        this.leftBtn.fixedToCamera = true;
        this.leftBtn.alpha = 0.7;
        
        this.upBtn =  game.add.button(game.global.width - 50, game.global.height - 40, 'buttons', this.switchGravity, this);
        this.upBtn.frame = 2;
        this.upBtn.anchor.setTo(0.5, 0.5);
        this.upBtn.alpha = 0.7;
        this.upBtn.scale.setTo(2, 2);
        this.upBtn.fixedToCamera = true;
        
        [this.leftBtn, this.rightBtn, this.upBtn].forEach(function (btn) {
            btn.isDown = false;
            btn.events.onInputDown.add(function () { btn.isDown = true; });
            btn.events.onInputUp.add(function () { btn.isDown = false; });
        });
        game.world.bringToTop(this.player);
        game.world.bringToTop(this.soundButton);
        game.world.bringToTop(this.restartButton);
        game.world.bringToTop(this.levelsButton);
        game.world.bringToTop(this.upBtn);
        game.world.bringToTop(this.rightBtn);
        game.world.bringToTop(this.leftBtn);
    },

    clearMap: function() {
        this.portals.callAll('kill');
        this.enemies.callAll('kill');
        this.coinCount = 0;
        this.coinTotal = 0;
        this.msgs.forEach(function(l) {
            l.message.destroy();
            l.destroy();
        }, this);

        this.respawnPlayer();
        if (this.layer) {
            this.layer.destroy();
        }

    },
    loadLevel: function() {

        this.clearMap();

        this.map = game.add.tilemap(this.level);
        this.map.addTilesetImage('tilemap', 'tilemap');
        this.map.addTilesetImage('enemies', 'enemies');
        this.map.setCollision([1, 2, 3, 4, 5, 6]);
        this.map.setTileIndexCallback([7, 8, 9, 10, 11], this.killPlayer, this);


        this.layer = this.map.createLayer('layer');
        this.map.createFromObjects('objects', 12, 'portals', 0, true, false, this.portals);
        this.map.createFromObjects('objects', 13, '', 0, true, false, this.msgs);
        this.map.createFromObjects('objects', 19, 'coins', 0, true, false, this.coins);
        this.map.createFromObjects('objects', 17, 'spinner', 0, true, false, this.enemies);
        this.map.createFromObjects('objects', 18, 'spinner', 0, true, false, this.enemies);
        this.layer.resizeWorld();
        this.createBackground();

        this.locked = true;

        this.loadObjects();

    },
    loadObjects: function() {
        this.coins.callAll('animations.add', 'animations', 'shine', [0, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0], 10, true);
        this.coins.callAll('animations.play', 'animations', 'shine');
        this.enemies.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3], 20, true);
        this.enemies.callAll('animations.play', 'animations', 'spin');
        this.portals.callAll('animations.add', 'animations', 'wiggle', [1, 2, 3, 4], 5, true);

        this.coins.forEach(function(c) {
            this.coinTotal += 1;
            c.alive = true;
        }, this);

        this.portals.forEach(function(p) {
            p.anchor.setTo(0.5, 0.5);
            p.y += p.height / 2;
            var t = game.add.tween(p).to({
                y: '-5'
            }, 500).to({
                y: '+5'
            }, 500);
            t.loop(true).start();
        }, this);



        this.msgs.forEach(function(l) {
            l.message = game.add.bitmapText(l.x, l.y, 'carter_one', l.text, 25);
            l.message.x += l.width / 2;
            l.message.y += l.height / 2;
            l.message.alive = true;
        }, this);

        this.enemies.forEach(function(enemy) {
            if (!enemy.speed) {
                enemy.speed = this.enemySpeed.toString();;
            }
            if (enemy.move === 'h') {
                enemy.body.velocity.x = parseInt(enemy.speed);
                enemy.direction = 1;
            } else if (enemy.move === 'v') {
                enemy.body.velocity.y = parseInt(enemy.speed);
                enemy.direction = 1;
            }
        }, this);

        this.portals.forEach(function(p) {
            p.anchor.setTo(0.5, 0.5);
            p.x += p.width / 2;
            p.y += p.width;
        }, this);

    },
    nextLevel: function(player, portal) {
        if (this.locked !== true) {
            return;
        }

        if (this.coinCount === this.coinTotal) {
            this.locked = false;

            this.coinCount = 0;
            this.coinTotal = 0;
            this.teleportSnd.play();
            var t = game.add.tween(this.player.scale).to({
                x: 0,
                y: 0
            }, 200).start();
            t.onComplete.add(this.clear, this);
        }

    },

    clear: function() {
        if (game.global.deathsCount <= 2) {
            game.global.stars = 3 - game.global.deathsCount;
        } else {
            game.global.stars = 1;
        }

        if (game.global.starsArray[game.global.level - 1] <= game.global.stars) {
            game.global.starsArray[game.global.level - 1] = game.global.stars;
        }

        if (game.global.starsArray[game.global.level] == 4 && game.global.level < game.global.starsArray.length) {
            game.global.starsArray[game.global.level] = 0;
        }
        localStorage.setItem('upside_down_score', JSON.stringify(game.global.starsArray));
        game.world.width = game.global.width;
        game.world.height = game.global.height;
        game.state.start('Finish');
    },

    pickUpCoin: function(player, coin) {
        this.powerUpSnd.play();
        coin.destroy();
        this.coinCount += 1;
        if (this.coinCount === this.coinTotal) {
            this.portals.forEach(function(p) {
                this.portalUpSnd.play();
                p.animations.play('wiggle');
            }, this);
        }
    },
    isOnTile: function() {
        if (this.player.body.blocked.up || this.player.body.blocked.down) {
            return true;
        } else {
            return false;
        }
    },
    update: function() {
        game.physics.arcade.collide(this.player, this.layer);
        game.physics.arcade.overlap(this.player, this.coins, this.pickUpCoin, null, this);
        game.physics.arcade.overlap(this.player, this.portals, this.nextLevel, null, this);
        game.physics.arcade.overlap(this.enemies, this.layer, this.enemyMove, null, this);
        game.physics.arcade.overlap(this.enemies, this.player, this.killPlayer, null, this);
        this.player.body.velocity.x = 0;

        this.move();

        if ((this.isOnTile() === false) && (this.side !== 'default')) {
            if (this.side === 'right') {
                this.player.frame = 4;
            } else {
                this.player.frame = 9;
            }
        }
    },
    move: function() {
        if (this.cursors.left.isDown || this.aKey.isDown || this.leftBtn.isDown) {
            this.player.body.velocity.x = -this.velocity;
            if (this.side !== 'left') {
                this.player.animations.play('left');
                this.side = 'left';
            }
        } else if (this.cursors.right.isDown || this.dKey.isDown || this.rightBtn.isDown) {
            this.player.body.velocity.x = this.velocity;

            if (this.side !== 'right') {
                this.player.animations.play('right');
                this.side = 'right';
            }
        } else {
            if (this.side !== 'default') {
                this.player.animations.stop();
                if (this.side === 'right') {
                    this.player.frame = 0;
                } else {
                    this.player.frame = 5;
                }
                this.side = 'default';
            }
        }

        this.cursors.up.onDown.add(this.upGravity, this);
        this.wKey.onDown.add(this.upGravity, this);
        this.cursors.down.onDown.add(this.downGravity, this);
        this.sKey.onDown.add(this.downGravity, this);
        this.spaceKey.onDown.add(this.switchGravity, this);
    },
    enemyMove: function(enemy, layer) {
        if (enemy.move === 'h') {
            if (enemy.direction < 0) {
                enemy.body.velocity.x = parseInt(enemy.speed);
            } else {
                enemy.body.velocity.x = -parseInt(enemy.speed);
            }
        } else if (enemy.move === 'v') {
            if (enemy.direction < 0) {
                enemy.body.velocity.y = parseInt(enemy.speed);
            } else {
                enemy.body.velocity.y = -parseInt(enemy.speed);
            }
        }

        enemy.direction = enemy.direction * -1;
    },
    upGravity: function() {
        if (this.orientation === 'down') {
            this.jumpSnd.play();
            this.orientation = 'up';
            this.player.body.gravity.y = -this.gravity;
            this.player.angle = 180;
            this.player.scale.x = -1;
        }
    },
    downGravity: function() {
        if (this.orientation === 'up') {
            this.jumpSnd.play();
            this.orientation = 'down';
            this.player.body.gravity.y = this.gravity;
            this.player.angle = 0;
            this.player.scale.x = 1;
        }
    },
    switchGravity: function() {
        if (this.orientation === 'down') {
            this.upGravity();
        } else {
            this.downGravity();
        }
    },
    killPlayer: function() {
        this.killPlayerSnd.play();
        this.orientation = 'down';
        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y;
        this.emitter.start(true, 1000, null, 64);
        this.player.kill();
        game.global.deathsCount += 1;
        this.respawnPlayer();
    },
    respawnPlayer: function() {
        this.orientation = 'down';
        this.player.reset(110, 500);
        this.player.frame = 0;
        this.player.scale.x = 1;
        this.side = 'right';
        if (this.player.body.gravity.y === -this.gravity) {
            this.player.angle = 0;
        }
        this.player.body.gravity.y = this.gravity;
        this.player.anchor.setTo(0.5, 0.5);


    },
    createBackground() {
        var bitmap = game.add.bitmapData(game.world.width, game.world.height);
        var gradient = bitmap.context.createLinearGradient(0, 0, 0, game.world.height / 2);
        gradient.addColorStop(0, '#3498db');
        gradient.addColorStop(0.7, '#5eaadd');
        gradient.addColorStop(1, '#87bbdd');
        bitmap.context.fillStyle = gradient;
        bitmap.context.fillRect(0, 0, game.world.width, game.world.height);
        var background = game.add.sprite(0, 0, bitmap);
        background.sendToBack();
    },
    toggleAudio: function() {
        if (!game.sound.mute) {
            game.sound.mute = true;
            this.soundButton.frame = 1;
        } else {
            game.sound.mute = false;
            this.soundButton.frame = 2;
        }
    },
    startGame: function() {
        game.state.start('Play');
    },
    selectLevels: function() {
        game.world.width = game.global.width;
        game.world.height = game.global.height;
        game.state.start('Select');
    },

};
