import $ from 'jquery';

import Menu         from './modules/Menu';
import Inject         from './modules/Injector';
import ScrollSpy    from './modules/ScrollSpy';
import StickyHeader from './modules/StickyHeader';

function init () {
    Menu();
    ScrollSpy();
    StickyHeader();
}

$(document).ready(Inject.bind(init))