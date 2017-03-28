"use strict";
const loadJS = function(url) {
	return new Promise(function(resolve, reject) {
		const scriptElem = document.querySelector("[file-url=\""+url+"\"]");
		if(scriptElem) {
			console.log("ALREAY LOADED");
			return;
		}
        var script = document.createElement('script');
        script.src = url;
        script.setAttribute("file-url", url);

        script.addEventListener('load', function() {
            resolve(script);
        }, false);

         script.addEventListener('error', function() {
            reject(script);
        }, false);



        document.body.appendChild(script);
       });
}
const loaded = {};
const importReg = /\/\*@import([^\/])*\*\//g;//   /*@import ......
const fileReg = /\"([^\"]*)\"/g;
const concatenatePath = function(url, url2) {
    let path = url.split("/");
    path.pop();

    let path2 = url2.split("/");
    path = path.concat(path2);

    for(let i = path.length - 1; i>=0; --i) {
        if(i === 0)
            break;
        switch(path[i]) {
            case ".":

                path.splice(i, 1);
                continue;
            case "..":
                path.splice(i, 1);
                --i;
                path.splice(i, 1);
                continue;
            case "":
                path.splice(i, 1);
                continue;
        }
    }

    return path.join("/");
}
const getJS = function(url) {
    if(loaded.hasOwnProperty(url))
        return;

    loaded[url] = true;
    return fetch(url).then(req => req.text()).then(text => {
        const imports = text.match(/\/\*\@import(.*?)\*\//g);

        if(!imports)
            return;

        return Promise.all(imports.map(line => {
            const matches = /\"([^\"]*)\"/g.exec(line);
            let filename = matches[1];
            if(filename.indexOf(".js") !== filename.length - 3)
                filename += ".js";
            return getJS(concatenatePath(url, filename));
        }));
    }).then(text => {
        return loadJS(url);
        return text;
    })
}



