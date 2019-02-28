const os = require('os');
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

var bUseMainten = false;
var app = express();
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');


/* bUseMainten */
if (bUseMainten) {
    //---------------------------------------------- app.use
    app.use((req, res, next) => {
        res.render('mainten.hbs');
    });
} else {
    //---------------------------------------------- app.use
    app.use((req, res, next) => {
        var now = new Date().toString();
        var sLog = `${now}: ${req.method} ${req.url}`
        console.log(sLog);
        myAppendLog(sLog);
        next();
    });
}
app.use(express.static(__dirname + '/public'));
//console.log(__dirname);



//---------------------------------------------- myAppendLog
var myAppendLog = (psText) => {
    var oUser = os.userInfo();
    var sUName = oUser.username;
    fs.appendFile('mylib_express.log', `\r\n ${psText} for ${sUName}`, function (err) {
        if (err) {
            console.log(err);
            if (err) throw err; //console.log('Unable to append to server.log.')
        }
    });
}


//---------------------------------------------- myCallBacks
module.exports.myCallBacks = () => {
    var iAction = 1;    

    switch (iAction) {
        case 0:
            //var app = require('./app');   app.server.close();
            break;

        case 1:
            console.log("command to listen");
            setListenAll();
            break;


        default:
            console.log("Please set iAction");
    }
}

//---------------------------------------------- setListenAll
var setListenAll = () => {
    /*
    app.get('/views/partials', (req, res) => {
        //res.send('HtmlUsefulColors.html');
        res.render('footer.hbs', {
            
        });
    });
    */

    //---------------------------------------------- hbs Helpers
    hbs.registerHelper('myCurrentYear', () => {
            return new Date().getFullYear()
        });
    hbs.registerHelper('myUpper', (text) => {
            return text.toUpperCase();
        });

    app.get('/', (req, res) => {
            // res.send('<h1>Listening on port 3000</h1>');
            //res.send({ name: 'Powell Electronics', items: ['Connectors', 'Cables']
            res.render('home.hbs', {
                pageTitle: 'Page: Initial',
                welcomeMessage: 'Testing Initial',
                //currentYear: new Date().getFullYear()
            })
        });

    app.get('/about', (req, res) => {
            //res.send('HtmlUsefulColors.html');
            res.render('about.hbs', {
                pageTitle: 'Page: About',
                welcomeMessage: 'Testing About',
                //currentYear: '2000-' + new Date().getFullYear()
            });
        });

    app.get('/bad', (req, res) => {
            res.send({
                errorMessage: 'Unable to handle request'
            });
        });

    app.listen(3000, () => {
        console.log('Server is up on port 3000');
    });

}
