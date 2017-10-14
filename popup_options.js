// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

//document.body.appendChild(LoginForm());

function submitSuccessCallback(response) {
    API.token_put(response.token, function () {
        browser.extension.getBackgroundPage().console.log('logged');
    }, function () {
        browser.extension.getBackgroundPage().console.log('not logged');

    });
}

function submitCallback(ev) {
    ev.preventDefault();
    usernameDom = document.getElementById('username');
    passwordDom = document.getElementById('password');
    OAuth.token_get(usernameDom.value, passwordDom.value, 3600, submitSuccessCallback);
}

submitButton = document.getElementById('submit');
submitButton.addEventListener('click', submitCallback);
