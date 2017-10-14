// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function LoginForm() {
    loggedDom = LabeledIconButton('inverted negative sign out', 'Logout');
    var userDom;

    function pingLoggedCallback(response) {
        passwordDom.value = '';
        usernameDom.value = response.message;
        userDom = LabeledIconButton('user', response.message);
        if (notLoggedDom.parentNode)
            notLoggedDom.parentNode.replaceChild(loggedDom, notLoggedDom);
        passwordDom.placeholder = 'logged succesfully';
        loginPassword.parentNode.replaceChild(userDom, loginPassword);
    }

    function pingNotLoggedCallback() {
        console.log('not logged');
    }

    function logoutSuccessCallback() {
        if (loggedDom.parentNode)
            loggedDom.parentNode.replaceChild(notLoggedDom, loggedDom);
        passwordDom.placeholder = 'password..';
        userDom.parentNode.replaceChild(loginPassword, userDom);
    }

    function statusCheck() {
        API.session_check(pingLoggedCallback);
    }

    function submitSuccessCallback(response) {
        API.put_token(response.token, function () {
            console.log('logged');
        }, function () {
            console.log('not logged')
        });
    }

    function submitCallback(apiDom, usernameDom, passwordDom) {
        //localStorageSetItem('api.quicksave.io', apiDom.value);
        //chrome.extension.getBackgroundPage().console.log('kuku');
        API.login(usernameDom.value, passwordDom.value, submitSuccessCallback);
    }

    function logoutCallback() {
        API.ping(function(tokenBean) {
            console.log(tokenBean);
            API.delete_token(tokenBean.token, function () {
                logoutSuccessCallback();
            });
        });
    }


    let formDom =
        $$(div({style: 'padding: 10px;'}), $$(form({class: 'ui form segment'}),
            $$(div({class: 'field'}),
                $$$(label(), 'API url'),
                apiDom = input({type: 'text'})
            ),
            loginPassword = $$(div(),
                $$(div({class: 'field'}),
                    $$$(label(), 'Username'),
                    usernameDom = input({placeholder: 'username', name: 'username', type: 'text'})
                ),
                $$(div({class: 'field'}),
                    $$$(label(), 'Password'),
                    passwordDom = input({placeholder: 'password', name: 'password', type: 'password'})
                ))),
            $$(div({style: 'text-align: center;'}),
                notLoggedDom = LabeledIconButton('sign in primary', 'Login'),
                notificationArea = div()
            )
        );


    statusCheck();

    //$BIND(notLoggedDom, 'click', function (ev) {
    //    submitCallback(apiDom, usernameDom, passwordDom)
    //});
    //$BIND(loggedDom, 'click', function (ev) {
    //    logoutCallback();
    //});

    return formDom;
}