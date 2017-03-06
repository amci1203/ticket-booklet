import $ from 'jquery';

export default function Injector (callback) {
    const 
        pageViews     = $('._page'),
        partialViews  = $('._partial'),
        partialsRoot  = 'views/partials/',
        pagesRoot     = 'views/',
        numViews      = partialViews.length + pageViews.length,
        wait          = 150;
    let 
        viewsInjected = 0;
    
    function findPartial (string) {
        return `${partialsRoot}${string}.html`;
    }
    function findPage (string) {
        return `${pagesRoot}${string}.html`;
    }
    
    function fetchFiles () {
        function iterate () {
            if (this.hasAttribute('data-view')) {
                const path = $(this).attr('data-view'),
                      view = $(this).hasClass('_partial') ? findPartial(path) : findPage(path);
                get.call(this, view);
            }
            else if (this.hasAttribute('data-view-all')) {
                const val    = $(this).attr('data-view-all'),
                      folder = val.slice(0, val.indexOf('[')).trim(),
                      views  = JSON.parse(val.substring(val.indexOf('[')));
                console.log({val, folder, views})
                getAll.call(this, folder, ...views);
            }
        }
        if (numViews > 0) {
            partialViews.each(iterate);
            pageViews.each(iterate);
        }
        else return false;
    }
    
    function fetchNestedFiles (specPath) {
        const
            pathToUseAsParent = specPath ? specPath : $(this).attr('data-view'),
            parentFolderNames = pathToUseAsParent.split('/').filter(str => str != '..').slice(0, -1),
            numParentFolders  = parentFolderNames.length,
            nestedInclusions  = $(this).find('._partial, ._page');
        
        if (nestedInclusions.length > 0) {
            nestedInclusions.each(function () {
                const
                    isPartial       = $(this).hasClass('_partial'),
                    nestedPath      = pathToUseAsParent.split('/'),
                    fixedNestedPath = nestedPath.filter(str => str != '..'),
                    dirsUp          = nestedPath.filter(str => str == '..').length,

                    numParentDirs     = numParentFolders - dirsUp,
                    dirInboundOfViews = numParentDirs >= 0,
                    parentPath        = dirInboundOfViews ? parentFolderNames.slice(0, numParentDirs) : [],
                    realPath          = nestedPath[0] != '' ? [...parentPath, ...fixedNestedPath] : nestedPath,
                    view              = isPartial ? findPartial(realPath.join('/')) : findPage(realPath.join('/'));
                
                const vars = { isPartial, parentFolderNames, numParentFolders, nestedPath, fixedNestedPath, dirsUp, numParentDirs, dirInboundOfViews, parentPath, view}
                console.log(vars)
                
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
                setTimeout( fetchNestedFiles.bind(this), wait );
                incrementInjectionsDone();
            })
    }
    
    function getAll (folder, ..._views) {
        const views    = [..._views],
              numViews = views.length;
        let html = '';
        views.forEach((view, index) => {
            const path     = `${folder}/${view}`,
                  realPath = findView(path);
            $.get(realPath)
                .done(data => html += data)
                .fail(err => {})
                .always(() => {
                    setTimeout( fetchNestedFiles.bind(this, path), wait )
                    if (index + 1 == numViews) {
                        $(this).html(html)
                        incrementInjectionsDone();
                    }
                });
        })
    }
    
    return (fetchFiles())
    
}