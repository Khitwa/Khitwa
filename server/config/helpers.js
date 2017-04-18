var jwt = require('jsonwebtoken');
var api_key = 'key-83b88bc4b1957e691b530003038803fc';
var domain = 'khitwa.org';
var domainTest = 'sandbox0a8b4d2d75ba45e29cdbcf36dde592d8.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var server = 'http://127.0.0.1:8000';
// var server = 'http://khitwaorg.herohuapp.com';

var helpers = {

    errorHandler: function (error, req, res, value) {
        // send error message to client
        // message for gracefull error handling on app
        var stat = value || 500;
        res.status(stat).send(error);
    },

    decode: function (req, res, next) {
        var token = req.headers['x-access-token'];
        var user;

        if (!token) {
            return res.send(403); // send forbidden if a token is not provided
        }

        try {
            // decode token and attach user to the request
            // for use inside our controllers
            user = jwt.decode(token, 'secret');
            req.user = user;
            next();
        } catch (error) {
            return next(error);
        }
    },

    email : function (email, subject, body, next) {
        var data = {    
            from: 'Support <no-reply@khitwa.org>',
            to: email,
            subject: subject,
            html: body
        };
        mailgun.messages().send(data, function (error, body) {
            console.log(body);
            next();
        });
    },

    activateTemplate : function (first, last, token, org) {
        var user = org || 'user';
        return '<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width"></head><body style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:19px;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important"><style>@media only screen and (max-width:600px){table[class=body] .right-text-pad{padding-left:10px!important}table[class=body] .left-text-pad{padding-right:10px!important}}@media only screen and (max-width:600px){table[class=body] img{width:auto!important;height:auto!important}table[class=body] center{min-width:0!important}table[class=body] .container{width:95%!important}table[class=body] .row{width:100%!important;display:block!important}table[class=body] .wrapper{display:block!important;padding-right:0!important}table[class=body] .column,table[class=body] .columns{table-layout:fixed!important;float:none!important;width:100%!important;padding-right:0!important;padding-left:0!important;display:block!important}table[class=body] .wrapper.first .column,table[class=body] .wrapper.first .columns{display:table!important}table[class=body] table.column td,table[class=body] table.columns td{width:100%!important}table[class=body] .column td.one,table[class=body] .columns td.one{width:8.333333%!important}table[class=body] .column td.two,table[class=body] .columns td.two{width:16.666666%!important}table[class=body] .column td.three,table[class=body] .columns td.three{width:25%!important}table[class=body] .column td.four,table[class=body] .columns td.four{width:33.333333%!important}table[class=body] .column td.five,table[class=body] .columns td.five{width:41.666666%!important}table[class=body] .column td.six,table[class=body] .columns td.six{width:50%!important}table[class=body] .column td.seven,table[class=body] .columns td.seven{width:58.333333%!important}table[class=body] .column td.eight,table[class=body] .columns td.eight{width:66.666666%!important}table[class=body] .column td.nine,table[class=body] .columns td.nine{width:75%!important}table[class=body] .column td.ten,table[class=body] .columns td.ten{width:83.333333%!important}table[class=body] .column td.eleven,table[class=body] .columns td.eleven{width:91.666666%!important}table[class=body] .column td.twelve,table[class=body] .columns td.twelve{width:100%!important}table[class=body] td.offset-by-eight,table[class=body] td.offset-by-eleven,table[class=body] td.offset-by-five,table[class=body] td.offset-by-four,table[class=body] td.offset-by-nine,table[class=body] td.offset-by-one,table[class=body] td.offset-by-seven,table[class=body] td.offset-by-six,table[class=body] td.offset-by-ten,table[class=body] td.offset-by-three,table[class=body] td.offset-by-two{padding-left:0!important}table[class=body] table.columns td.expander{width:1px!important}table[class=body] .right-text-pad,table[class=body] .text-pad-right{padding-left:10px!important}table[class=body] .left-text-pad,table[class=body] .text-pad-left{padding-right:10px!important}table[class=body] .hide-for-small,table[class=body] .show-for-desktop{display:none!important}table[class=body] .hide-for-desktop,table[class=body] .show-for-small{display:inherit!important}}</style><table class="body" style="border-collapse:collapse;border-spacing:0;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;height:100%;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="center" align="center" valign="top" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:center;vertical-align:top;word-break:break-word"><center style="min-width:580px;width:100%"><table class="container" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:inherit;vertical-align:top;width:580px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-break:break-word"><table class="row" style="border-collapse:collapse;border-spacing:0;display:block;padding:0;position:relative;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="wrapper last" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px 20px 0 0;padding-right:0;position:relative;text-align:left;vertical-align:top;word-break:break-word"><table class="twelve columns" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:left;vertical-align:top;width:580px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0 0 10px;text-align:left;vertical-align:top;word-break:break-word"><h1 style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:40px;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;word-break:normal">Hi '+first+' '+last+',</h1><p class="lead" style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:21px;margin:0;margin-bottom:10px;padding:0;text-align:left">Welcome and thank you for joining Khitwa.</p><p style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left">Khitwa is a website and mobile app that links qualified volunteers with NGOs that would like to do work in different parts of the world.</p></td><td class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-break:break-word"></td></tr></tbody></table></td></tr></tbody></table><table class="row callout" style="border-collapse:collapse;border-spacing:0;display:block;padding:0;position:relative;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="wrapper last" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px 20px 0 0;padding-bottom:20px;padding-right:0;position:relative;text-align:left;vertical-align:top;word-break:break-word"><table class="twelve columns" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:left;vertical-align:top;width:580px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="panel" style="-moz-hyphens:auto;-webkit-hyphens:auto;background:#ECF8FF;border:1px solid #d9d9d9;border-collapse:collapse!important;border-color:#b9e5ff;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px!important;text-align:left;vertical-align:top;word-break:break-word"><p style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left">Please confirm your email address by clicking the link. <a href="'+server+'/api/'+user+'/activate/'+token+'" style="color:#2ba6cb;text-decoration:none">Activate Account »</a></p></td><td class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-break:break-word"></td></tr></tbody></table></td></tr></tbody></table><table class="row footer" style="border-collapse:collapse;border-spacing:0;display:block;padding:0;position:relative;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="wrapper" style="-moz-hyphens:auto;-webkit-hyphens:auto;background:#ebebeb;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px 20px 0 0;position:relative;text-align:left;vertical-align:top;word-break:break-word"><table class="six columns" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:left;vertical-align:top;width:280px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="left-text-pad" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0 0 10px;padding-left:10px;text-align:left;vertical-align:top;word-break:break-word"><h5 style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:24px;font-weight:400;line-height:1.3;margin:0;padding:0;padding-bottom:10px;text-align:left;word-break:normal">Connect With Us:</h5><table class="tiny-button facebook" style="border-collapse:collapse;border-spacing:0;overflow:hidden;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="-moz-hyphens:auto;-webkit-hyphens:auto;background:#2ba6cb;border:1px solid #2284a1;border-collapse:collapse!important;border-color:#2d4473;color:#fff;display:block;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:5px 0 4px;text-align:center;vertical-align:top;width:auto!important;word-break:break-word"><a href="https://www.facebook.com/khitwa/?fref=ts" style="color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;text-decoration:none">Facebook</a></td></tr></tbody></table><br><table class="tiny-button twitter" style="border-collapse:collapse;border-spacing:0;overflow:hidden;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="-moz-hyphens:auto;-webkit-hyphens:auto;background:#2ba6cb;border:1px solid #2284a1;border-collapse:collapse!important;border-color:#0087bb;color:#fff;display:block;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:5px 0 4px;text-align:center;vertical-align:top;width:auto!important;word-break:break-word"><a href="https://twitter.com/KhitwaOrg?lang=en" style="color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;text-decoration:none">Twitter</a></td></tr></tbody></table><br></td><td class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-break:break-word"></td></tr></tbody></table></td><td class="wrapper last" style="-moz-hyphens:auto;-webkit-hyphens:auto;background:#ebebeb;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px 20px 0 0;padding-right:0;position:relative;text-align:left;vertical-align:top;word-break:break-word"><table class="six columns" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:left;vertical-align:top;width:280px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="last right-text-pad" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0 0 10px;padding-right:0;text-align:left;vertical-align:top;word-break:break-word"><h5 style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:24px;font-weight:400;line-height:1.3;margin:0;padding:0;padding-bottom:10px;text-align:left;word-break:normal">Contact Info:</h5><p style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left">Email: <a href="mailto:hseldon@trantor.com" style="color:#2ba6cb;text-decoration:none">khitwaorg@gmail.com</a></p></td><td class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-break:break-word"></td></tr></tbody></table></td></tr></tbody></table><table class="row" style="border-collapse:collapse;border-spacing:0;display:block;padding:0;position:relative;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="wrapper last" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px 20px 0 0;padding-right:0;position:relative;text-align:left;vertical-align:top;word-break:break-word"><table class="twelve columns" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:left;vertical-align:top;width:580px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-break:break-word"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></center></td></tr></tbody></table></body></html>';
    },

    pwdResetTemplate : function (first, last, token, org) {
        var user = org || 'user';
        return '<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width"></head><body style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:19px;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important"><style>@media only screen and (max-width:600px){table[class=body] .right-text-pad{padding-left:10px!important}table[class=body] .left-text-pad{padding-right:10px!important}}@media only screen and (max-width:600px){table[class=body] img{width:auto!important;height:auto!important}table[class=body] center{min-width:0!important}table[class=body] .container{width:95%!important}table[class=body] .row{width:100%!important;display:block!important}table[class=body] .wrapper{display:block!important;padding-right:0!important}table[class=body] .column,table[class=body] .columns{table-layout:fixed!important;float:none!important;width:100%!important;padding-right:0!important;padding-left:0!important;display:block!important}table[class=body] .wrapper.first .column,table[class=body] .wrapper.first .columns{display:table!important}table[class=body] table.column td,table[class=body] table.columns td{width:100%!important}table[class=body] .column td.one,table[class=body] .columns td.one{width:8.333333%!important}table[class=body] .column td.two,table[class=body] .columns td.two{width:16.666666%!important}table[class=body] .column td.three,table[class=body] .columns td.three{width:25%!important}table[class=body] .column td.four,table[class=body] .columns td.four{width:33.333333%!important}table[class=body] .column td.five,table[class=body] .columns td.five{width:41.666666%!important}table[class=body] .column td.six,table[class=body] .columns td.six{width:50%!important}table[class=body] .column td.seven,table[class=body] .columns td.seven{width:58.333333%!important}table[class=body] .column td.eight,table[class=body] .columns td.eight{width:66.666666%!important}table[class=body] .column td.nine,table[class=body] .columns td.nine{width:75%!important}table[class=body] .column td.ten,table[class=body] .columns td.ten{width:83.333333%!important}table[class=body] .column td.eleven,table[class=body] .columns td.eleven{width:91.666666%!important}table[class=body] .column td.twelve,table[class=body] .columns td.twelve{width:100%!important}table[class=body] td.offset-by-eight,table[class=body] td.offset-by-eleven,table[class=body] td.offset-by-five,table[class=body] td.offset-by-four,table[class=body] td.offset-by-nine,table[class=body] td.offset-by-one,table[class=body] td.offset-by-seven,table[class=body] td.offset-by-six,table[class=body] td.offset-by-ten,table[class=body] td.offset-by-three,table[class=body] td.offset-by-two{padding-left:0!important}table[class=body] table.columns td.expander{width:1px!important}table[class=body] .right-text-pad,table[class=body] .text-pad-right{padding-left:10px!important}table[class=body] .left-text-pad,table[class=body] .text-pad-left{padding-right:10px!important}table[class=body] .hide-for-small,table[class=body] .show-for-desktop{display:none!important}table[class=body] .hide-for-desktop,table[class=body] .show-for-small{display:inherit!important}}</style><table class="body" style="border-collapse:collapse;border-spacing:0;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;height:100%;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="center" align="center" valign="top" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:center;vertical-align:top;word-break:break-word"><center style="min-width:580px;width:100%"><table class="container" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:inherit;vertical-align:top;width:580px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-break:break-word"><table class="row" style="border-collapse:collapse;border-spacing:0;display:block;padding:0;position:relative;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="wrapper last" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px 20px 0 0;padding-right:0;position:relative;text-align:left;vertical-align:top;word-break:break-word"><table class="twelve columns" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:left;vertical-align:top;width:580px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0 0 10px;text-align:left;vertical-align:top;word-break:break-word"><p class="lead" style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:21px;margin:0;margin-bottom:10px;padding:0;text-align:left">Forget your password?</p><p style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left">We recieved a request to reset the password for this email address.</p></td><td class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-break:break-word"></td></tr></tbody></table></td></tr></tbody></table><table class="row callout" style="border-collapse:collapse;border-spacing:0;display:block;padding:0;position:relative;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="wrapper last" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px 20px 0 0;padding-bottom:20px;padding-right:0;position:relative;text-align:left;vertical-align:top;word-break:break-word"><table class="twelve columns" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:left;vertical-align:top;width:580px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="panel" style="-moz-hyphens:auto;-webkit-hyphens:auto;background:#ECF8FF;border:1px solid #d9d9d9;border-collapse:collapse!important;border-color:#b9e5ff;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px!important;text-align:left;vertical-align:top;word-break:break-word"><p style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left">To reset your password please click this link or cut and paste this URL in your browser: <a href="'+server+'/api/'+user+'/chck/'+token+'" style="color:#2ba6cb;text-decoration:none">Reset Password »</a></p><p class="lead" style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:21px;margin:0;margin-bottom:10px;padding:0;text-align:left">This link will take you to a secure page were you can change your password.\nIf you do not want to reset your password, please ignore this message. Your password will not be reset.</p></td><td class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-break:break-word"></td></tr></tbody></table></td></tr></tbody></table><table class="row footer" style="border-collapse:collapse;border-spacing:0;display:block;padding:0;position:relative;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="wrapper" style="-moz-hyphens:auto;-webkit-hyphens:auto;background:#ebebeb;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px 20px 0 0;position:relative;text-align:left;vertical-align:top;word-break:break-word"><table class="six columns" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:left;vertical-align:top;width:280px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="left-text-pad" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0 0 10px;padding-left:10px;text-align:left;vertical-align:top;word-break:break-word"><h5 style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:24px;font-weight:400;line-height:1.3;margin:0;padding:0;padding-bottom:10px;text-align:left;word-break:normal">Connect With Us:</h5><table class="tiny-button facebook" style="border-collapse:collapse;border-spacing:0;overflow:hidden;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="-moz-hyphens:auto;-webkit-hyphens:auto;background:#2ba6cb;border:1px solid #2284a1;border-collapse:collapse!important;border-color:#2d4473;color:#fff;display:block;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:5px 0 4px;text-align:center;vertical-align:top;width:auto!important;word-break:break-word"><a href="https://www.facebook.com/khitwa/?fref=ts" style="color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;text-decoration:none">Facebook</a></td></tr></tbody></table><br><table class="tiny-button twitter" style="border-collapse:collapse;border-spacing:0;overflow:hidden;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="-moz-hyphens:auto;-webkit-hyphens:auto;background:#2ba6cb;border:1px solid #2284a1;border-collapse:collapse!important;border-color:#0087bb;color:#fff;display:block;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:5px 0 4px;text-align:center;vertical-align:top;width:auto!important;word-break:break-word"><a href="https://twitter.com/KhitwaOrg?lang=en" style="color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;text-decoration:none">Twitter</a></td></tr></tbody></table><br></td><td class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-break:break-word"></td></tr></tbody></table></td><td class="wrapper last" style="-moz-hyphens:auto;-webkit-hyphens:auto;background:#ebebeb;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px 20px 0 0;padding-right:0;position:relative;text-align:left;vertical-align:top;word-break:break-word"><table class="six columns" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:left;vertical-align:top;width:280px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="last right-text-pad" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0 0 10px;padding-right:0;text-align:left;vertical-align:top;word-break:break-word"><h5 style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:24px;font-weight:400;line-height:1.3;margin:0;padding:0;padding-bottom:10px;text-align:left;word-break:normal">Contact Info:</h5><p style="color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left">Email: <a href="mailto:hseldon@trantor.com" style="color:#2ba6cb;text-decoration:none">khitwaorg@gmail.com</a></p></td><td class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-break:break-word"></td></tr></tbody></table></td></tr></tbody></table><table class="row" style="border-collapse:collapse;border-spacing:0;display:block;padding:0;position:relative;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="wrapper last" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:10px 20px 0 0;padding-right:0;position:relative;text-align:left;vertical-align:top;word-break:break-word"><table class="twelve columns" style="border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:left;vertical-align:top;width:580px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td class="expander" style="-moz-hyphens:auto;-webkit-hyphens:auto;border-collapse:collapse!important;color:#222;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-break:break-word"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></center></td></tr></tbody></table></body></html>';
    },
    validate : function (username, password, email, confirm) {
        var valid = true;
        var usr = username.toLowerCase();
        var pass = password.toLowerCase();
        var index = pass.indexOf(usr[0]);
        var same = false;
        var count = 0 ;
        if (index > -1) {
            for (var i = index; i < usr.length; i++) {
                if (pass[i] === usr[count]){ same = true; count++; }else{ same = false; }
            }
        }
        if(username.length < 3) return { message: 'Username Should be at Least 3 Characters Long!', valid: false };
        if(username.indexOf(' ')>-1) return { message : 'Username Should not Contain Spaces!', valid : false };
        if(!/[a-z]/.test(username)) return { message: 'Username Should Contain at Least One Lowercase Character!', valid: false };
        if(password.length < 6 || password.length > 24) return { message : 'Password must be 7 - 24 characters long!', valid: false };
        if (password !== confirm) return { message : 'Password Does Not Match!', valid: false };
        if(same)return { message : 'Password Can Not Contain Username', valid : false };
        if (email.indexOf('@')<0 || email.indexOf('.')<0) return { message: 'Please Enter Valid Email Address!', valid: false };
        if(!/[a-z]/.test(password)) return { message: 'Password Should Contain at Least One Lowercase Character!', valid: false };
        if(!/[A-Z]/.test(password)) return { message: 'Password Should Contain at Least One Uppercase Character!', valid: false };
        if(!/[0-9]/.test(password)) return { message: 'Password Should Contain at Least One Number!', valid: false };
        if(!/[!#@$%^&*()_+]/.test(password)) return { message: 'Password Should Contain at Least One Special Character!', valid: false};
        return { message : '', valid: true};
    }
};

module.exports = helpers;