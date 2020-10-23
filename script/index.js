let host = window.location.hostname;
let socket = io('http://'+host);
let code_1 = document.getElementById('code_top');
let code_2 = document.getElementById('code_help');
let body = document.getElementById('body');
let helper = document.getElementById('helper');
let disconnect_box = document.getElementById('disconnect');
let censor_box = document.getElementById('censor_box');
let ip = document.getElementById('ip');
socket.on("connect", function () {
    socket.emit('webConnect', 'null');
    body.classList.remove('connected');
    helper.classList.remove('hide');
    disconnect_box.classList.remove('unhide');
});
socket.on("message", function (data) {
    console.log("Message form server: " + data)
});
socket.on("disconnect", function (message) {
    console.log('disconnected: ' + message);
    disconnect_box.classList.add('unhide');
});

socket.on("state", function (message) {
    console.log('state: ' + message);
    body.classList.add('connected');
    helper.classList.add('hide');
    if (message === "0" || message === "3") {
        if (message == "3") {
            censor_box.classList.add("size");
        } else {
            censor_box.classList.remove("size");
        }
        censor_box.classList.remove("hide");
    } else {
        censor_box.classList.add("hide");
    }
});
socket.on("lobby", function (message) {
    let data = JSON.parse(message);
    console.log('lobby: ' + message);
});
socket.on("player", function (message) {
    console.log('player: ' + message);
});
socket.on("getcode", function (message) {
    console.log('connected with id: ' + message);
    code_1.innerHTML = 'Connect Code: <a class="highlight" href="aucapture://'+host+'/'+message+'">'+message+'</a>';
    code_2.innerHTML = message;
});

ip.innerHTML = "http://" + host + "/";