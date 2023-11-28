/*
    ----------------Simple----------------
          Use JavaScript but simply.
    Version: 14 (Alpha)
    Created By: JoeTheHobo (John Jones)
    Email: johnjonesma@gmail.com
*/

Object.prototype.$P = function(x = 1) {
    let a = this;
    for (var i = 0; i < x; i++) {
        a = a.parentNode;
    }
    return a;
}
Object.prototype.$ = function(c) {
    return $(c,this); 
}
function $(c,b = document) {
    if (c.includes(' ')) return c.split(' ').map(x => $(x)).flatArray();
    else {
        if(!'#.<'.includes(c.charAt(0))) c = '#' + c;
        if (c.charAt(0) == '<') c = c.charAt(c.length-1) == '>' ? c.substring(1,c.length-1) : c.substring(1,c.length);
        let a = b.querySelectorAll(c);
        return a.length == 1 ? (a[0]) : (a.length == 0 ? false : a);
    }
}
Object.prototype.hover = function(obj) {
    this.hoverSaves = this.hoverSaves ? this.hoverSaves : [];
    for (let i = 0; i < Object.keys(obj).length; i++) {
        this.hoverSaves.push({
            key: Object.keys(obj)[i],
            value: eval("this.style." + Object.keys(obj)[i]),
            newVal: Object.values(obj)[i]
        })
    }
    this.on('mouseover',function() {
        for (let i = 0; i < this.hoverSaves.length; i++) {
            eval('this.style.' + this.hoverSaves[i].key + ' = "' + this.hoverSaves[i].newVal + '"')
        }
    });
    this.on('mouseout',function(obj) {
        for (let i = 0; i < this.hoverSaves.length; i++) {
            eval('this.style.' + this.hoverSaves[i].key + ' = "' + this.hoverSaves[i].value + '"')
        }
    });
}
Object.prototype.css = function(obj) {
    for (let i = 0; i < Object.keys(obj).length; i++) {
        eval('this.style.' + Object.keys(obj)[i] + ' = "' + Object.values(obj)[i] + '"')
    }
}
Object.prototype.on = function(what,func) {
    this.length ? this.map(x => x.on(what,func)) : this.addEventListener(what,func);
    return this;
}
String.prototype.rnd = function(amt = false,l=[]) {
    for (let i = 0; i < amt; i++) {
        l.push(this.charAt(rnd(0,this.length - 1)));
    }
    return amt !== false ? l : this.charAt(rnd(0,this.length - 1));
}
Array.prototype.rnd = function(amt = false,l=[]) {
    for (let i = 0; i < amt; i++) {
        l.push(this[rnd(0,this.length - 1)]);
    }
    return amt !== false ? l : this[rnd(0,this.length - 1)];
}
//////////////////
//HOW TO USE RND//
//////////////////
//rnd(num) Returns random number 1 through your number
//rnd(num1,num2) Returns random number between first and second number
//
//rnd("color",none|"rgb"|"hex") Return random color (hex)
//rnd("abc"||"ABC"||"letter"||"LETTER") Return random letter from ABC. Captilized if string is
//////////////////

function rnd(num,to,exp) {
    if (!isNaN(num)) {
        while (true) {
            if (!to && to !== 0) {
                to = num;
                num = 1;
            }
            let finalNum = Math.floor((Math.random() * (to - num + 1)) + num);
            let checked = true; 
            if (exp) {
                if (!exp.length) exp = [exp];
                for (let i = 0; i < exp.length; i++) {
                    if (exp[i] == finalNum) checked = false;
                }
            }
            if (checked || !exp) return finalNum;
        }
    }

    if (typeof num == 'string') {
        if ((num.toLowerCase() == 'letter' || num.toLowerCase() == 'abc') && to !== false) {
            let abc = 'abcdefghijklmnopqrstuvwxyz';
            if (num === 'LETTER' || num === 'ABC') return abc.rnd().toUpperCase();
            return abc.rnd();
        }

        if (num == 'color') {
            if (to == 'hex' || !to) {
                let tool = '0123456789abcdef';
                return '#' + tool.rnd() + tool.rnd() + tool.rnd() + tool.rnd() + tool.rnd() + tool.rnd();
            }
            if (to == 'rgb') return 'rgb(' + rnd(0,255) + ',' + rnd(0,255) + ',' + rnd(0,255) + ')';

            return console.warn('Invalid Coler Format, try "hex" or "rgb"');
        }

        //Return Random Letter In String Num
        return num.rnd();
    }
    if (typeof num == 'object') {
        return num.rnd();
    }
}

/////////////////////
//HOW TO USE CREATE//
/////////////////////
//element.create("Element#id.class>innerHTML)
//element.create("<Element id='id' class='class'>innerHTML)
//
// < - Optional, start of code
// # - Id
// . - Class
// * - Type (For Custom Elements)
// > - InnerHTML
/////////////////////
let customElements = new Array();
function create(ele,x = null) {
    return document.body.create(ele,x);
}
Object.prototype.create = function(elem,x = null) {
    let all = [];
    let type = false;
    class addition {
        constructor(obj) {
            this.names = obj.names.length ? obj.names : [obj.names];
            this.txt = '';
            this.on = false;
            this.control = obj.control;
            this.fix = obj.fix;
        }
    }
    all.push(new addition({
        names: ['#','id'],
        fix: function(ele) {
            ele.id = this.txt;
        },
    }))
    all.push(new addition({
        names: ['.','class'],
        fix: function(ele) {
            ele.className = this.txt;
        },
    }))
    all.push(new addition({
        names: ['type'],
        fix: function(ele) {
            ele.type = this.txt;
        },
    }))
    all.push(new addition({
        names: ['placeholder'],
        fix: function(ele) {
            ele.placeholder = this.txt;
        },
    }))
    all.push(new addition({
        names: ['*'],
        fix: function() {
            type = this.txt;
        },
    }))
    let text = '';


    let element = '';
    let acceptable = [' ','>','.','#','*'];
    for (let i = 0; i < elem.length; i++) {
        if (elem.charAt(i) !== '<' && !acceptable.includes(elem.charAt(i))) element += elem.charAt(i);
        if (acceptable.includes(elem.charAt(i))) break;
    }
    for (let i = element.length; i < elem.length; i++) {
        let a = elem.charAt(i);

        let ban = ['<',' ','"',"'",'`','='];
        if (!ban.includes(a)) {
            all.forEach((e) => {
                let worked = e.names.length;
                let key = false;
                e.names.forEach((n) => {
                    let pass = true;
                    for (let k = 0; k < n.length; k++) {
                        if (elem.charAt(i+k) !== n.charAt(k)) {
                            pass = false;
                        }
                    }
                    if (!pass) worked--;
                    else key = n;
                });
                if (worked > 0) {
                    i += key.length - 1;
                    for (let j = i+1; j < elem.length; j++) {
                        if (!ban.includes(elem.charAt(j)) && !acceptable.includes(elem.charAt(j))) e.txt += elem.charAt(j);
                        if (acceptable.includes(elem.charAt(j))) {
                            i = j;
                            break;
                        }
                    }
                }
            })

            if(elem.charAt(i-1) == '>') {
                for (let j = i; j < elem.length; j++) {
                    text += elem.charAt(j);
                    i = j;
                }
            }
        }
    }

    let c = false; //c = custom (Custom Element)
    customElements.forEach(i => {
        if(i.name.toLowerCase() === element.toLowerCase()) c = i;
    })
    let ele;
    if (!c) ele = document.createElement(element);
    else {
        ele = document.createElement(c.based);
        ele.innerHTML = c.text;
        ele.css(c.css);
        ele.hover(c.hover)
        if (c.placeholder) ele.placeholder = c.placeholder;
        if (type) {
            let selectType = false;
            c.types.forEach(i => {
                if (i.type == type) selectType = i; 
            })
            if (selectType) {
                ele.css(selectType.css)
                ele.hover(selectType.hover)
            }
        } 
    }

    all.forEach((e) => {
        if (e.txt) e.fix(ele);
    })
    if (text) ele.innerHTML = text;
    if (x !== null) {
    this.insertBefore(ele,this.children[x]);
    } else this.appendChild(ele);
    return ele;
}



String.prototype.letters = function(first,last) {
    let a = "";
    for (var i = 0; i < this.length; i++){
    if (i >= first && i <= last)
    a += this.charAt(i);
    }
    return a;
}
function s_shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
Array.prototype.shuffle = function() {
    return s_shuffle(this);
}
String.prototype.shuffle = function() {
    let arr = this.split('');
    let cop = '';
    let exp = [];
    for (let i = 0; i < arr.length; i++) {
        let num = rnd(0,arr.length-1,exp);
        let chosen = arr[num];
        exp.push(num)
        cop += chosen;
    }

    return cop;
}


Array.prototype.sum = function() {
    return this.reduce((total,num) => { return total + num; });
}
Array.prototype.avg = function() {
    return this.sum()/this.length;
}
Array.prototype.high = function() {
    return Math.max(...this);
}
Array.prototype.low = function() {
    return Math.min(...this);
}
Array.prototype.median = function () {
    return this.slice().sort((a, b) => a - b)[Math.floor(this.length / 2)];
};
Array.prototype.mode = function() {
    let a = this;
    return Object.values(
    a.reduce((count, i) => {
        if (!(i in count)) {
        count[i] = [0, i];
        }
        
        count[i][0]++;
        return count;
    }, {})
    ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
}

function getPixelRatio(context) {
    var backingStores = [
      'webkitBackingStorePixelRatio',
      'mozBackingStorePixelRatio',
      'msBackingStorePixelRatio',
      'oBackingStorePixelRatio',
      'backingStorePixelRatio'
    ];
  
    var deviceRatio = window.devicePixelRatio;
  
    var backingRatio = backingStores.reduce(function(prev, curr) {
      return (context.hasOwnProperty(curr) ? context[curr] : 1);
    });
  
    return deviceRatio / backingRatio;
}
function clone(orig) {
    return Object.assign(Object.create(Object.getPrototypeOf(orig)),orig);
}

let libraries = {
    styles: {
        info: '.[color: lightblue;]',
        instruction: '.[color: orange; font-weight: bold;]',
        q: '.[font-weight: bold; color: grey;]',
        a: '.[font-weight: bold; color: white;]',
        aquire: '.[font-style: italic; color: #666;]',
    },
    libraries: ['library_canvas_v1'],
    list: function(page = 1) {
        let pages = Math.ceil(this.libraries.length / 10);
        let cpage = page;
        let ss = this.styles;
        slog(ss.aquire + cpage + '/' + pages + ' ' +  ss.info + 'All Available Libraries:');
        for (let i = (cpage-1)*10+1; i < (cpage-1)*10 + 11; i++) {
            if (this.libraries[i-1]) slog(ss.q + i,ss.a + this.libraries[i-1]);
        }
        if (cpage < pages) slog(ss.aquire + 'Use libraries.list(' + (cpage + 1) + ') To Get To The Next Page');
    },
    open: function(func,arr = []) {
        let counter = 0;
        for (let i = 0; i < this.libraries.length; i++) {
            if (!arr || arr.includes(this.libraries[i])) {
                let a = create('script');
                a.src='../../libraries/' + this.libraries[i] + '.js';
                a.onload = () => {
                    counter++;
                    if (counter == arr.length) func();
                }
            }
        }
        if (arr.length == 0) {
            func();
        }
    }
}
let plugins = {
    styles: {
        info: '.[color: lightblue;]',
        instruction: '.[color: orange; font-weight: bold;]',
        q: '.[font-weight: bold; color: grey;]',
        a: '.[font-weight: bold; color: white;]',
        aquire: '.[font-style: italic; color: #666;]',
    },
    plugins: ['plugin_customFillBar_v1','plugin_ccm_v2','plugin_local storage_v2'],
    list: function(page = 1) {
        let pages = Math.ceil(this.plugins.length / 10);
        let cpage = page;
        let ss = this.styles;
        slog(ss.aquire + cpage + '/' + pages + ' ' +  ss.info + 'All Available Plugins:');
        for (let i = (cpage-1)*10+1; i < (cpage-1)*10 + 11; i++) {
            if (this.plugins[i-1]) slog(ss.q + i,ss.a + this.plugins[i-1]);
        }
        if (cpage < pages) slog(ss.aquire + 'Use plugins.list(' + (cpage + 1) + ') To Get To The Next Page');
    },
    open: function(func,arr = []) {
        let counter = 0;
        for (let i = 0; i < this.plugins.length; i++) {
            if (!arr || arr.includes(this.plugins[i])) {
                let a = create('script');
                a.src='../../plugins/' + this.plugins[i] + '.js';
                a.onload = () => {
                    counter++;
                    if (counter == arr.length) func();
                }
            }
        }
        if (arr.length == 0) {
            func();
        }
    }
}

//Create A New Map Array
//let x = new Map(10,10,(i,j) => { return i*j; });
//x.map; //To Grab The Map
class Map {
    map = [];
    constructor(i,j,func) {
        this.height = i;
        this.width = j;
        for (let ai = 0; ai < i; ai++) {
            let toPush = [];
            for (let aj = 0; aj < j; aj++) {
                toPush.push(func(ai,aj));
            }
            this.map.push(toPush);
        }
    }
}

//Create A New Table Element Using Divs
//let x = new Table();
//x.create(map,function(cell,y,x) { cell.css({}) cell.innerHTML = 'Your Text' })
class Table {
    constructor(obj = {}) {
        this.table = create('table');
        //CSS DESIGN
        this.t = {
            display: 'table',
            borderCollapse: obj.borderCollapse ? obj.borderCollapse : 'collapse',
        }
        this.tr = {
            display: 'table-row',

        }
        this.tc = {
            display: 'table-cell',
            
        }
    }
    create = function(map,cellFormat) {
        this.table.css(this.t)
        for (let i = 0; i < map.length; i++) {
            let row = this.table.create('div');
            row.css(this.tr)
            for (let j = 0; j < map[i].length; j++) {
                let cell = row.create('div');
                cell.css(this.tc);
                cellFormat(cell,i,j)
            }
        }

        
    }
}


/////////////////
///SYSTEM WORK///
/////////////////

window.mouse = {
    prevX: false,
    prevY: false,
    x: false,
    y: false,
}
window.on('mousemove',function(e) {
    window.mouse.prevX = window.mouse.x;
    window.mouse.prevY = window.mouse.y;
    window.mouse.x = e.pageX;
    window.mouse.y = e.pageY;
});
function getWidth() {
    if (self.innerWidth) {
        return self.innerWidth;
    }
    
    if (document.documentElement && document.documentElement.clientWidth) {
        return document.documentElement.clientWidth;
    }
    
    if (document.body) {
        return document.body.clientWidth;
    }
}
function getHeight() {
    if (self.innerHeight) {
        return self.innerHeight;
    }
    
    if (document.documentElement && document.documentElement.clientHeight) {
        return document.documentElement.clientHeight;
    }
    
    if (document.body) {
        return document.body.clientHeight;
    }
}

var q = {
    settings: {
        click: false,
        down: false,
        
        forever: false,
        select: false,

        mousePos: false,

        func: false,
    },
    numkeys: [
        () => {},
        () => {},
        () => {},
        () => {},
        () => {},
        () => {},
        () => {},
        () => {},
        () => {},
        () => {},
    ],
    keys: [],


    start: function() {
        this.loadcolors();

        window.on('keydown',function(e) {
            key = e.key.toLowerCase();
            if (key == 'q') {
                q.keys = [];
                q.settings.down = true;
            }
            if (q.settings.down) {
                switch (key) {
                    case 'f':
                        q.settings.forever = q.settings.forever ? false: true;
                        break;
                    case 'd':
                        q.settings.select = q.settings.select ? false: true;
                        if (!q.keys.includes('d')) q.keys.push('d');
                        break;
                    case 'w':
                        if (!q.keys.includes('w')) q.keys.push('w');
                        break;
                    case 'e':
                        if (!q.keys.includes('e')) q.keys.push('e');
                        break;
                }
                if (Number(key)) {
                    q.settings.func = Number(key);
                }
            }
        })
        document.on('click',function(e) {
            window.mouse.x = e.pageX;
            window.mouse.y = e.pageY;
    
            if (q.settings.click) {
                switch (q.settings.click) {
                    case 1:
                        q.settings.click = 2; 
                        q.settings.clickPos.push({
                            x: mouse.x,
                            y: mouse.y
                        })
                        break;
                    case true:
                        q.settings.clickPos = [{
                            x: mouse.x,
                            y: mouse.y
                        }];
                        if (q.settings.clickType == 'w')  {
                            q.settings.click = true;
                            q.qlog(q.styleUse.info + "(Click Position) " + q.styleUse.q + "X:" + q.styleUse.a + q.settings.clickPos[0].x + q.styleUse.q + " Y:" + q.styleUse.a + q.settings.clickPos[0].y + q.styleUse.aquire + " (mouse.x || mouse.y)");
                        } else {
                            q.settings.click = 1; 
                        }
                        break;
                        
                }
            }
        })
        document.on('keyup',(e) => {
            if (e.key == 'q' || e.key == 'Q') {
                    for (let i = 0; i < q.keys.length; i++) {
                        switch (q.keys[i]) {
                            case 'w':
                                if (q.keys.includes('d') && q.settings.select) {
                                    q.settings.click = true;
                                    q.settings.clickType = 'w'; 
                                    q.qlog(q.styleUse.instruction+'Click Anywhere On The Screen');
                                } else if(q.keys.includes('d') && !q.settings.select) {
                                    q.settings.click = false;
                                } else {
                                    if (q.settings.forever) q.settings.mousePos = q.settings.mousePos ? false : true;
                                    else q.settings.mousePos = 1;
                                }
                                break;
                            case 'e':
                                q.settings.color = q.settings.color ? false : true;
                                if (q.settings.color) {
                                    q.settings.colorEle = create("input");
                                    q.settings.colorEle.type = 'color';
                                    q.settings.colorEle.css({
                                        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                                        border: "none",
                                        width: '25px',
                                        height: '25px',
                                        outline: "none",
                                        background: 'lightblue',
                                        position: 'absolute',
                                        top: mouse.y + 'px',
                                        left: 25 + mouse.x + 'px', 
                                    })
    
                                } else {
                                    q.settings.colorEle.remove();
                                }
                                break;
                        }
                    }
                    if (q.settings.func) {
                        q.numkeys[q.settings.func]();
                    }
                    q.settings.func = false;
                    q.keys = [];
                    q.settings.down = false;
            }
        });
    
        setInterval(() => {
    
            if (q.settings.mousePos && ((window.mouse.prevX !== window.mouse.x && window.mouse.prevY !== window.mouse.y) || q.settings.mousePos === 1)) {
                q.qlog(q.mousePos())
                if (q.settings.mousePos === 1) q.settings.mousePos = false;
            }
            
    
        })
    },

    log: function(num,func) {
        this.numkeys[num] = func;
    },
    styles: {
        background: 'background: #000;',

        info: ' color: lightblue;]',
        alert: ' color: #ffcccb; font-weight: bold]',
        instruction: ' color: orange; font-weight: bold;]',
        q: ' font-weight: bold; color: grey;]',
        a: ' font-weight: bold; color: white;]',
        aquire: ' font-style: italic; color: #666;]',
        tag: ' color: red;][q] ',
    },
    styleUse: {
        info: '',
        alert: '',
        instruction: '',
        q: '',
        a: '',
        aquire: '',
        tag: '',
    },
    loadcolors: function(type = false) {
        let s = this.styleUse;
        switch(type) {
            case false:
                this.styles.background = 'background: none;';
                break;
            case 'help':
                this.styles.background = 'background: #000;';
                break;
        }

        s.info = '.[' + this.styles.background + this.styles.info;
        s.alert = '.[' + this.styles.background + this.styles.alert;
        s.instruction = '.[' + this.styles.background + this.styles.instruction;
        s.q = '.[' + this.styles.background + this.styles.q;
        s.a = '.[' + this.styles.background + this.styles.a;    
        s.aquire = '.[' + this.styles.background + this.styles.aquire;
        s.tag = '.[' + this.styles.background + this.styles.tag;
        
    },
    qlog: function(txt) {
        this.loadcolors();
        slog(this.styleUse.tag + txt)
    },
    mousePos: function() {
        this.loadcolors();
        if (window.mouse.x === false) return this.styleUse.alert + `Mouse Has Not Moved `+ this.styleUse.aquire + `(mouse.x || mouse.y)`;
        return this.styleUse.info + "(Mouse Position) " + this.styleUse.q + "X:" + this.styleUse.a + window.mouse.x + this.styleUse.q + " Y:" + this.styleUse.a + window.mouse.y + this.styleUse.aquire + " (mouse.x || mouse.y)";
    },

    help: function(page = 1) {
        this.loadcolors('help');
        let s = this.styleUse;

        slog(s.tag + s.info + 'Help Page: ' + page + ' out of 2' + s.aquire + ' q.help(NUM)')
        if (page === 0) {
            slog(s.alert + 'Chapters');
            slog(s.q + "1: " + s.a + "How To Use Q and all Q Commands");
            slog(s.q + "2: " + s.a + "How To Use Create Command");
            
        }
        if (page == 1) {
            slog(s.alert + 'To Use Q: Hold Q and then any of the following keys to perform actions upon release of keys.')
            slog(s.q + 'W: ' + s.a + 'Log Cursor Position');
            slog(s.q + 'W + F: ' + s.a + 'Constantly Log Cursor Position Until W + F Pressed Again');
            slog(s.q + 'W + D: ' + s.a + 'Turns On/Off Click Mode, Click The Screen To Log Cursor Position')
            slog(s.q + 'NUMBER: ' + s.a + 'Perfrom Function Assigned To Number, To Assign A Function To A Number Use q.log(num,func)')
            slog(s.q + 'E: ' + s.a + 'Open/Close Color Picker/Tools')
        }
        if (page == 2) {

        }
    }
}

/*
    Example code:
    slog('.[background: green; color: red;]Hello World'); //Out puts a log that says "Hello World" in red with a green background.
*/
window.slog = function() {
    let final = 'console.log(';
    if (!arguments.length) arguments = [''];
    for (let k = 0; k < arguments.length; k++) {
        let texts = [];
        let addons = [];
        let text = '';
        let prev = false;
        let txt = arguments[k] + '';
        if (txt !== '<br>') {
            for (var i = 0; i < txt.length; i++) {
                if (txt.charAt(i) == '.' && txt.charAt(i + 1) == '[') {
                    if (prev) {
                        texts.push(text);
                        text = '';
                    }
                    i += 2;
                    let add = '';
                    for (var j = i; j < txt.length; j++) {
                        if (txt.charAt(j) == ']') {
                            addons.push(add);
                            i = j;
                            j = txt.length;
                        } else {
                            add += txt.charAt(j);
                        }
                    }
                    prev = true;
                } else {
                    text += txt.charAt(i);
                }
            }
            texts.push(text);
            if (addons.length > 0) {
                for (var i = 0; i < texts.length - k; i++) {
                    final += ' "%c' + texts[i] + '" +';
                }
            } else if (k > 0) {
                final += "'" + texts + "''";
            } else {
                final += "'" + texts + "''";
            }
            final = final.substring(0, final.length - 1);
            final += ',';
            for (var i = 0; i < addons.length; i++) {
                final += ' "' + addons[i] + '",';
            }   
            final = final.substring(0, final.length - 1);
            final += ',';
        } else {
            final += `"<br>",`;
        }
    }
    final = final.substring(0,final.length - 1) + ')';
    eval(final);
}
sloglibrary = function(v,n,c) {
slog('.[background: lightgreen; font-weight: bold; font-size: 14px; color: black]V' + v + ' Library .[background: lightgreen;font-weight: bold; font-size: 20px; color: black]' + n + '.[background: lightgreen;font-weight: bold; font-size: 14px; color: black] ' + c);
}
plugin = function(v,n,c) {
    slog('.[background: lightyellow; color: black;font-weight: bold; black;font-size: 14px]V' + v + ' Plugin .[background: lightyellow;font-weight: bold;color: black; font-size: 20px]' + n +'.[background: lightyellow;color: black;font-weight: bold; font-size: 14px] ' + c);
}
mod = function(v,n,c) {
    slog('.[background: #FF7F7F; color: black;font-weight: bold; black;font-size: 14px]V' + v + ' Mod .[background: #FF7F7F;font-weight: bold;color: black; font-size: 20px]' + n +'.[background: #FF7F7F;color: black;font-weight: bold; font-size: 14px] ' + c);
}

sloglibrary(14,'Simple','JoeTheHobo');