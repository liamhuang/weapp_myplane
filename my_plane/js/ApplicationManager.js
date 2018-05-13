
/**
 * ApplicationManager.js 
 * 1、整个游戏的控制器，控制各个元素的管理
 * 2、背景音乐的控制
 * 3、游戏逻辑，比如碰撞控制，数据控制
 * 
 **/
import './base/Utils'
import GameObjectManager from './base/GameObjectManager';
import Bg from './bg/Bg';
import Plane from './player/Plane';
import Bullet from './player/Bullet';
import Enemy from './npc/Enemy';
import Music from './music/Music';
import Util from './util/util'


GameGlobal.touchX = 0;
GameGlobal.touchY = 0;
GameGlobal.g_GameObjectManager = null;

/**
    The ApplicationManager is used to manage the application itself.
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
export default class ApplicationManager
{
    constructor(){

      //启动游戏引擎，开始不断的绘制
      GameGlobal.g_GameObjectManager = new GameObjectManager();
      GameGlobal.g_GameObjectManager.startupGameObjectManager();
     
      return this;
    }
    /**
        Initialises this object
        @return A reference to the initialised object
    */
    start()
    {
        this.bg =  new Bg();
        this.hero = new Plane();
        
        this.music = new Music()

        this.bulletList = [];
        this.enemyList  = [];
        let that = this;

        //定期发射子弹，让子弹自己飞
        this.bulletTimer = setInterval( function(){
          let pos = that.hero.getPosition();
          let bullet = new Bullet( pos.x , pos.y );
          that.bulletList.push( bullet );
          that.music.playShoot()

          bullet.checkCollison( that.enemyList , function( enemy ){
    
              that.music.playExplosion()
              that.enemyList.removeObject( enemy )
              enemy.explose()
          });
          
        } , 500 )

        //让敌机随机出现
        this.enemyTimer = setInterval( function(){

          let x = Math.random() * GameGlobal.screenWidth;
          that.enemyList.push( new Enemy( x  ) )
        
        } , 400 )

        //设定碰撞，检查主机体和哪些敌机碰撞了。碰撞了之后回调回来
        this.hero.checkCollison( this.enemyList , function( enemy ){
            Util.showModel( '',"游戏结束")
            that.stop();
        });
        
        return this;
    }

    /**
     * 重启游戏,需要清空原来的变量，然后重新再来一次，每个对象需要调用重启方法。
     * **/
    restart(){
      this.stop();
      
      //打开渲染引擎
      GameGlobal.g_GameObjectManager.startDraw();
      //游戏对象开始
      this.start();

    }

    /**
     * pause
     * 暂停游戏
     * *****/
    pause(){
        
        GameGlobal.g_GameObjectManager.stop();
    }

    continue(){

      GameGlobal.g_GameObjectManager.startDraw();
    }

    /**
     * stop
     * 游戏结束
     * ***/
    stop(){
      // //关闭当前的变量
       clearInterval( this.bulletTimer );
      // //关闭当前的敌人变量
       clearInterval( this.enemyTimer );

       //关闭动画
      GameGlobal.g_GameObjectManager.stop();

      this.hero.shutdownGameObject( GameGlobal.g_GameObjectManager );
      this.bg.shutdownGameObject( GameGlobal.g_GameObjectManager );
      this.bulletList.forEach( function( item ){ item.shutdownGameObject( GameGlobal.g_GameObjectManager )  });
      this.enemyList.forEach( function( item ){ item.shutdownGameObject( GameGlobal.g_GameObjectManager )  } );
      this.bulletList = [];
      this.enemyList = [];

    }

}

