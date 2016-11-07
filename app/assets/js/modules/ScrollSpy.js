import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';

class ScrollSpy {
    constructor () {
        this.pageSections = $('.page-section');
        this.links = $('.primary-nav a');
        this.createSectionWaypoints();
        this.addSmoothScrolling();
        this.lazyImages = $('.lazyload');
        this.refreshWaypoints();
    }
    addSmoothScrolling () {
        this.links.smoothScroll();
    }
    refreshWaypoints () {
        this.lazyImages.load(function () {
            Waypoint.refreshAll();
        });
    }
    createSectionWaypoints () {
        let instance = this;
        this.pageSections.each(function () {
            let currentPageSection = this;
            new Waypoint({
                element: currentPageSection,
                offset: '18%',
                handler: function (direction) {
                    if (direction === 'down') {
                        if (instance.links.hasClass('current-link')) $('.primary-nav a').removeClass('current-link');
                        $(currentPageSection.getAttribute('data-link')).addClass('current-link');
                    }
                }
            })
            new Waypoint({
                element: currentPageSection,
                offset: '-40%',
                handler: function (direction) {
                    if (direction === 'up') {
                        if (instance.links.hasClass('current-link')) $('.primary-nav a').removeClass('current-link');
                        $(currentPageSection.getAttribute('data-link')).addClass('current-link');
                    }
                }
            })
        })
    }
}

export default ScrollSpy;
