const fs = require("fs")
const {BrowserWindow,dialog} = require('electron').remote

let inputArea = null;
let inputTxt = null;
let footerArea = null;

let currentPath = '';
let editor = null;

window.addEventListener('DOMContentLoaded', onLoad)

//Webページ読み込み時
function onLoad(){
    //入力関連領域
    inputArea = document.getElementById('input_area')
    //入力領域
    inputTxt = document.getElementById('input_txt')
    //フッター領域
    footerArea = document.getElementById('footer')

    editor = ace.edit('input_txt')
    editor.getSession().setMode('ace/mode/javascript')
    //editor.setTheme('ace/theme/twilight')

    //今までの頑張りをロード
    document.querySelector('#btnLoad').addEventListener('click', () => {
        openLoadFile();
    })

}

//ファイルを開きます
function openLoadFile(){
    const win = BrowserWindow.getFocusedWindow();

    dialog.showOpenDialog(
        win,
        //ダイアログの内容を指定
        {
            properties: ['openFile'],
            filters: [
                {
                    name:'Documents',
                    extensions: ['txt', 'text', 'html', 'js']
                }
            ]
        },
        //閉じた後のコールバック変数
        (fileNames) => {
            if (fileNames) {
                readFile(fileNames[0]);
            }
        });
}

//読み込んだファイルを入力エリアに表示
function readFile(path) {
    currentPath = path;
    fs.readFile(path, (error, text) => {
        if (error != null) {
            alert('error : ' + error);
            return;
        }
        //フッター部分に読み込みファイルのパスを設定
        footerArea.innerHTML = path;
        //テキスト入力エリアに設定
        editor.setValue(text.toString(), -1)
    })
}