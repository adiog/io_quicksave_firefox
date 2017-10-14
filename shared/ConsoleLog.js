/**
 * Created by adiog on 24.03.17.
 */

function do_log(o)
{
    if (window.chrome && chrome.runtime && chrome.runtime.id)
    {
        chrome.extension.getBackgroundPage().console.log(o);
    }
    else
    {
        console.log(o);
    }
}

var log =
    function()
{
    for(let i = 0; i < arguments.length; i++)
    {
        do_log(arguments[i]);
    }
}

