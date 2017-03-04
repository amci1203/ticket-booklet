import $         from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

export default function RevealOnScroll (selector, waypointOffset, doesZoom) {
    const toReveal = $(selector.trim()),
          offset   = waypointOffset,
          zooms    = doesZoom == undefined ? true : doesZoom;

    return (() => {
        if (zooms) {
            toReveal.addClass('reveal-item');
        } else {
            toReveal.addClass('reveal-item--no-zoom');
        }
        toReveal.each(function () {
            let currentItem = this;
            new Waypoint({
                element : currentItem,
                offset  : offset,
                handler : () => {
                    if (zooms) {
                        $(currentItem).addClass('reveal-item--visible');
                    } else {
                        $(currentItem).addClass('reveal-item--no-zoom--visible');
                    }
                }
            })
        })
    })()
}
