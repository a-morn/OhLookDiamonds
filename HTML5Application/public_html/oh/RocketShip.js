var RocketShip = (function(){
    var 
    diamondFrenzyCharge = 0,
    catzRocketContainer = new createjs.Container(),
    rocketShip={},
    canvas,
    stage,    
    credits,
    titleView = new createjs.Container(),
    seagullSheet,
    bg,    
    text,
    queue,
    mousedown,
    grav = 9,
    jump,
    score = 0,    
    catzVelocity = 0,
    sgCont = new createjs.Container(),
    diCont = new createjs.Container(),
    bgCont = new createjs.Container(),
    fgCont = new createjs.Container(),
    diSpeed = 25,
    bgSpeed = 5,
    fgSpeed = 14,
    sgSpeed =12,
    bg,
    queue,
    manifest,    
    loopTimer = 0,
    catzStateEnum = {
        Normal : 0,
        Uploop : 1,
        Downloop : 2
    },
    catzState;

    rocketShip.Init = function()
    {
        canvas                      = document.getElementById('mahCanvas');
        stage                       = new createjs.Stage(canvas);
        stage.mouseEventsEnabled    = true;

        manifest = [
                    //{id: "catz", src: "assets/catz.png"}, 
                    {id: "catzRocketSpriteSheet", src: 
                    "assets/catzRocketSpriteSheet.png"},
                    {id: "seagullSpriteSheet", src: "assets/seagull.png"},
                    {id: "diamond", src: "assets/diamond.png"}, 
                    {id: "meow", src: "assets/meow.mp3"},
                    //{id:"birdcry", src: "assets/birdcry.mp3"},
                    {id: "main", src: "assets/main.png"}, 
                    {id: "startB", src: "assets/startB.png"}, 
                    {id: "creditsB", src: "assets/creditsB.png"},
                    {id:"bg", src:"assets/bg.png"},
                    {id:"credits", src:"assets/credits.png"},
                    {id:"cload1", src:"assets/cload1.png"},
                    {id:"fgTree1", src:"assets/fgTree1.png"},
                    {id:"diamondSound", src:"assets/diamondSound.mp3"},
                    {id:"catzRocketCrash", src:"assets/catzRocketCrash.mp3"},
                    {id:"fgGround", src:"assets/fgGround.png"}

                ];

        queue = new createjs.LoadQueue(true);
        queue.installPlugin(createjs.Sound);
        queue.on("progress", handleProgress);            
        queue.on("complete", handleComplete);
        queue.loadManifest(manifest);         
    };

    function handleProgress(event)
    {
        event.loaded;
    }

    function handleComplete(event)
    {
        addGameView();       
    }

    function addGameView()
    {    
        stage.removeChild(titleView);
        titleView = null;
        credits = null;    

        //catzRocket = new createjs.Bitmap(queue.getResult("catzRocket"));
        //catzRocket.scaleX=0.1;
        //catzRocket.scaleY=0.1;
        //catzRocket.x = 300;
        //catzRocket.y = 200;                           

        bg = new createjs.Bitmap(queue.getResult("bg"));   

        var cload1 = new createjs.Bitmap(queue.getResult("cload1"));
        cload1.scaleX=0.3;
        cload1.scaleY=0.3;
        cload1.x = 10;
        cload1.y = 50;                           

        var cload2 = new createjs.Bitmap(queue.getResult("cload1"));
        cload2.scaleX=0.3;
        cload2.scaleY=0.3;
        cload2.x = 500;
        cload2.y = 80;                       

        bgCont.addChild(cload1, cload2);                    

        var diamond = new createjs.Bitmap(queue.getResult("diamond"));

        diamond.x = 900;
        diamond.y = 50+ Math.random()*100;
        diamond.scaleX = 0.1;
        diamond.scaleY = 0.1;
        diCont.addChild(diamond);

        var fgGround1 = new createjs.Bitmap(queue.getResult("fgGround"));
        //fgGround.scaleX=0.3;
        //fgGround.scaleY=0.3;
        fgGround1.x = 0;
        fgGround1.y = 300;                       
        var fgGround2 = new createjs.Bitmap(queue.getResult("fgGround"));
        //fgGround.scaleX=0.3;
        //fgGround.scaleY=0.3;
        fgGround2.x = 2000;
        fgGround2.y = 300;                       
        fgCont.addChild(fgGround1, fgGround2);    

        text = new createjs.Text("0", "20px Courier New", "#ff7700"); 
        text.x = 100;     

        var catzData = {
             images: ["assets/catzRocketSpriteSheet.png"],
            frames: {width:1235, height:1320},
            animations: {
                rockOn:{ frames: [7, 8,9,10,11,10,9,8]},
                jump:{ frames: [6,5,4,3,2,1,0,0,0,1,2,3,4,5,6], next: false, 
    frequency: 1 }
            }
        };
        var spriteSheet = new createjs.SpriteSheet(catzData);    
        catzRocket = new createjs.Sprite(spriteSheet, "rockOn");
        
        catzRocketContainer.x = 300;
        catzRocketContainer.y = 200;
        catzRocket.scaleX = 0.1;
        catzRocket.scaleY = 0.1;
        catzRocketContainer.regY = 50;
        catzRocketContainer.regX = 50;
        catzRocket.currentFrame = 0;   
        catzRocketContainer.addChild(catzRocket);

        var seagullData = {
             images: ["assets/seagull.png"],
            frames: {width:1235, height:1320},
            animations: {
                flappy:{ frames: [7,8,9,10,11]}
            }
        };
        seagullSheet = new createjs.SpriteSheet(seagullData);    
        var seagull = new createjs.Sprite(seagullSheet,"flappy");
        seagull.scaleX = 0.1;
        seagull.scaleY = 0.1;
        seagull.x = 900;
        seagull.y = 50+ Math.random()*100;
        sgCont.addChild(seagull);

        stage.addChild(bg);
        stage.addChild(catzRocketContainer); 
        stage.addChild(sgCont);
        stage.addChild(diCont);    
        stage.addChild(fgCont);             
        stage.addChild(text);

        bg.addEventListener("click", startGame);            

        createjs.Ticker.on("tick", update);  
        createjs.Ticker.setFPS(30);            
        createjs.Ticker.setPaused(true);

        catzRocket.gotoAndStop(7);    
        stage.update();
    }

    function startGame()
    {            
        bg.removeEventListener("click", startGame);        
        stage.addEventListener("stagemousedown", catzUp);    
        stage.addEventListener("stagemouseup", catzEndLoop);    
        jump = false;

        createjs.Ticker.setPaused(false);       
    }

    function update(event)
    {
        if(!event.paused)
        {                
            text.text = score;
            updatecatzRocket(event);
            updateBg();
            updateFg(event);
            updateDiamonds();
            updateSeagulls();
            stage.update(event); 

        }
    }

    function updatecatzRocket(event)
    {    
        if(catzState === catzStateEnum.Normal)   
        {
            catzVelocity += grav*event.delta/1000;
            catzRocketContainer.y += 20*catzVelocity*event.delta/1000;
            loopTimer = 0;
            if(!createjs.Tween.hasActiveTweens(catzRocketContainer))
            {
            catzRocketContainer.rotation = Math.atan(catzVelocity/40)*360/3.14;
            }
        }    
        else if (catzState === catzStateEnum.Uploop)
        {
            catzVelocity -= 2.5*grav*event.delta/1000;
            catzRocketContainer.y += 20*catzVelocity*event.delta/1000;
            loopTimer+= event.delta;   
            if(!createjs.Tween.hasActiveTweens(catzRocketContainer))
            {
            catzRocketContainer.rotation = Math.atan(catzVelocity/40)*360/3.14;
            }
        }
        else if (catzState === catzStateEnum.Downloop)
        {
            loopTimer+= event.delta;
            catzVelocity += (2-8*Math.sin(catzRocketContainer.rotation))
                *grav*event.delta/1000;  
    //        diSpeed = diSpeed * 0.98;
    //        bgSpeed = bgSpeed * 0.98;
    //        fgSpeed = fgSpeed * 0.98;

            catzRocketContainer.y+= 20*catzVelocity*event.delta/1000;
        }
        if (catzRocketContainer.rotation<-30 && catzState === catzStateEnum.Uploop)
        {
            createjs.Tween.removeAllTweens(catzRocketContainer);
            tween = createjs.Tween.get(catzRocketContainer)
                .to({rotation:-270},1000)
                .to({rotation:-330},200)
                .call(catzRelease);
            catzState = catzStateEnum.Downloop;
            loopTimer = 0;
        }

        if(catzRocketContainer.y > 450 || catzRocketContainer.y < -50)
        {            
            reset();
        }
    }

    function updateBg()
    {
        var arrayLength = bgCont.children.length;    
        for (var i = 0; i < arrayLength; i++) {
            var kid = bgCont.children[i];
            kid.x = kid.x - bgSpeed;    
            if (kid.x < -300)
            {
              kid.x = 800;
            }
        }    
    }

    function updateFg(event)
    {
        if(Math.random()>0.98)
        {
            var tree = new createjs.Bitmap(queue.getResult("fgTree1"));     
            tree.scaleX = 0.5;
            tree.scaleY = 0.5;
            tree.x = 1000;
            tree.y = 290;
            fgCont.addChild(tree);        
        }

        var arrayLength = fgCont.children.length;    
        for (var i = 0; i < arrayLength; i++) {
            var kid = fgCont.children[i];        
            if (kid.x <= -3200)
            {
              kid.x = kid.x + 4000;
            }
            kid.x = kid.x - fgSpeed*event.delta/10;     
        }                
        if (arrayLength>2)
        {
            if(fgCont.children[2].x < -100)
            {
                fgCont.removeChildAt(2);
            }        
        }
    }

    function updateDiamonds()
    {
        if(Math.random()>0.98)
        {
            var di = new createjs.Bitmap(queue.getResult("diamond"));
            di.scaleX = 0.1;
            di.scaleY = 0.1;
            di.x = 800;
            di.y = 50 +Math.random()*200;
            diCont.addChild(di);
        }
        var arrayLength = diCont.children.length;   
        for (var i = 0; i < arrayLength; i++) {
            var kid = diCont.children[i];
            kid.x = kid.x - diSpeed;    
            if (kid.x <= -100)
            {
              diCont.removeChildAt(i);
              arrayLength = arrayLength - 1;
              i = i - 1;
            }
            var catzBounds = catzRocketContainer.getTransformedBounds();
            //50 and 50 is approx height and width of diamonds
            if(Math.pow(catzBounds.x+catzBounds.width/2-(kid.x+50),2)+Math.pow(catzBounds.y+catzBounds.height/2-(kid.y+50),2)<5000)
            {
                diCont.removeChildAt(i);
                score = score +1;
                arrayLength = arrayLength - 1;
                icon = i - 1;
                var instance = createjs.Sound.play("diamondSound");
            }
        }   
    }

    function updateSeagulls()
    {
        if(Math.random()>1.1) // kill spawnrate
        {
            var seagull = new createjs.Sprite(seagullSheet,"flappy");
            seagull.scaleX = 0.1;
            seagull.scaleY = 0.1;
            seagull.x = 800;
            seagull.y = 50 +Math.random()*200;
            sgCont.addChild(seagull);
        }
        var arrayLength = sgCont.children.length;   
        for (var i = 0; i < arrayLength; i++) {
            var kid = sgCont.children[i];
            kid.x = kid.x - sgSpeed;    
            if (kid.x <= -100)
            {
              sgCont.removeChildAt(i);
              arrayLength = arrayLength - 1;
              i = i - 1;
            }
            if(Math.abs(catzRocket.x - kid.x) < 30 && Math.abs(catzRocket.y - 
    kid.y)< 30 )
            {
                sgCont.removeAllChildren();
                var instance = createjs.Sound.play("birdcry");
                instance.volume = 0.1;
                reset();;
            }
        }   
    }



    function catzUp()
    {
        mousedown = true;
        if(catzState === catzStateEnum.Normal)
        {
            catzVelocity-=2;
            catzState = catzStateEnum.Uploop;
            //createjs.Tween.removeAllTweens(catzRocket);
            //createjs.Tween.get(catzRocket)
            //        .to({rotation:-65},800,createjs.Ease.quadOut);
        }

    }

    function catzEndLoop()
    {
        mousedown = false;
        if(catzState!==catzStateEnum.Downloop)
        {
            catzState = catzStateEnum.Normal;
        }
        diSpeed = 12;
        bgSpeed = 5;
        fgSpeed = 14;
    }

    function catzRelease()
    {
        if(mousedown)
        {
            catzState = catzStateEnum.Uploop;
        }
        else
        {
            catzState = catzStateEnum.Normal;
        }
        rotation=0;
    }

    function reset()
    {    
        createjs.Ticker.setPaused(true);
        catzRocketContainer.x = 300;
        catzRocketContainer.y = 200;
        catzState = catzStateEnum.Normal;
        catzVelocity = 0;
        bg.addEventListener("click", startGame);        
        stage.removeEventListener("click", catzUp);  

        stage.update();
    }

    return rocketShip;
}());