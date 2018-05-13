import VisualGameObject from '../base/VisualGameObject'


/**
    A test class to demonstrate the use of the VisualGameObject class
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
export default class Plane extends VisualGameObject
{
  constructor(){
    super();
    this.x = GameGlobal.screenWidth / 2;
    this.y = GameGlobal.screenWidth / 2;
    /** The movement direction  in the x axis
      @type Number
    */
			this.xDirection = 1;
			
			/** The width of target
      @type Number
    */
			this.width = 90;

			/** The height of target
      @type Number
     */
			this.height = 90;
      /** The movement direction  in the x axis
            @type Number
        */
      this.yDirection = 1;

      /**
       * collisonList  
       * 碰撞检测列表
       * ***/
      this.collisonList = [];

      /**
       * collisonCallback
       * 碰撞了之后的回调
       * ** */
      this.collisonCallback = null;


      let that = this;
      this.image = wx.createImage();
      this.image.onload = function( img ){
        that.x      = Math.floor( ( GameGlobal.screenWidth  - that.width ) / 2);
        that.y      = Math.floor( ( GameGlobal.screenHeight - that.height) - 20  );
        that.start();   
      }
      this.image.src = './images/hero.png';


	  return this;
  }
	
	
	/**
        Initialises this object
        @return A reference to the initialised object
    */
  start( )
	{
		this.startupVisualGameObject( GameGlobal.g_GameObjectManager ,this.image, this.x , this.y , 1);
    this.bindEvent();

    return this;
  }
  

  /**
   *  getPosition
   *  获取当前的飞机的位置
   * ***/
  getPosition(){
      return {
        x : this.x + ( this.width / 2 ),
        y : this.y
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
	
	/**
        Updates the object
        @param dt The time since the last frame in seconds
        @param context The drawing context 
        @param xScroll The global scrolling value of the x axis  
        @param yScroll The global scrolling value of the y axis 
    */
	update(/**Number*/ dt, /**CanvasRenderingContext2D*/context, /**Number*/ xScroll, /**Number*/ yScroll)
	{
      //每次都检查当前的飞机是否和敌机发生碰撞了
      for( let i  = 0 ; i < this.collisonList.length ; i++){
          if( this.isCollideWith( this.collisonList[i] ) ){
            this.collisonCallback && this.collisonCallback( this.collisonList[i] );
          }
      }
  }
  
  //绑定方法
  bindEvent(){
    
    let that = this;
    
    //点击了之后
    GameGlobal.g_GameObjectManager.canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault();

      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;

      if ( this.checkIsFingerOnAir(x, y) ) {
          this.touched = true;
          this.disx = x - this.x;
          this.disy = y - this.y;
      }

    }).bind(this))

    //移动的时候
    GameGlobal.g_GameObjectManager.canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault();

      if ( this.touched ){
        this.x = e.touches[0].clientX - this.disx;
        this.y = e.touches[0].clientY - this.disy;

        //检查当前的x，y是否超出边界了，如果超过的话，要限定边界
        if( this.x <= 0 ){this.x = 0;}
        if( this.y <= 0 ){this.y = 0;}
        if( this.x + this.width > GameGlobal.screenWidth ){ this.x = GameGlobal.screenWidth - this.width;}
        if( this.y + this.height > GameGlobal.screenHeight ){ this.y = GameGlobal.screenHeight - this.height;}
      }

    }).bind(this));

    //手移开的时候
    GameGlobal.g_GameObjectManager.canvas.addEventListener('touchend', ((e) => {
      e.preventDefault();

      this.touched = false;
      this.disx = 0;
      this.disy = 0;
    }).bind(this));
  }

  checkIsFingerOnAir( x , y ){
    const deviation = 30

    return !!(   x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation  )

  }
}
