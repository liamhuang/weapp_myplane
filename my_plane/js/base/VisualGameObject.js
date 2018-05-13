import GameObject from './GameObject';
/**
    The base class for all elements that appear in the game.
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
export default class VisualGameObject extends GameObject
{
    constructor(){
      super();
      /**
           The image that will be displayed by this object
          @type Image
      */
      this.image = null;

      /**
        * width
        * @type number     
      */
      this.width = 0;
      
      /**
        * height
        * @type number
      */
      this.height = 0;
    }
   
    
    /**
        Draws this element to the back buffer
        @param dt Time in seconds since the last frame
    */
    draw(/**Number*/ dt, /**CanvasRenderingContext2D*/ context, /**Number*/ xScroll, /**Number*/ yScroll)
    {
        
        context.drawImage(this.image, this.x - xScroll, this.y - yScroll, this.width, this.height);
        
    }
    
    /**
        Initialises this object
        @param gameObjectManager 游戏管理器
        @param image  将要绘制的游戏图片
        @param x     图片的x坐标
        @param y     图片的y坐标
        @param z     图片的层级

    */
    startupVisualGameObject(/**gameObjectManager**/ gameObjectManager,/**Image*/ image, /**Number*/ x, /**Number*/ y, /**Number*/ z)
    {
        this.startupGameObject( gameObjectManager , x, y, z);
        this.image = image;
        return this;
    }
    
    /**
        Clean this object up
    */
    shutdownVisualGameObject( /**gameObjectManager**/ gameObjectManager )
    {
        this.shutdownGameObject( /**gameObjectManager**/ gameObjectManager);
    }

    /**
     *  onEvent
     *  
     *  事件响应方法集合
     * **/
    onEvent( type , evt ){
        //这里是空方法，需要在使用的时候重载
    }

    isCollideWith( tar ){
        let tarX = tar.x + tar.width / 2;
        let tarY = tar.y + tar.height / 2;
        
        let curX = this.x + this.width /2;
        let curY = this.y + this.height /2;

        return !!( tarX >= this.x
                && tarX <= this.x + this.width
                && tarY >= this.y
                && tarY <= this.y + this.height ) || !!( curX >= tar.x && curX <= tar.x + tar.width && curY >= tar.y && curY < tar.y + tar.width)
    }
}
