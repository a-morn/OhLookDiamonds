var 
	bg,            
	canvas, 
	catzBounds,
	catzNorm,        
	catzVertices,
	dataDict,        
	diamondShardCounter,
	diamondSound,
	debugText,	
	debugOptions = {noHouseView: false, debugMode: false, trustFund : true, infiniteFuel : false, godMode : false},
	diamondEnum = {
        shard : 0,
        medium : 1,
        great : 2,        
    },
	diamondCounterText,     
	exitSmoke,
	flameBounds,
	flameNorm,
	flameVertices,
	gameView,
	gameListener,
	hud,
	hudPointer,        
	houseListener,
	leaves,	       
	lightningColor = "#99ccff",
	muteButton,        	
	newBounds,
	norm,
	polygonLine,
	polygonVertices,	
	rocketSong,
	smoke,
	squawkSound,
	stage,
	queue,    
	cont = {attackBird : new createjs.Container(), 
		cloud : new createjs.Container(),
		collisionCheckDebug : new createjs.Container(), 
		diamond : new createjs.Container(),	
		fg : new createjs.Container(), 
		fgTop : new createjs.Container(),
		goose : new createjs.Container(),
		hawk : new createjs.Container(),
		lightning : new createjs.Container(),
		onlooker : new createjs.Container(),
		parallax : new createjs.Container(),
		//scatterDiamonds : new createjs.Container(),		
		sg : new createjs.Container(),
		star : new createjs.Container(),	
		thunder : new createjs.Container(),
		wind : new createjs.Container()},	
	gameStats = {
        score : 0,
        kills : 0,
        bust : 0,
        currentRound: 0,        
        hoboCatHouse : {built : false, builtOnRound : null} ,
        orphanage : {built : false, builtOnRound : null, youthCenter : false, summerCamp : false, slots : 0},       
        rehab: {built : false, isBuilding : false, builtOnRound : null , hospital : false, phychiatricWing : false, monastery : false, slots : 0},        
        university: {built : false, builtOnRound : null, rocketUniversity:null, slots : 0},
        villagers: {approvalRating : 0},
        kittens: {approvalRating : 0},
        catParty: {approvalRating : 0},
        Difficulty : 0,
        hasBeenFirst: {
            round : false,
            frenzy : false,            
            houseWithSlots : false,
            bouncedCheck : false
        }        
    };	
	
function StartGame(){    	    
	InitializeStage.init(canvas, stage);    
}