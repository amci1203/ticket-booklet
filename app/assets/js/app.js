import $ from 'jquery';

import Menu         from './modules/Menu';
import Injector     from './modules/Injector';
import ScrollSpy    from './modules/ScrollSpy';
import StickyHeader from './modules/StickyHeader';

function init () {
    Menu();
    ScrollSpy();
    StickyHeader();
}

$(document).ready(Injector.bind(window, init))