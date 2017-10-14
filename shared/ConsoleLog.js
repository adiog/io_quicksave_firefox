// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function do_log(o)
{
    if (window.browser && browser.runtime && browser.runtime.id)
    {
        browser.extension.getBackgroundPage().console.log(o);
    }
    else
    {
        console.log(o);
    }
}

function log()
{
    for(let i = 0; i < arguments.length; i++)
    {
        do_log(arguments[i]);
    }
}
