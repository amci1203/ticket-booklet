import $         from 'jquery';
import smooth    from 'jquery-smooth-scroll';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

export default function ScrollSpy () {
    const pageSections = $('.page-section'),
          lazyImages   = $('.lazyload'),
          links        = $('.primary-nav a'),
          anchors      = $('.anchor');


    function sectionChange (section, direction, targetDirection) {
        if (direction == targetDirection) {
            const targetLink = `_${section.id}`;
            links.removeClass('current-link');
            document.getElementsByClassName(targetLink).classList.add('current-link');
        }
    }
    
    return (() => {
        pageSections.each(function () {
            let cs = this;
            new Waypoint({
                element : cs,
                offset  : '18%',
                handler : direction => sectionChange(cs, direction, 'down')
            })
            new Waypoint({
                element : cs,
                offset  : '-40%',
                handler : direction => sectionChange(cs, direction, 'up')
            })
        })

        links.smoothScroll();
        anchors.smoothScroll();
        
        lazyImages.load(() => Waypoint.refreshAll());
    })()
}
