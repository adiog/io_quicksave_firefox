// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function convert_get_method_parameters_to_url_suffix(parameters) {
    let url_suffix = '';

    for (let key in parameters) {
        let parameter = key + '=' + encodeURIComponent(parameters[key]);

        if (url_suffix == '') {
            url_suffix += '?' + parameter;
        }
        else {
            url_suffix += '&' + parameter;
        }
    }

    return url_suffix;
}


function requestOnLoad(request, successCallback, failureCallback)
{
    return function() {
        log(request);
        if (request.status == 200) {
            try {
                parsedResponseText = JSON.parse(this.responseText);
            }
            catch (e) {
                parsedResponseText = {'message': this.responseText};
            }
            successCallback(parsedResponseText);
        }
        else if (failureCallback != null) {
            try {
                parsedResponseText = JSON.parse(this.responseText);
            }
            catch (e) {
                parsedResponseText = {'message': this.responseText};
            }
            failureCallback(parsedResponseText);
        }
        else {
            // silent failure
            log('request failure suppressed onLoad');
        }
    };
}

function requestOnError(errorCallback, failureCallback)
{
    return function(e) {
        log(e);
        if (errorCallback != null)
        {
            errorCallback(e);
        }
        else if (failureCallback != null)
        {
            failureCallback(e);
        }
        else {
            // silent failure
            log('request failure suppressed onError');
        }
    };
}

const Request = {
    json_get:
        function (url, parameters, successCallback, failureCallback = null, errorCallback = null)
        {
            let request = new XMLHttpRequest();

            let url_with_parameters = url + convert_get_method_parameters_to_url_suffix(parameters);

            request.open("GET", url_with_parameters, true);

            request.onload = requestOnLoad(request, successCallback, failureCallback);

            request.onerror = requestOnError(errorCallback, failureCallback);

            request.withCredentials = true;

            request.send();
        },

    json_post:
        function (url, parameters, successCallback, failureCallback = null, errorCallback = null)
        {
            let request = new XMLHttpRequest();

            request.open("POST", url, true);

            request.onload = requestOnLoad(request, successCallback, failureCallback);

            request.onerror = requestOnError(errorCallback, failureCallback);

            request.withCredentials = true;

            request.send(JSON.stringify(parameters));
        },

    basic_auth_json_post:
        function (username, password, url, parameters, successCallback, failureCallback = null, errorCallback = null)
        {
            log(username, password, url);

            let request = new XMLHttpRequest();

            request.open("POST", url, true);

            request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));

            request.onload = requestOnLoad(request, successCallback, failureCallback);

            request.onerror = requestOnError(errorCallback, failureCallback);

            request.withCredentials = true;

            request.send(JSON.stringify(parameters));
        }
};