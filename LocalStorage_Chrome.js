// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

let default_config = {
    'api.quicksave.io': 'https://api.quicksave.io',
    'oauth.quicksave.io': 'https://oauth.quicksave.io',
    'token': ''
};

function localStorageSetItem(key, value)
{
    browser.extension.getBackgroundPage().console.log(key);
    browser.extension.getBackgroundPage().console.log(value);
    browser.storage.sync.get(
        default_config,
        function(storage) {
            browser.extension.getBackgroundPage().console.log(storage);
            storage[key] = value;
            browser.extension.getBackgroundPage().console.log(storage);

            browser.storage.sync.set(storage);
        }
    );
}

function localStorageWithItem(key, bindCallback)
{
    browser.extension.getBackgroundPage().console.log(key);
    browser.storage.sync.get(
        default_config,
        function(storage) {
            browser.extension.getBackgroundPage().console.log(storage);
            bindCallback(storage[key])();
        }
    );
}

