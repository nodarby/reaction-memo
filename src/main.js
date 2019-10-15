//モジュール読み込み
const {app, BrowserWindow} = require('electron')

//メインウィンドウ
let mainWindow;

function createWindow(){
  //メインウィンドウを作成
  mainWindow = new BrowserWindow({
    webPreferences:{
      nodeIntegration: true,
    },
    width: 800, height: 600,
  });

  //メインウィンドウに表示するURLを指定
  //index.htmlを指定
  mainWindow.loadFile('index.html');

  //デベロッパーツールの起動
  mainWindow.webContents.openDevTools();

  //メインウィンドウが閉じられた時の処理
  mainWindow.on('closed',()=>{
    mainWindow = null;
  });
}

//初期化が完了した時の処理
app.on('ready',createWindow);

//全てのウィンドウが閉じた時の処理
app.on('window-all-closed', () => {
  //Mac以外ではアプリケーション終了
  if (process.platform !== 'darwin'){
    app.quit();
  }
});
//アプリケーションがアクティブになった時(MacだとDockがクリックされた時)
app.on('active', () => {
  //メインウィンドウが消えている場合は再度メインウィンドウを作成する
  if (mainWindow === null){
    createWindow();
  }
})
