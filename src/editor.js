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
    editor.setTheme('ace/theme/twilight')


}