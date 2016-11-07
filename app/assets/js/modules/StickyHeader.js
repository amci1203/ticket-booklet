import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
    constructor () {
        this.header = $('.header');
        this.triggerElement = $('.large-hero__title');
        this.setHeaderWaypoint();
    }
    setHeaderWaypoint() {
        let head = this;
        new Waypoint({
            element: head.triggerElement[0],
            handler: function () {
                head.header.toggleClass('header--dark');
            }
        })
    }
}

export default StickyHeader;
