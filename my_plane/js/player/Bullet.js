import VisualGameObject from '../base/VisualGameObject'

const BULLET_IMG_SRC = './images/bullet.png'
const BULLET_WIDTH   = 16
const BULLET_HEIGHT  = 30

/**
    A test class to demonstrate the use of the VisualGameObject class
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
export default class Bullet extends VisualGameObject
{
  constructor( x , y ){
    super();

    /** The movement direction  in the x axis
      @type Number
    */
			this.xDirection = 1;
			
			/** The width of target
      @type Number
    */
			this.width = BULLET_WIDTH;

			/** The height of target
      @type Number
     */
			this.height = BULLET_HEIGHT;
      
      /** The movement direction  in the x axis
            @type Number
        */
      this.yDirection = 1;

      /** The movement speed
            @type Number
        */
      this.speed = 100;

      let that = this;
      this.image = wx.createImage();
      this.image.onload = function( img ){
         that.start( x - ( that.width / 2 ) , y )
      }
      this.image.src = BULLET_IMG_SRC;

       /**
       * collisonList  
       * 碰撞检测列表
       * ***/
      this.collisonList = [];

      /**
       * collisonCallback
       * 碰撞了之后的回调
       * ** */
      this.collisonCallback = null

	  return this;
  }
	
	
	/**
        Initialises this object
        @return A reference to the initialised object
    */
  start( x , y )
	{
		this.startupVisualGameObject( GameGlobal.g_GameObjectManager ,this.image, x, y, 2);
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
      this.y  = this.y -  ( dt * this.speed );
      
      if( this.y <= 0 ){
        this.shutdownVisualGameObject( GameGlobal.g_GameObjectManager );
      }


      //每次都检查当前的飞机是否和敌机发生碰撞了
      for( let i  = 0 ; i < this.collisonList.length ; i++){
          if( this.isCollideWith( this.collisonList[i] ) ){
            this.collisonCallback && this.collisonCallback( this.collisonList[i]  );
            this.shutdownVisualGameObject( GameGlobal.g_GameObjectManager );
          }
      }
  }
  
  /**
   *  checkCollison
   *  检查当前的状态是否发生了碰撞
   * ***/
  checkCollison( collisonList , cb ){
    this.collisonList = collisonList ||[];
    this.collisonCallback = cb || function(){};
}
}
