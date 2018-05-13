import VisualGameObject from '../base/VisualGameObject'


/**
    A test class to demonstrate the use of the VisualGameObject class
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
export default class Bg extends VisualGameObject
{
  constructor(){
      super();

      /**背景图片*/
      this.image = null;

			/** The width of target
      @type Number
      */
			this.width = 0;

			/** The height of target
      @type Number
     */
			this.height = 0;
      /** The movement direction  in the x axis
            @type Number
        */
      this.yDirection = 1;
      /** The movement speed
            @type Number
        */
      this.speed = 30;

      /**背景图片的顶部，定位当前从那里开始渲染，做滚动效果**/
      this.top = 0;

      this.image = wx.createImage();

      let that = this;
      this.image.onload = function( img ){
        that.width = img.currentTarget.width;
        that.height = img.currentTarget.height;
        that.startUp( img );
      }
      this.image.src = './images/bg.jpg';
      

	  return this;
  }
	
	
	/**
        Initialises this object
        @return A reference to the initialised object
    */
  startUp(image , speed )
	{
		this.startupVisualGameObject( GameGlobal.g_GameObjectManager , this.image , 0, 0, 0);
    
    return this;
	}
  
  //设定背景移动的速度
  setSpeed( sp ){
    this.speed = sp;
  }

  //重载渲染方法
  draw(/**Number*/ dt, /**CanvasRenderingContext2D*/ context, /**Number*/ xScroll, /**Number*/ yScroll){
    context.drawImage(
        this.image,
        0,
        0,
        this.width,
        this.height,
        0,
        -GameGlobal.screenHeight + this.top,
        GameGlobal.screenWidth,
        GameGlobal.screenHeight
      )

    context.drawImage(
        this.image,
        0,
        0,
        this.width,
        this.height,
        0,
        this.top,
        GameGlobal.screenWidth,
        GameGlobal.screenHeight
      )
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
      this.top += dt * this.speed;

      if ( this.top >= GameGlobal.screenHeight ){
        this.top = 0
      }
        
    
	}
}
