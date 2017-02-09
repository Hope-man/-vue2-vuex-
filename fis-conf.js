/**
 * @desc 自动部署代码配置文件
 * @author jialufeng
 * @since 2016-7-3
 */
//部署机器HOSt
//var deployHost = 'cq01-cp01-bop-openapi-offline.epc.baidu.com';

//拼接出目标机器文件接收服务
//var deployServ = 'http://' + deployHost + ':8080/static/fis_receiver.php';
var deployServ = "http://192.168.1.224:8999/receiver";

// var deployServ = "http://192.168.1.224:8999/receiver";


fis.get('project.ignore').push('*.{sh,bat}', 'README.md');


// 启用相对路径
//fis.match('**', { relative: true })

//fis.hook('amd', {
//    paths: {
//        jquery: './static/jslib/jquery.js'
//    }
//});
//
// fis
//     .match(/^\/((widget|template|layout)\/.*\.(tpl|html|php))$/i, {
//         isHtmlLike: true,
//         useMap: true,
//         release: '/111'
//     })
//
//     // 对所有图片信息处理
//     .match(/^(\/static|widget)?\/(.*\.(?:swf|png|gif|jpg|jpeg|flv|f4v|js|css|less))$/i, {
//         release: 'static/site/$2'
//     })
//
//     .match('widget/**.js', {
//         isMod: true
//     })
//
//     .match('*.less', {
//         parser: fis.plugin('less'),
//         rExt: '.css',
//         useSprite: true
//     })
//
//     .match('static/js/**.js', {
//         isMod: false
//     })
//
//     .match('*.{js,css,png,less,jpg}', {
//         useHash: false //   MD5戳
//     })
//
//     // 添加同名依赖
//     .match('widget/**.{js,html,tpl,php}', {
//         useSameNameRequire: true
//     });


fis
    .media('dev')
    .match('dist/**/*.*', {
        deploy: fis.plugin('local-deliver', {
            to: './output'
        })
    })
    .match('dist/index.html', {
        deploy: fis.plugin('local-deliver', {
            to: './output'
        })
    })
    .match('static/**/*.*', {
        deploy: fis.plugin('local-deliver', {
            to: './output/dist/'
        })
    });
    // .match('*', {
    //     deploy: fis.plugin('local-deliver', {
    //         to: './output'
    //     })
    // });



fis.media('remote')
    .match('dist/**/*.*', {
        deploy: fis.plugin('http-push', {
            receiver : deployServ,
            to: '/root/fe_project/8.credit'
        })
    })
     .match('dist/index.html', {
        deploy: fis.plugin('http-push', {
            receiver : deployServ,

            to: '/root/fe_project/8.credit'
        })
    })
    .match('static/**/*.*', {
        deploy: fis.plugin('http-push', {
            receiver : deployServ,
            to: '/root/fe_project/8.credit'
        })
    });


//
// fis.media('dev')
//     .match('dist/**/*.*', {
//         deploy: fis.plugin('http-push', {
//             receiver : deployServ,
//             to: '/hycx/webmanagerproject/gpsapi'
//         })
//     })
//     .match('dist/index.html', {
//         deploy: fis.plugin('http-push', {
//             receiver : deployServ,
//             to: '/hycx/webmanagerproject/gpsapi'
//         })
//     })
//     .match('static/**/*.*', {
//         deploy: fis.plugin('http-push', {
//             receiver : deployServ,
//             to: '/hycx/webmanagerproject/gpsapi'
//         })
//     });
