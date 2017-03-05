import $ from 'jquery';

export default function Inject (callback) {
    const partialViews  = $('._partial'),
          viewsRoot     = 'views/',
          numViews      = partialViews.length,
          findView      = string => `${viewsRoot}${string}.html`;
    let viewsInjected = 0;
    
    function fetchFiles () {
        if (numViews > 0) {
            partialViews.each(function () {
                const view = findView( $(this).attr('data-view') );
                get.call(this, view);
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
    
    function get (path) {
        $.get(path)
        .done(data => $(this).html(data))
        .fail(err => {})
        .always(() => {
            setTimeout( fetchNestedFiles.bind(this, $(this)), 200 )
            viewsInjected++;
            if (viewsInjected == numViews) {
                setTimeout(callback, 200)
            };
        })
    }
    
    return (fetchFiles())
    
}