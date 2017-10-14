// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

const OAuth = {
    token_get:
        function(username, password, expireTime, successCallback, failureCallback=null, errorCallback=null)
        {
            log(username, password);
            Request.basic_auth_json_post(username, password, env.HTTPS_OAUTH_QUICKSAVE_IO + '/token/get', {expireTime: expireTime}, successCallback, failureCallback, errorCallback);
        },

    token_delete:
        function(token, successCallback, failureCallback=null)
        {
            Request.json_post(env.HTTPS_OAUTH_QUICKSAVE_IO + '/token/delete', {token: token}, successCallback, failureCallback);
        },

    token_check:
        function(token, successCallback, failureCallback=null)
        {
            Request.json_post(env.HTTPS_OAUTH_QUICKSAVE_IO + '/token/check', {token: token}, successCallback, failureCallback);
        },
};

const API = {

    token_put:
    function(token, successCallback, failureCallback=null)
    {
        Request.json_post(env.HTTPS_API_QUICKSAVE_IO + '/token/put', {token: token}, successCallback, failureCallback);
    },

    session_check:
    function(successCallback, failureCallback=null)
    {
        Request.json_get(env.HTTPS_API_QUICKSAVE_IO + '/session/check', {}, successCallback, failureCallback)
    },

    session_delete:
        function(successCallback, failureCallback=null)
        {
            Request.json_get(env.HTTPS_API_QUICKSAVE_IO + '/session/delete', {}, successCallback, failureCallback)
        },

    create:
    function(meta, successCallback)
    {
        Request.json_post(env.HTTPS_API_QUICKSAVE_IO + '/create', {'meta': meta}, successCallback);
    },

    retrieve:
    function(success_callback, query)
    {
        Request.json_post(env.HTTPS_API_QUICKSAVE_IO + '/retrieve', {'query': query}, success_callback);
    },

    meta_update:
    function(meta, succesCallback)
    {
        Request.json_post(env.HTTPS_API_QUICKSAVE_IO + '/meta/update', {meta: meta}, succesCallback);
    },

    meta_delete:
    function(meta_hash, succesCallback)
    {
        Request.json_post(env.HTTPS_API_QUICKSAVE_IO + '/meta/delete', {meta_hash: meta_hash}, succesCallback);
    },

    tag_create:
    function(tag, successCallback)
    {
        delete tag['tag_hash'];
        Request.json_post(env.HTTPS_API_QUICKSAVE_IO + '/tag/create', {'tag': tag}, successCallback);
    },

    tag_update:
    function(tag, successCallback)
    {
        Request.json_post(env.HTTPS_API_QUICKSAVE_IO + '/tag/update', {'tag': tag}, successCallback);
    },

    tag_delete:
    function(tag_hash, successCallback)
    {
        Request.json_post(env.HTTPS_API_QUICKSAVE_IO + '/tag/delete', {'tag_hash': tag_hash}, successCallback);
    }
};

const CDN = {

    token_put: function (token, successCallback, failureCallback = null) {
        Request.json_post(env.HTTPS_CDN_QUICKSAVE_IO + '/token/put', {token: token}, successCallback, failureCallback);
    },
};