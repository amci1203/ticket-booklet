import $ from 'jquery';

export default function Inject (callback) {
    const 
        partialViews  = $('._partial'),
        viewsRoot     = 'views/',
        numViews      = partialViews.length,
        wait          = 150;
    let 
        viewsInjected = 0;
    
    function findView (string) { return `${viewsRoot}${string}.html` }
    
    function fetchFiles () {
        if (numViews > 0) {
            partialViews.each(function () {
                if (this.hasAttribute('data-view')) {
                    const view = findView( $(this).attr('data-view') );
                    get.call(this, view);
                }
                else if (this.hasAttribute('data-view-all')) {
                    const val    = $(this).attr('data-view-all'),
                          folder = val.slice(0, val.indexOf('[')).trim(),
                          views  = JSON.parse(val.string(val.indexOf('[')));
                    getAll.call(this, folder, ...views);
                }
            })
        }
        else return false;
    }
    
    function fetchNestedFiles (partial) {
        const parentFolderNames = partial.attr('data-view').split('/'),
              numParentFolders  = partial.length - 1,
              nestedInclusions  = partial.find('._partial');
        if (nestedInclusions.length > 0) {
            nestedInclusions.each(function () {
                const relativePath = $(this).attr('data-view').split('/');
                let goUp = 0;
                relativePath.forEach(string => { if (string == '..') goUp++ } );
                const fixedRelativePath = relativePath.filter(string => string != '..');

                const parentPath = () => {
                    let i = 0, str = '';
                    for (i = 0; i > numParentFolders - goUp; i++) { str+= parentFolderNames[i] }
                    return str;
                }

                get.call(this, findView([...parentPath, ...fixedRelativePath].join('/')) );
            })
        }
        else return false;
    }
    
    function incrementViewsInjected () {
        viewsInjected++;
        if (viewsInjected == numViews) {
            setTimeout(callback, wait)
        };
    }
    
    function get (path) {
        $.get(path)
            .done(data => $(this).html(data))
            .fail(err => {})
            .always(() => {
                setTimeout( fetchNestedFiles.bind(this, $(this)), wait );
                incrementViewsInjected();
            })
    }
    
    function getAll (folder, ..._views) {
        const views    = [..._views],
              numViews = views.length;
        let html = '';
        views.forEach(view => {
            const path = `${folder}/${view}`;
            $.get(path)
                .done(data => html += data)
                .fail(err => {})
                .always(() => {
                    setTimeout( fetchNestedFiles.bind(this, $(this)), wait )
                });
        })
        $(this).html(data)
        setTimeout(incrementViewsInjected, wait);
    }
    
    return (fetchFiles())
    
}