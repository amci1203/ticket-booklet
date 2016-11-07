import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
///////////////////////////////////////////////////////////////////////////////
class RevealOnScroll {
    constructor (selector, waypointOffset) {
        this.toReveal = $(selector);
        this.offset = waypointOffset;
        this.hide();
        this.createWaypoints();
    }
    hide () {
        this.toReveal.addClass('reveal-item');
    }
    createWaypoints () {
        let instance = this;
        this.toReveal.each(function () {
            let currentItem = this;
            new Waypoint({
                element: currentItem,
                offset: instance.offset,
                handler: function () {
                    $(currentItem).addClass('reveal-item--visible');
                }
            })
        })
    }
}

export default RevealOnScroll;
