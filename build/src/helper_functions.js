var helper = {};

(function(exports, d) {
  function domReady(fn, context) {

    function onReady(event) {
      d.removeEventListener("DOMContentLoaded", onReady);
      fn.call(context || exports, event);
    }

    function onReadyIe(event) {
      if (d.readyState === "complete") {
        d.detachEvent("onreadystatechange", onReadyIe);
        fn.call(context || exports, event);
      }
    }

    d.addEventListener && d.addEventListener("DOMContentLoaded", onReady) ||
    d.attachEvent      && d.attachEvent("onreadystatechange", onReadyIe);
  }

  exports.domReady = domReady;
})(window, document);


helper.isInViewport = function(el){
  if (!el) {
    return;
  }

  var rect = el.getBoundingClientRect();
  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&

    rect.top <= (
    window.innerHeight ||
    document.documentElement.clientHeight) &&

    rect.left <= (
    window.innerWidth ||
    document.documentElement.clientWidth)
  );
};

helper.registerListener = function(event, func) {
  if (window.addEventListener) {
    window.addEventListener(event, func);
  } else {
    window.attachEvent('on' + event, func);
  }
};
helper.removeListener = function(event, func){
  if(window.addEventListener){
    window.removeEventListener(event, func);
  } else {
    window.detachEvent('on' + event, func);
  }
};

var getRtlCss = function(xmlHtml) {
  if(_Language.isLTRLanguage(_User.lang)){
    xmlHtml = xmlHtml.replace('.css', '-rtl.css');
  }

  return xmlHtml;
};

helper.loadTemplate = function(elementId, type, name){
  var path = '/src/templates/' + type + '/' + name + '/' + name + '.html';
  var xhr = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('get', path, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status == 200) {
      if (document.getElementById(elementId)) document.getElementById(elementId).innerHTML = xhr.responseText;
      var body = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      var fileName = name + '/' + name + '.js';
      script.type = 'text/javascript';
      script.src = '/src/templates/' + type + '/' + fileName;

      // Then bind the event to the callback function.
      // There are several events for cross browser compatibility.
      script.onreadystatechange = name + 'Run';
      script.onload = name + 'Run';

      // Fire the loading
      body.appendChild(script);
    }
  };
  xhr.send();
};

var getRevCss = function (xmlHtml, page) {
  var cssFileName = page + '-concatenation-min.css';
  var rtlCSSFileName = page + '-concatenation-min-rtl.css';
  var revFileName = _Files && _Files['revFiles']
      [(_Language.isLTRLanguage(_User.lang) ? rtlCSSFileName : cssFileName)];
  xmlHtml = xmlHtml.replace(cssFileName, revFileName);

  return xmlHtml;
};


helper.generateModuleExecuteEvent = function (moduleName) {

  return (moduleName + '-start-execute');
};

helper.fireModuleExecuteEvent = function (moduleName) {
  var event = document.createEvent('Event');
  event.initEvent(helper.generateModuleExecuteEvent(moduleName), true, true);
  document.getElementById('event-anchor').dispatchEvent(event);
};

helper.moduleExecuteCb = function (node, moduleName, callback, executeOnce) {

  // create event
  node.addEventListener(helper.generateModuleExecuteEvent(moduleName), function (e) {
    // remove event
    if (executeOnce) {
      e.target.removeEventListener(e.type, arguments.callee);
    }
    // call handler
    return callback(e);
  });
};

helper.promiseToLoadScript = function(path, async) {
  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  return new Promise(function(resolve, reject) {
    var parent = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = path;
    script.async = async;

    if( script.readyState ) {
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" || script.readyState == "complete"){
          script.onreadystatechange = null;
          resolve();
        }
      };
    } else {
      script.onload = function() {
        resolve();
      };
    }

    script.onerror = function() {
      reject();
    };

    parent.appendChild(script);
  });
};

helper.loadScript = function(path, callback){
  var body = document.getElementsByTagName(((body && 'body') || 'head'))[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = path;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  callback && (script.onreadystatechange = callback);
  callback && (script.onload = callback);

  // Fire the loading
  body.appendChild(script);
};
helper.setContent = function(content){
  var assignToDOM = function(arr){

    arr[1] = helper.safeDisplay(arr[1]);
    if (document.getElementById(arr[0])) document.getElementById(arr[0]).innerHTML = arr[1];
  };
  if(typeof content === 'object'){
    for(var x=0; x < content.length; x++){
      assignToDOM(content[x]);
    }
  }
};

helper.empty = function(divId){
  document.getElementById(divId).innerHTML = '';
};

// helper.ngRepeat('vertical-wx-row', 'components', 'vertical-wx-row', ngRepeatMap, _Data.hourly, 6);

helper.ngRepeat = function(divId, componentName, dataMap, data, multiplier){
  return new Promise(function(resolve){
    var specificIndexes = 0;
    if(typeof multiplier === 'object'){
      specificIndexes = multiplier;
      multiplier = multiplier.length;
    } else {
      multiplier = multiplier === 'all' ? data[dataMap[0][1]].length : multiplier;
    }

    var path = '/pwa/templates/html-min/components/' + componentName + '/' + componentName + '.html';
    var xhr = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var div;
    xhr.open('get', path, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        rawTemplate = xhr.responseText;

        var pluginData = function(classKey, elm, rowId){
          dataIndex = specificIndexes ? specificIndexes[rowId] : rowId;
          if (dataMap[classKey][1].indexOf('.') > -1) {
            splitData = dataMap[classKey][1].split('.');
            if (data[splitData[0]][splitData[1]][dataIndex] == null) {
              dataPiece = data['night'][splitData[1]][dataIndex];
            } else {
              dataPiece = data[splitData[0]][splitData[1]][dataIndex];
              var dataPieceLog = 'dataPiece = ' + dataPiece;
              var dataIndexLog = 'dataIndex = ' + dataIndex;
              var splitDataLog = 'splitData = ' + splitData;
            }
          } else {
            dataPiece = data[dataMap[classKey][1]][dataIndex];
          }
          if (dataPiece === 0 || dataPiece) {
            if (iconIds.indexOf(dataMap[classKey][1]) > -1) {
              elm.innerHTML = getWxIcon(dataPiece);
            } else if (dataMap[classKey][1].indexOf('Class') !== -1) {
              helper.addClass(elm, dataPiece);
            } else if (dataMap[classKey][1].indexOf('Url') !== -1) {
              elm.href = dataPiece;
            } else {
              elm.innerHTML = dataPiece;
              if (dataMap[classKey][2]) {
                elm.innerHTML += ' ' + dataMap[classKey][2];
              }
            }
          }
        };
        var getLength = function() {
          for (var classKey in dataMap) {
            var classXes = document.getElementById(divId).getElementsByClassName(dataMap[classKey][0]);
            if(classXes.length === 1){
              pluginData(classKey, classXes[0], 0);
            } else if (classXes.length > 1){
              for (var x=0; x < classXes.length; x++) {
                pluginData(classKey, classXes[x], x);
              }

            } else {
              // No items where found with that class.
            }

            if(classKey == dataMap.length -1){
              resolve();
            }
          }

        };
        //put the template in x times.
        div = document.getElementById(divId);
        var templates = '';
        for(x=0; x < multiplier; x++){
          if(div){
            templates += rawTemplate;
          }
        }
        if (div) {
          div.innerHTML = templates;
          getLength();
        }
      }
    };
    xhr.send();

  });
};

helper.ngRepeatReverse = function(divId, componentName, dataMap, data, multiplier){
  multiplier = multiplier === 'all' ? dataMap.length : multiplier;
  var path = 'templates/html-min/components/' + componentName + '/' + componentName + '.html';
  var xhr = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  var classXes = '', x = 0, i = 0, j = 0 ;
  xhr.open('get', path, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status == 200) {
      var rawTemplate = xhr.responseText;
      //put the template in x times.
      for(x=0; x < multiplier; x++){
        document.getElementById(divId).innerHTML += rawTemplate;
      }
      //for each item in the map, get all the elements with that class.
      for(i=0; i < dataMap.length; i++){
        classXes = document.getElementsByClassName(dataMap[i][0]);
        //for each element, place its piece of data in it.
        for(j=0; j < classXes.length; j++){
          classXes[j].innerHTML = data[j][dataMap[i][1]];
        }
      }

    }
  };
  xhr.send();
};

helper.isNumeric = function(num){
  return typeof num === 'number' && num !== 'NaN';
};

helper.getFormattedName = function(loc, intl) {
  var locTypes = _Locations.locTypes,
    types = [locTypes.Airports, locTypes.Ski, locTypes.Golf, locTypes.Lakes, locTypes.Outdoor, locTypes.Parks],
    locale = _User.lang,
    intl = locale === 'en-US',
    defaultCountryCodeForLocale = (_Locations.localeToCountryCode[locale] || 'US').toUpperCase(),
    country = loc.cntryCd === defaultCountryCodeForLocale && loc.locType === 1 || loc.cntryCd !== defaultCountryCodeForLocale ? helper.capitalizeEachWord(loc._country) : '',
    regionName = (loc.stCd||'').length > 0 ? country.length > 0 ? helper.capitalizeEachWord(loc.stNm) + ', ' : helper.capitalizeEachWord(loc.stNm) : '',
    region = (intl && loc.stNm) || loc.stCd,
    presName = helper.capitalizeEachWord(loc.cityNm),
    name3 = types.indexOf(loc.locType) >= 0 && loc.parentCity ? loc.parentCity + ', ' : '',
    name1 = ((intl && loc.cityNm) || helper.capitalizeEachWord(loc.cityNm)) + ', ' + name3 + region,
    zip = loc.locId,
    zipSearch = ((loc.locType === locTypes.Zips) && (zip !== null) && (loc.cntryCd === defaultCountryCodeForLocale)) ? ' (' + zip + ')' : '',
    name, name2;
  name2 = regionName.length > 0 ? presName + ', ' + name3 + loc.stNm : presName;
  name = loc.cntryCd === defaultCountryCodeForLocale ? name1 + zipSearch : ((intl) ? name1 + zipSearch + ', ' + country : helper.capitalizeEachWord(name2) + ', ' + country);

  return helper.capitalizeEachWord(name);
};

helper.getFormattedPresName = function(_loc) {
  var locale = _User.lang,
    loc = _loc || _User.activeLocation,
    defaultCountryCodeForLocale = (_Locations.localeToCountryCode[locale] || 'US').toUpperCase();
  if( loc && (locale !== 'en-US') && (defaultCountryCodeForLocale === loc.cntryCd) ){
    return loc.nickname || (loc.prsntNm && (loc.prsntNm.split(',')[0] + ", " + loc.stCd)) || '';
  }
  return (loc && (loc.nickname || loc.prsntNm)) || '';
};

helper.capitalize = function(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
};

helper.hasClass = function(elem, className){
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

helper.addClass = function(elem, className){
  if (elem && !helper.hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
};

helper.removeClass = function(elem, className){
  if (elem) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (helper.hasClass(elem, className)) {
      while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
        newClass = newClass.replace(' ' + className + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  }
};


helper.toggleClass = function(elem, className){
  var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ' ) + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
      newClass = newClass.replace( ' ' + className + ' ' , ' ' );
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  } else {
    elem.className += ' ' + className;
  }
};

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
  module.exports = helper;
}

helper.getJSON = function (path) {
  return new Promise(function (resolve, reject) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
      if (xobj.readyState === 4) {
        if (xobj.status == "200") {
          resolve(JSON.parse(xobj.responseText));
        } else {
          reject(xobj);
        }
      }
    };
    xobj.send(null);
  });
};

helper.getData = function(id){
  return document.getElementById(id).value || ''; 
}

helper.constantJSON = {};
helper.getConstantJSON = function (name) {
  var path = '/pwa/js-src/json-constants/concatenation.json';
  var newPromise = new Promise(function (resolve) {
    if (!helper.constantJSON.content) {
      // prevent duplicate request
      if (!helper.constantJSON.promise) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
          if (xobj.readyState === 4 && xobj.status == "200") {
            helper.constantJSON.content = JSON.parse(xobj.responseText);
            resolve(helper.constantJSON.content[name]);
            helper.constantJSON.promise = null;
          }
        };
        xobj.send(null);
      } else {
        helper.constantJSON.promise.then(function () {

          resolve(helper.constantJSON.content[name]);
        })
      }
    } else {
      resolve(helper.constantJSON.content[name]);
    }
  });
  if (!helper.constantJSON.content && !helper.constantJSON.promise) {
    helper.constantJSON.promise = newPromise;
  }
  return newPromise;
};

helper.parseQueryString = function() {

  var str = window.location.search;
  var objURL = {};

  str.replace(
    new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
    function( $0, $1, $2, $3 ){
      objURL[ $1 ] = $3;
    }
  );
  return objURL;
};

helper.setCanonical = function(canonicalValue){

  //for getting user info to add to page canonical
  var basePath = 'https://weather.com/',// Never: location.origin, always point to prod.
    fallback = window.location.href.replace(/.+\.weather\.com/, basePath);



  var generateMetaTag = function(){
    var locInfo = _Router.locSearch;
    var url = locInfo? basePath + canonicalValue + locInfo : fallback;
    var links = document.getElementsByTagName('link');
    for(var i = 0; i<links.length; i++) {
      if (links[i].hasAttribute('rel') && links[i].getAttribute('rel') === 'canonical') {
        links[i].setAttribute('href', url);
        return;
      }
    }
    var cLink = document.createElement("link"), head = document.getElementsByTagName("head")[0];
    cLink.setAttribute("rel", "canonical");
    cLink.setAttribute("href", url);
    head.appendChild(cLink);
  };

  generateMetaTag();
};

helper.pdTranslate = function (content, destination) {
  var translatedObject = destination ? destination : _Lang;
  return translatedObject && translatedObject[content] ? translatedObject[content] : content;
};

helper.getActiveLocID = function(){
  var activeLoc = _User.activeLocation;
  return activeLoc ? (activeLoc.locId ? (activeLoc.locId + ':' + activeLoc.locType + ':' + activeLoc.cntryCd) : '') : '';
};

helper.safeDisplay = function(input, textToReplace){
  return (input === 0 || !!input) ? input : (textToReplace || '--');
};

helper.capitalizeEachWord = function(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

helper.localizedDateFormatWithoutYear = function(date, timeFormat) {
  var formatL = moment.localeData().longDateFormat(timeFormat);
  var formatWithoutYear = formatL.replace(/Y/g,'').replace(/^\W|\W$|\W\W/,'');
  return moment(date).format(formatWithoutYear);
};

helper.checkModuleIsVisible = function(eleId) {
  return document.getElementById(eleId) ? true : false;
};

helper.moduleIsLazyExecute = function (eleId) {
  var module = document.getElementById(eleId);
  if (module && module.getAttribute('data-lazy-execute') === 'true') {
    return true;
  }
  return false;
};

helper.formatDate = function(fullDate) {
  //WEB-8227: can not use the time format in _Lang because _Lang's will be translated and we can not match
  //the requirement (apply 24hour for all locales except en-US)
  var timeFormat = _User.lang === 'en-US' ? 'h:mm a' : 'H:mm';
  return fullDate ? moment(fullDate).utcOffset(fullDate).format(timeFormat) : null;
};

helper.getTimezoneFromDatetime =  function(fullDate) {
  var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
  var match = fullDate.match(R_ISO8601_STR);
  return match ? match[8] : null;
};

helper.getCurrentDateWithTimezone = function(timeZone) {
  return timeZone ? moment(moment.now()).utcOffset(timeZone).format('YYYY-MM-DD') :  moment.now().format('YYYY-MM-DD');
};

helper.getURLParameter = function (name, search) {
  var match = new RegExp('[?&]' + name + '=([^&]*)').exec(search ? search : window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

helper.ngShow = function (elmID, show) {
  var elm = document.getElementById(elmID);
  // if there is no argument 2, will be show by default
  show = (typeof show === 'undefined' ? true : show);
  if (!elm) {
    return;
  }

  if (show) {
    helper.removeClass(elm, 'pwa-hidden');
  } else {
    helper.addClass(elm, 'pwa-hidden');
  }
};

helper.ngHide = function (elmID, hidden) {
  // if there is no argument 2, will be hidden by default
  hidden = (typeof hidden === 'undefined' ? true : hidden);
  helper.ngShow(elmID, !hidden);
};

helper.setInnerHTML = function (elmID, string) {
  var elm = document.getElementById(elmID);
  if (elm) {
    elm.innerHTML = string;
  }
};

helper.setStyle = function (elmId, styleName, value) {
  var elm = document.getElementById(elmId);
  if (elm) {
    elm.style[styleName] = value;
  }
};

helper.changeLocaleForMoment = function (lang) {
  var xlatedLang = _Router.getXlatedLang(lang);
  var xlatedLangLog = '(line 517, helper_functions.js): xlatedLang = ' + xlatedLang;
  moment.locale(xlatedLang);
};

helper.debounce = function (fn, delay) {
  var timer = null;
  var delay = delay != undefined ? delay : 250;

  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
};

helper.getRMID = function() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

helper.setSWDebug = function(bool){
  var request = indexedDB.open("sw-debug-settings");

  request.onerror = function(e) {
    console.log("could not open indexedDB");
  };
  request.onupgradeneeded = function(e) {
    var db = request.result;
    var store = db.createObjectStore("DebugSettings");
  };
  request.onsuccess = function(e) {
    var db = request.result;
    var transaction = db.transaction("DebugSettings", "readwrite");
    var store = transaction.objectStore("DebugSettings");
    store.put({
      id:0,
      shouldDebug: (bool === true)
    });

    transaction.oncomplete = function() {
      db.close();
    };
  };
};

helper.isChrome = function () {
  // Checking incognito mode:
  var requestFileSystem = window.RequestFileSystem || window.webkitRequestFileSystem;

  return new Promise(function (resolve, reject) {
    requestFileSystem && requestFileSystem(window.TEMPORARY, 100, function () {
      resolve(true);
    }, function(){
      resolve(false);
    });
  });
};

