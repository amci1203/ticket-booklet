const
//    querystring = require('querystring'),
    formidable = require('formidable'),
    json       = require('jsonfile'),
    path       = require('path'),
    fs         = require('fs'),

    getData    = (filename, cb) => fs.readFile(`./app/data/${filename}.json`, (err, content) =>{
        if (err) throw err;
        cb(JSON.parse(content));
    }),

    galleryDir = './app/assets/img/tickets';


json.spaces = 4;

module.exports = (router) => {

    // save new ticket images to ticket folder
    router.post('/tickets', (req, res) => {

        const form = formidable.IncomingForm();
        form.type = 'multipart';
        form.keepExtensions = true;

        form.parse(req, (err, fields, file) => {

            const
                accepted = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'],

                upload   = file.upload,
                filename = file.filename || upload.name,
                mimetype = upload.type,
                oldPath  = upload.path,
                newPath  = path.join(galleryDir, filename);

            if (accepted.indexOf(mimetype) == -1) res.status(422).end("The uploaded file's MIME is not supported");

            fs.rename(oldPath, newPath, err => {

                if (err) throw err;
                res.end(filename);

            })
        })

    });

    // saves new location to locations' json array
    router.post('/locations/:name', (req, res) => {

        const
            file     = './app/data/locations.json',
            location = req.params.name;

        getData('locations', content => json.writeFile(file, [...content, location], err => {

            if (err) throw err;
            res.end(locationName);

        }))

    });



    return router;
}

function dive (dir, action, callback) {
    if (typeof action != 'function') return Error('No action defined');
    fs.readdir(dir, (err, files) => {
        if (err) return action(err)
        files.forEach(file => {
            const _path = path.join(dir, file);
            fs.stat(file, (err, stat) => {
                if   (stat && stat.isDirectory()) dive(_path, action, callback);
                else action(null, _path)
            })
        })

        callback();
    })
}
