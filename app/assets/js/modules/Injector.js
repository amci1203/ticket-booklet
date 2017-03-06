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
                          views  = JSON.parse(val.substring(val.indexOf('[')));
                    console.log({val, folder, views})
                    getAll.call(this, folder, ...views);
                }
            })
        }
        else return false;
    }
    
    function fetchNestedFiles (partial, specPath) {
        const
            pathToUseAsParent = specPath ? specPath : partial.attr('data-view'),
            parentFolderNames = pathToUseAsParent.split('/').filter(str => str != '..').slice(0, -1),
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
        views.forEach((view, index) => {
            const path     = `${folder}/${view}`,
                  realPath = findView(path);
            $.get(realPath)
                .done(data => html += data)
                .fail(err => {})
                .always(() => {
                    setTimeout( fetchNestedFiles.bind(this, $(this), path), wait )
                    if (index + 1 == numViews) {
                        $(this).html(html)
                        incrementInjectionsDone();
                    }
                });
        })
    }
    
    return (fetchFiles())
    
}