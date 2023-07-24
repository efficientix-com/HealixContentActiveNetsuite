/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/**
 * @name TKIO - Content Active index SL
 * @version 1.0
 * @author Magdiel Jiménez <magdiel.jimenez@freebug.mx>
 * @summary Script para traer los componentes hechos en VUE JS
 */
define(['N/search', 'N/ui/serverWidget'],
    
    (search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            try {
                let request = scriptContext.request, response = scriptContext.response, params = request.parameters;
                let form = serverWidget.createForm({
                    title: "Healix Content Active",
                    hideNavBar: false
                });
                let html_fld = form.addField({
                    id: 'custpage_html_content',
                    label: 'HTML',
                    type: serverWidget.FieldType.INLINEHTML
                });
                let html_content = getHTMLTemplate();
                html_fld.defaultValue = html_content;
                response.writePage(form);

            } catch (e) {
                log.error({
                    title: "Error on onRequest function",
                    details: e
                });

            }
        }
        const getHTMLTemplate = () => {
            try {
                let content = '';
                let cssFile = getFileURL('app.26b80581.css');
                let chunkCssFile = getFileURL('chunk-vendors.c9a021a2.css');
                let appJSFile = getFileURL('app.de6410ba.js');
                let chunkFile = getFileURL('chunk-vendors.8e7767aa.js');
                content += '<!doctype html>'
                    + '<html lang="">'
                    + '<head>'
                    + '<meta charset="utf-8">'
                    + '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
                    + '<meta name="viewport" content="width=device-width,initial-scale=1">'
                    + '<link rel="icon" href="/favicon.ico">'
                    + '<title>Healix Content Active</title>'
                    + '<script defer="defer" src="' + chunkFile + '"></script>'
                    + '<script defer="defer" src="' + appJSFile + '"></script>'
                    + '<link href="' + cssFile + '" rel="stylesheet">'
                    + '<link href="' + chunkCssFile + '" rel="stylesheet">'
                    + '</head>'
                    + '<body><noscript><strong>We are sorry but Content Active Healix does not work properly without JavaScript enabled. Please enable it'
                    + 'to continue.</strong></noscript>'
                    + '<div id="app"></div>'
                    + '</body>'
                    + '</html>'
                return content;
            } catch (e) {
                log.error({
                    title: "Error on getHTMLTemplate",
                    details: e
                });
            }
        }
        const getFileURL = (name) => {
            try {
                let objSearch = search.create({
                    type: 'file',
                    filters: [
                        ['name', search.Operator.IS, name]
                    ],
                    columns: [
                        { name: 'internalid' },
                        { name: 'url' }
                    ]
                });
                let numResults = objSearch.runPaged().count;
                let url_file = '';
                if (numResults) {
                    objSearch.run().each((result) => {
                        url_file = result.getValue({ name: 'url' });
                        return true;
                    });
                }
                
                return url_file;
            } catch (e) {
                log.error({
                    title: "getFileURL",
                    details: e
                })
            }
        }

        return {onRequest}

    });
