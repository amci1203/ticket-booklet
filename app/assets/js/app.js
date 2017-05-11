import $ from 'jquery';

import Injector          from './modules/Injector';

import MobileMenu         from './modules/MobileMenu';
import ScrollSpy          from './modules/ScrollSpy';
import StickyHeader       from './modules/StickyHeader';
import Inventory          from './modules/Inventory';
import FullScreenSection  from './modules/FullScreenSection';

function init () {
//    MobileMenu();
//    ScrollSpy();
//    StickyHeader(true);

    Inventory();
}

$(document).ready(Injector.bind(window, init))
