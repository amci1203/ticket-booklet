import $ from 'jquery';

export default function Injector (callback) {
    const 
        partialViews  = $('._partial'),
        viewsRoot     = 'views/',
        numViews      = partialViews.length,
        wait          = 150;
    let 
        viewsInjected = 0;
    
    function findView (string) {
        return `${viewsRoot}${string}.html`;
    }
    
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
        const parentFolderNames = partial.attr('data-view').split('/').filter(str => str != '..').slice(0, -1),
              numParentFolders  = parentFolderNames.length,
              nestedInclusions  = partial.find('._partial');
        if (nestedInclusions.length > 0) {
            nestedInclusions.each(function () {
                const 
                    nestedPath      = $(this).attr('data-view').split('/'),
                    fixedNestedPath = nestedPath.filter(str => str != '..'),
                    dirsUp          = nestedPath.filter(str => str == '..').length,

                    numParentDirs     = numParentFolders - dirsUp,
                    dirInboundOfViews = numParentDirs >= 0,
                    parentPath        = dirInboundOfViews ? parentFolderNames.slice(0, numParentDirs) : [],
                    realPath          = nestedPath[0] != '' ? [...parentPath, ...fixedNestedPath] : nestedPath,
                    view              = findView(realPath.join('/'));
                
                const vars = { parentFolderNames, numParentFolders, nestedPath, fixedNestedPath, dirsUp, numParentDirs, dirInboundOfViews, parentPath, view}
                console.log(vars);
                
                get.call(this, view);
            })
        }
        else return false;
    }
    
    function incrementInjectionsDone () {
        viewsInjected++;
        if (viewsInjected == numViews) { setTimeout(callback, wait) };
    }
    
    function get (path) {
        $.get(path)
            .done(data => $(this).html(data))
            .fail(err => {})
            .always(() => {
                setTimeout( fetchNestedFiles.bind(this, $(this)), wait );
                incrementInjectionsDone();
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
        setTimeout(incrementInjectionsDone, wait);
    }
    
    return (fetchFiles())
    
}