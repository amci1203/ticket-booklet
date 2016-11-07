import $ from 'jquery';
class MobileMenu {
    constructor () {
        this.icon = $('.header__menu-icon');
        this.content = $('.header__menu-content');
        this.background = $('.header');
        this.events();
    }
    events () {
        this.icon.click(this.toggleMenu.bind(this));
    }
    toggleMenu () {
        this.icon.toggleClass('header__menu-icon--close-x');
        this.content.toggleClass('header__menu-content--open');
        this.background.toggleClass('header--menu-open');
    }
}

export default MobileMenu;
