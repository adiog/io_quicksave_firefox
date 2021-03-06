// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function notify_success(message)
{
    browser.notifications.create('qs', {
        'type': 'basic',
        'iconUrl': 'icon_green.png',
        'title': 'quicksave.io',
        'message': message
    });
}

function notify_failure(message)
{
    browser.notifications.create('qs', {
        'type': 'basic',
        'iconUrl': 'icon_red.png',
        'title': 'quicksave.io',
        'message': message
    });
}

function do_item_create_request(tab, item_type, title) {
    let source_url = tab.url;
    let source_title = tab.title;

    API.create(
        {
            'meta_type': item_type,
            'name': source_title,
            'text': title,
            'source_url': source_url,
            'source_title': source_title
        },
        function (data) {
            if (data.item.meta.meta_hash) {
                notify_success('Item was saved (meta_hash: ' + data.item.meta.meta_hash + ').');
            }
            else {
                notify_failure('Item was not saved (' + data.message + ').');
            }
        },
        function (data) {
            notify_failure('Item was not saved (' + data.message + ').');
        }
    );
}

function context_menu_page_callback(info, tab)
{
    let title = info.pageUrl;
    let item_type = 'page';
    do_item_create_request(tab, item_type, title);
}

function context_menu_link_callback(info, tab)
{
    let title = info.linkUrl;
    let item_type = 'link';
    do_item_create_request(tab, item_type, title);
}

function context_menu_selection_callback(info, tab)
{
    let title = info.selectionText;
    let item_type ='selection';
    do_item_create_request(tab, item_type, title);
}

function context_menu_image_callback(info, tab)
{
    let title = info.srcUrl;
    let item_type = 'image';
    do_item_create_request(tab, item_type, title);
}

function context_menu_audio_callback(info, tab)
{
    let title = info.srcUrl;
    let item_type = 'audio';
    do_item_create_request(tab, item_type, title);
}

function context_menu_video_callback(info, tab)
{
    let title = info.srcUrl;
    let item_type = 'video';
    do_item_create_request(tab, item_type, title);
}

function toolbar_button_callback()
{
    browser.tabs.query(
        {
            active: true,
            lastFocusedWindow: true
        },
        function(tabs)
        {
            let tab = tabs[0];
            let title = tab.url;
            let item_type = 'page';
            do_item_create_request(tab, item_type, title);
        }
    );
}
