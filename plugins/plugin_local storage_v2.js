/*
Localstorage! LS object
ls.save(name, value)  -  Save any value (arrays, objects, numbers, strings) to a given name.
ls.get(name, result)  -  Returns the value of the name given, and if it can't find anything returns result.
ls.clear()  -  Deletes all items.
ls.delete(name)  -  Deletes that one item with given name.
ls.log()  -  Logs all the items in your Localstorage.
*/
window.ls = {
    save: function(name,save,open = ":!>@",close = '@>!:',number = 'n!<>', string = 's!<>',stringEnd = '<>!s',object = 'o!<>',objectEnd = '<>!o') {
        if (Array.isArray(save)) {
            localStorage.setItem(name,lsHelpArr(save,open,close,number,string,stringEnd,object,objectEnd));
        } else {
            let toAdd = '';
            if (typeof save == 'string') toAdd = string + save;
            if (typeof save == 'number') toAdd = number + save;
            if (typeof save == 'object') toAdd = object + JSON.stringify(save);
            localStorage.setItem(name, toAdd);
        }
    },
    get: function(name,result = false,open = ":!>@",close = '@>!:',number = 'n!<>', string = 's!<>',stringEnd = '<>!s',object = 'o!<>',objectEnd = '<>!o') {
        if (localStorage.getItem(name) !== null) {
            if (localStorage.getItem(name).includes(open) && localStorage.getItem(name).includes(close)) {
                let a = localStorage.getItem(name);
                return lsHelpArr2(a,open,close,number,string,stringEnd,object,objectEnd); 
            } else {
                let a = localStorage.getItem(name);
                let b = a.substring(4,a.length);
                if (a.substring(0,4) == string) return b;
                if (a.substring(0,4) == number) return Number(b);
                if (a.substring(0,4) == object) return JSON.parse(b);
            }
        } else {
            return result;
        }
    },
    log: function() {
        console.log('----------');
        console.log("LocalStorage:");
        console.log(" ");
        for (var i = 0; i < localStorage.length; i++) {
            console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]")
        }
        console.log('----------');
    },
    delete: function(name) {
        localStorage.removeItem(name);
    },
    clear: function() {
        localStorage.clear();
    }
}
window.ss = {
    save: function(name,save,open = ":!>@",close = '@>!:',number = 'n!<>', string = 's!<>',stringEnd = '<>!s',object = 'o!<>',objectEnd = '<>!o') {
        if (Array.isArray(save)) {
            sessionStorage.setItem(name,lsHelpArr(save,open,close,number,string,stringEnd,object,objectEnd));
        } else {
            let toAdd = '';
            if (typeof save == 'string') toAdd = string + save;
            if (typeof save == 'number') toAdd = number + save;
            if (typeof save == 'object') toAdd = object + JSON.stringify(save);
            sessionStorage.setItem(name, toAdd);
        }
    },
    get: function(name,result = false,open = ":!>@",close = '@>!:',number = 'n!<>', string = 's!<>',stringEnd = '<>!s',object = 'o!<>',objectEnd = '<>!o') {
        if (sessionStorage.getItem(name) !== null) {
            if (sessionStorage.getItem(name).includes(open) && sessionStorage.getItem(name).includes(close)) {
                let a = sessionStorage.getItem(name);
                return lsHelpArr2(a,open,close,number,string,stringEnd,object,objectEnd); 
            } else {
                let a = sessionStorage.getItem(name);
                let b = a.substring(4,a.length);
                if (a.substring(0,4) == string) return b;
                if (a.substring(0,4) == number) return Number(b);
                if (a.substring(0,4) == object) return JSON.parse(b);
            }
        } else {
            return result;
        }
    },
    log: function() {
        console.log('----------');
        console.log("sessionStorage:");
        console.log(" ");
        for (var i = 0; i < sessionStorage.length; i++) {
            console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]")
        }
        console.log('----------');
    },
    delete: function(name) {
        sessionStorage.removeItem(name);
    },
    clear: function() {
        sessionStorage.clear();
    }
}
function lsHelpArr(arr,h,h2,n,s,se,o,oe) {
    let toSet = h;
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            toSet += lsHelpArr(arr[i],h,h2,n,s,se,o,oe);
        } else if (typeof arr[i] == 'object') {
            toSet += o + JSON.stringify(arr[i]) + oe;
        } else {
            let toSet2 = ',';
            let toAdd = '';
            if (i == arr.length - 1) toSet2 = '';
            if (typeof arr[i] == 'number') toAdd = n;
            if (typeof arr[i] == 'string') {
                toAdd = s;
                toSet2 = se + toSet2;
            }
            toSet += toAdd + '' +  arr[i] + '' + toSet2;
        }
    }
    return toSet + h2;
}
function lsHelpArr2(str,h,h2,n,s,se,o,oe) {
    let toSet = '';
    for (let i = 0; i < str.length; i++) {
        if (str.substring(i,i + 4) == h) {
            toSet += '[';
            i += 3;
        } else if(str.substring(i,i + 4) == h2) {
            toSet += ']';
            i += 3;
        } else if (str.substring(i,i + 4) == n) {
            i += 3;
        } else if (str.substring(i,i + 4) == s) {
            i += 3;
            toSet += "'";
        } else if (str.substring(i,i + 4) == se) {
            i += 3;
            toSet += "'";
        } else if (str.substring(i,i + 4) == o) {
            i += 3;
        } else if (str.substring(i,i + 4) == oe) {
            i += 3;  
        } else {
            let toAdd = '';
            if (toSet.charAt(toSet.length - 1) == ']') {
                toAdd = ',';
            }
            toSet += toAdd + str[i];
        }
    }
	
    toSet = toSet.replaceAll(",,",",")
	toSet = toSet.replaceAll("}{","},{")
    return eval(toSet);
}

try {
    plugin(2,'Local Stoage','JoeTheHobo')
}
catch {
    console.warn('Library Simple Version 14 REQUIRED');
}
    