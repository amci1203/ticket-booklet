import $ from 'jquery';
import _ from '../vendor/lodash.min';

import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

export default function StickyHeader (_disappears) {
    const
        nav                  = document.getElementById('primary-nav'),
        trigger              = nav,
        interval             = 200,
        requiredConsecutives = 3,
        disappears           = _disappears || false
    let
        prevScroll           = 0,
        consecutives         = 2,
        prevDirection        = 'down';

    function handleScroll (event) {
        const scroll    = $(window).scrollTop(),
              direction =  scroll > prevScroll ? 'down' : 'up';
        if (direction == prevDirection) {
            consecutives++;
        } else consecutives = 0;
        if (consecutives == requiredConsecutives) {
            if (direction === 'up') {
                nav.classList.add('visible');
            } else {
                nav.classList.remove('visible');
            }
        } else prevDirection = direction;

        prevScroll = scroll;
    }

    function setWaypoint () {
        new Waypoint({
            element : trigger,
            handler : () => {
                document.body.classList.toggle('sticky-top');
                nav.classList.toggle('primary-nav--fixed');
            }
        });
    }
    
    function setDisplayState () {
        if (!disappears) nav.classList.add('visible')
    }
    
    return (() => {
        setWaypoint();
        setDisplayState();
        if (disappears) $(window).scroll(_.throttle(handleScroll, interval))
    })()
}
