import $ from 'jquery';

export default function Inject (callback, nested) {
    const partialViews  = $('._partial'),
          numViews      = partialViews.length,
          views         = nested ? `${location.pathname}` : 'views/',
          findView      = string => `${views}${string}.html`;
    let viewsInjected = 0;
    
    function fetchFiles () {
        partialViews.each(function () {
            const view = findView( $(this).attr('data-view') );
            $.get(view)
            .done(data => $(this).html(data))
            .fail(err => {})
            .always(() => {
                viewsInjected++;
                if (viewsInjected == numViews) {
                    setTimeout(callback, 200)
                };
            })
        })
    }
    return (() => {
        if (numViews > 0) fetchFiles()
    })()
    
}