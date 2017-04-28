export default function Accordion (_id, _isNotPanels) {
    const
        selector  = _id.trim(),
        element   = document.getElementById(selector),
        carets    = element.querySelectorAll(`.accordion-panel__caret`),
        triggers  = element.querySelectorAll(`.accordion-panel__trigger`),
        headings  = element.querySelectorAll(`.accordion-panel__heading`),
        bodies    = element.querySelectorAll(`.accordion-panel__content`);

    function clickEach (elements, func) {
        elements.forEach(elm => elm.addEventListener('click', func));
    }

    function toggleAccordionPanel (event) {
        const
            trigger = event.target,
            parent  = trigger.parentElement,
            content = parent.getElementsByClassName('accordion-panel__content')[0],
            caret   = parent.getElementsByClassName('accordion-panel__caret')[0];

        content.classList.toggle('accordion-panel__content--open');
        if (caret) caret.classList.toggle('accordion-panel__caret--open');
        if (_isNotPanels) {
            if (content.classList.contains('accordion-panel__content--open')) {
                trigger.innerHTML = '(Show Less)';
            } else {
                trigger.innerHTML = '(Show More)';
            }
        }
    }

    return (function () {
        clickEach([...triggers, ...carets], toggleAccordionPanel)
    }())
}

