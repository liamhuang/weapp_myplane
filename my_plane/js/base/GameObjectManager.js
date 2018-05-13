/** target frames per second  
    @type Number
*/
var FPS = 30;
/** time between frames 
    @type Number
*/
var SECONDS_BETWEEN_FRAMES = 1 / FPS;
GameGlobal.screenWidth = 0;
GameGlobal.screenHeight = 0;

/**
    A manager for all the objects in the game
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
export default class GameObjectManager
{
    constructor(){
      /** An array of game objects 
         @type Arary
      */
        this.gameObjects = new Array();
        /** The time that the last frame was rendered  
            @type Date
        */
        this.lastFrame = new Date().getTime();
        /** The global scrolling value of the x axis  
            @type Number
        */
        this.xScroll = 0;
        /** The global scrolling value of the y axis  
            @type Number
        */
        this.yScroll = 0;
       
        /** A reference to the canvas element  
            @type HTMLCanvasElement
        */
        this.canvas = null;
        /** A reference to the 2D context of the canvas element
            @type CanvasRenderingContext2D
        */
        this.context2D = null;
        /** A reference to the in-memory canvas used as a back buffer 
            @type HTMLCanvasElement
        */
        this.backBuffer = null;
        /** A reference to the backbuffer 2D context 
            @type CanvasRenderingContext2D
        */
        this.backBufferContext2D = null;

        /**
         * 定时器，定时渲染
         * **/
        this.timer = null;
           
        return this;
    }

    /**
        Initialises this object
        @return A reference to the initialised object
    */
    startupGameObjectManager()
    {   
        // get references to the canvas elements and their 2D contexts
        this.canvas     = canvas;
        this.context2D  = this.canvas.getContext('2d');
        GameGlobal.screenWidth = this.canvas.width;
        GameGlobal.screenHeight = this.canvas.height;

        // this.backBuffer = wx.createCanvas();
        // this.backBuffer.width = this.canvas.width;
        // this.backBuffer.height = this.canvas.height;
        // this.backBufferContext2D = this.backBuffer.getContext('2d');
                
        this.startDraw()
        
        return this;        
    }
    
    //开始绘制
    startDraw(){
        let that = this;
        
        
        that.timer && cancelAnimationFrame(that.timer );
        that.timer = null;

        that.timer = requestAnimationFrame(function(){ 
            that.startDraw();
        }); 
        that.draw();
    }
    
    /**
        The render loop
    */
    draw()
    {
        // calculate the time since the last frame
        var thisFrame = new Date().getTime();
        var dt = (thisFrame - this.lastFrame)/1000;
        this.lastFrame = thisFrame;
       
        // clear the drawing contexts
        //this.backBufferContext2D.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // first update all the game objects
        for (var x in this.gameObjects)
        {
            if (this.gameObjects[x].update)
            {
                this.gameObjects[x].update(dt, this.context2D, this.xScroll, this.yScroll);
            }
        }

        // then draw the game objects
        for(var x in this.gameObjects)
        {
            if (this.gameObjects[x].draw)
            {
                this.gameObjects[x].draw(dt, this.context2D, this.xScroll, this.yScroll);
            }
        }
        
        // copy the back buffer to the displayed canvas
        //this.context2D.drawImage(this.backBuffer, 0, 0);
    }
    
    /**
        Adds a new GameObject to the gameObjects collection
        @param gameObject The object to add
    */
    addGameObject( gameObject )
    {
        this.gameObjects.push(gameObject);
        this.gameObjects.sort(function(a,b){return a.zOrder - b.zOrder;})
    }
    
    /**
        Removes a GameObject from the gameObjects collection
        @param gameObject The object to remove
    */
    removeGameObject(gameObject)
    {
        for( let i = 0 ; i < this.gameObjects.length ; i++ ){
           if( gameObject == this.gameObjects[i ] ){
                this.gameObjects.splice( i , 1 );
           }
        }
        
    }

    stop(){
        this.timer && cancelAnimationFrame( this.timer );
        this.timer = null;
    }

    restart( ){
        this.startDraw()
    }
}
