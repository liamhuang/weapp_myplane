import VisualGameObject from '../base/VisualGameObject'

const ENEMY_IMG_SRC = './images/enemy.png'
const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 60

const EXPLO_IMG_PREFIX  = './images/explosion';
const EXPLO_FRAME_COUNT = 19;

//爆炸时候的图片列表
let explosionList = [];
let loaded = false;
let loadImageList  = function(){
  if( true == loaded ){ return };
  loaded = true;
  debugger;
  for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
    let img = wx.createImage();
    img.src = EXPLO_IMG_PREFIX + (i + 1) + '.png';
    explosionList.push( img );
  }
}

/**
    A test class to demonstrate the use of the VisualGameObject class
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
export default class Enemy extends VisualGameObject
{
  constructor( x  ){
    super();

    /** The movement direction  in the x axis
      @type Number
    */
			this.xDirection = 1;
			
			/** The width of target
      @type Number
    */
			this.width = ENEMY_WIDTH;

			/** The height of target
      @type Number
     */
			this.height = ENEMY_HEIGHT;
      

      /** The movement speed
            @type Number
        */
      this.speed = 150;

      let that = this;
      this.image = wx.createImage();
      this.image.onload = function( img ){
         that.start( x  )
      }
      this.image.src = ENEMY_IMG_SRC;
      loadImageList();
	  return this;
  }
	
	
	/**
        Initialises this object
        @return A reference to the initialised object
    */
  start( x )
	{
    if( x + ENEMY_WIDTH >= GameGlobal.screenWidth ){
        x = GameGlobal.screenWidth - ENEMY_WIDTH;
    }

		this.startupVisualGameObject( GameGlobal.g_GameObjectManager ,this.image, x, -1 * ENEMY_HEIGHT, 2);
		return this;
	}
	
	/**
        Updates the object
        @param dt The time since the last frame in seconds
        @param context The drawing context 
        @param xScroll The global scrolling value of the x axis  
        @param yScroll The global scrolling value of the y axis 
    */
	update(/**Number*/ dt, /**CanvasRenderingContext2D*/context, /**Number*/ xScroll, /**Number*/ yScroll)
	{
      this.y  = this.y +  ( dt * this.speed );
      
      if( this.y >= GameGlobal.screenHeight ){
        this.shutdownVisualGameObject( GameGlobal.g_GameObjectManager );
      }
  }

  explosionNum = 0;
  
  /**
   *  碰撞了之后，自动关闭掉
   * **/
  explose(){
    this.explosionNum = 0;
    let that = this;
    setInterval( function(){
      if( that.explosionNum == EXPLO_FRAME_COUNT ){
          that.shutdownVisualGameObject( GameGlobal.g_GameObjectManager );
      }else{
        that.explosionNum += 1;
        explosionList[ that.explosionNum ] && ( that.image =  explosionList[ that.explosionNum ]);
      }
    }, 50 );
  }
}
