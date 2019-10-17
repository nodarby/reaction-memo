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
    //editor.getSession().setMode('ace/mode/javascript')
    editor.setTheme('ace/theme/twilight')

    //今までの頑張りをロード
    document.querySelector('#btnLoad').addEventListener('click', () => {
        openLoadFile();
    })
    //今回の頑張りを保存
    document.querySelector('#btnSave').addEventListener('click', () => {
        saveFile();
    })

    document.onkeydown =
        function (e) {
            if (((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && e.keyCode === 83) {
                celebrate();
                document.getElementById( 'sound-file' ).play();
            }
        }


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


//ファイルを保存する
function saveFile() {

    //読み込みを行なっていない場合は新規ファイル作成
    if (currentPath === '') {
        saveNewFile();
        return;
    }

    const win = BrowserWindow.getFocusedWindow();

    dialog.showMessageBox(win, {
        title: 'ファイルの保存を行います。',
        type: 'info',
        buttons: ['OK', 'Cancel'],
        detail: '本当に保存しますか？'
    },
        //メッセージボックスが閉じられた後
        (response) => {
            if (response === 0){
                const data = editor.getValue();
                writeFile(currentPath, data);
            }
        }
    )
}

//ファイルの書き込み
function writeFile(path, data){
    fs.writeFile(path, data, (error) => {
        if (error != null) {
            alert('error : ' + error);
        }
    })
}

//新規ファイルの保存
function saveNewFile(){
    const win = BrowserWindow.getFocusedWindow();
    dialog.showSaveDialog(
        win,
        // どんなダイアログを出すかを指定するプロパティ
        {
            properties: ['openFile'],
            filters: [
                {
                    name: 'Documents',
                    extensions: ['txt', 'text', 'html', 'js']
                }
            ]
        },
        // セーブ用ダイアログが閉じられた後のコールバック関数
        (fileName) => {
            if (fileName) {
                const data = editor.getValue();
                currentPath = fileName;
                writeFile(currentPath, data);
            }
        }
    );
}