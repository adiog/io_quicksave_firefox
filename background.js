// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

browser.contextMenus.create(
    {
        'title': 'quicksave page',
        'contexts': ['page'],
        'onclick': context_menu_page_callback
    }
);

browser.contextMenus.create(
    {
        'title': 'quicksave link',
        'contexts': ['link'],
        'onclick': context_menu_link_callback
    }
);

browser.contextMenus.create(
    {
        'title': 'quicksave selection',
        'contexts': ['selection'],
        'onclick': context_menu_selection_callback
    }
);

browser.contextMenus.create(
    {
        'title': 'quicksave image',
        'contexts': ['image'],
        'onclick': context_menu_image_callback
    }
);

browser.contextMenus.create(
    {
        'title': 'quicksave audio',
        'contexts': ['audio'],
        'onclick': context_menu_audio_callback
    }
);

browser.contextMenus.create(
    {
        'title': 'quicksave video',
        'contexts': ['video'],
        'onclick': context_menu_video_callback
    }
);

browser.browserAction.onClicked.addListener(toolbar_button_callback);