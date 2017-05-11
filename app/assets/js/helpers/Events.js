export default (function Events () {
    const
        // event shorthands
        _event     = (type, elm, func) => elm.addEventListener(type, func),
        click     = _event.bind(this, 'click'),
        change    = _event.bind(this, 'change'),
        clickEach = (list, func) => [...list].forEach(elm => click(elm, func));


    return { event, click, change, clickEach }
})()
