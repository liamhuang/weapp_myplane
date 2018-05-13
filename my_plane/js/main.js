import ApplicationManager from './ApplicationManager';

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.start()
    return this;
    
  }

  start() {
      GameGlobal.app = new ApplicationManager();
      GameGlobal.app.start();
  }
    
}
