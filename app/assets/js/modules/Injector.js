import $ from 'jquery';

export default function Injector (callback) {

    function findView () {
        const
            path  = $(this).attr('data-view'),
            child = path.split('/'),
            nest  = $(this).attr('data-root'),
            root  = nest ? nest.split('/') : ['views'];

        if (path.charAt(0) == '/') {
            if (path.substr(-5) == '.html') return path
            else return `${path}.html`
        };

        const
            directoriesUp = child.filter(str => str == '..').length,
            inViewsFolder = (root.length - directoriesUp) > 0;

//        console.log({ root, child })

        if (!inViewsFolder && childPath[0] != '') {
            console.error('All views/partials should be in the "views" folder. Use an absolute path to use files above "views"');
            return false;
        }
        else {
            const
                realRoot  = directoriesUp == 0 ? root : root.slice(0, (directoriesUp * -1)),
                realChild = child.filter(str => str != '..'),

                view = [...realRoot, ...realChild].join('/');

            if (view.substr(-5) == '.html') return view
            else return `${view}.html`
        }
    }
    
    function fetchFiles () {
        $('._partial').each(function () {
            const view = findView.call(this);
            get.call(this, view);
        })

        setTimeout(() => {
            if ( $('._partial') ) fetchFiles();
            else callback();
        }, 150)
    }
    
    function get (path) {
        $.get(path)
            .done(data => {
                $(this).html(data);

                const root = path.split('/').slice(0, -1).join('/');
                markNestedIncludesAndUnwrap.call(this, root)
            })
            .fail(err => {})
    }

    function markNestedIncludesAndUnwrap (root) {
        const nestedInclusions  = $(this).find('._partial');
        nestedInclusions.attr('data-root', root);
        $(this).children().unwrap();
    }
    
    return fetchFiles()
}
