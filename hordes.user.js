// ==UserScript==
// @name        Guizmus' Horde script
// @namespace   horde
// @include     http://www.hordes.fr/*
// @include     www.hordes.fr/*
// @include     hordes.fr/*
// @version     1.3.3.2
// @grant		none
// ==/UserScript==

// compatibilité chrome : @include
if(location.host.match('hordes.fr')) {

// compatibilité chrome jQuery
if ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (typeof($) == "undefined") /* && (!/\/tid\/forum/.test(unsafeWindow.location.href)) */) {
	if (typeof(unsafeWindow) == "undefined")
		var unsafeWindow = window;
	var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
} else {
	var loadAndExecute = function(url,f) {
		return f();
	}
}
loadAndExecute("http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js", function() {
var $sab = (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) ? jQuery.noConflict() : $;

// main
$sab(function () {

if (typeof(unsafeWindow) == "undefined")
	var unsafeWindow = window;

unsafeWindow.sab_debug = false;
unsafeWindow.sab_debug_id = 328538;
unsafeWindow.sab_debug_xml = "328538_1350733026";

unsafeWindow.chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
// modification de l'ajax jquery pour accepter le crossdomaine
$sab.ajax = (function(_ajax){
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from {HTML} where url="{URL}" {COMPLEMENT}';
    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url) && (!/guizmus.fr/.test(url));
    }
   
    return function(o) {
        var url = o.url;
		
		if (isExternal(url) && !/json/i.test(o.dataType)) {
			o.url = YQL;
			o.dataType = 'json';
			
			o.data = {
				q: query.replace(
					'{URL}',
					url + ((o.data && (o.type == 'GET')) ?
						(/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
					: '')
				).replace(
					'{HTML}',
					o.ext ? o.ext : (o.type == 'GET' ? 'html' : 'htmlpost')
				).replace(
					'{COMPLEMENT}',
					((o.type == 'POST') ? ' and postdata="'+o.data+'" and xpath="'+(o.xpath ? o.xpath : '/*')+'"' : "") 
				),
				format: o.format || 'xml',
				env:"store://datatables.org/alltableswithkeys"
			};
			if (!o.success && o.complete) {
				o.success = o.complete;
				delete o.complete;
			}
		   
			o.success = (function(_success){
				return function(data) {
					if (_success) {
						_success.call(this, {
							responseText: (data.results ? data.results[0] : (data.query.results || ''))
								// .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
						}, 'success');
					}
				   
				};
			})(o.success);
		}
       
        return _ajax.apply(this, arguments);
       
    };
})($sab.ajax);

// selector econtains pour jQuery. permet un matching strict sans prise en compte de la case.
$sab.expr[":"].econtains = function(obj, index, meta, stack){
	// return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
	// return (obj.textContent || obj.innerText || $(obj).text() || "") == meta[3];
	return (obj.textContent || "") == meta[3];
}

/*
 ### jQuery XML to JSON Plugin v1.1 - 2008-07-01 ###
 * http://www.fyneworks.com/ - diego@fyneworks.com
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
*/
// xml2json pour jQuery
;if(window.jQuery) (function($){
 $.extend({
  xml2json: function(xml, extended) {
   if(!xml) return {};
   function parseXML(node, simple){
    if(!node) return null;
    var txt = '', obj = null, att = null;
    var nt = node.nodeType, nn = jsVar(node.localName || node.nodeName);
    var nv = node.text || node.nodeValue || '';
    if(node.childNodes){
     if(node.childNodes.length>0){
      $.each(node.childNodes, function(n,cn){
       var cnt = cn.nodeType, cnn = jsVar(cn.localName || cn.nodeName);
       var cnv = cn.text || cn.nodeValue || '';
       if(cnt == 8){
        return;
       }
       else if(cnt == 3 || cnt == 4 || !cnn){
        if(cnv.match(/^\s+$/)){
         return;
        };
        txt += cnv.replace(/^\s+/,'').replace(/\s+$/,'');
       }
       else{
        obj = obj || {};
        if(obj[cnn]){
                                    if(!obj[cnn].length) obj[cnn] = myArr(obj[cnn]);
                                    obj[cnn] = myArr(obj[cnn]);
        
                                    obj[cnn][ obj[cnn].length ] = parseXML(cn, true/* simple */);
         obj[cnn].length = obj[cnn].length;
        }
        else{
         obj[cnn] = parseXML(cn);
        };
       };
      });
     };
    };
    if(node.attributes){
     if(node.attributes.length>0){
      att = {}; obj = obj || {};
      $.each(node.attributes, function(a,at){
       var atn = jsVar(at.name), atv = at.value;
       att[atn] = atv;
       if(obj[atn]){
        obj[cnn] = myArr(obj[cnn]);
                               
                                obj[atn][ obj[atn].length ] = atv;
        obj[atn].length = obj[atn].length;
       }
       else{
        obj[atn] = atv;
       };
      });
     };
    };
    if(obj){
     obj = $.extend( (txt!='' ? new String(txt) : {}),/* {text:txt},*/ obj || {}/*, att || {}*/);
     txt = (obj.text) ? (typeof(obj.text)=='object' ? obj.text : [obj.text || '']).concat([txt]) : txt;
     if(txt) obj.text = txt;
     txt = '';
    };
    var out = obj || txt;
    if(extended){
     if(txt) out = {};
     txt = out.text || txt || '';
     if(txt) out.text = txt;
     if(!simple) out = myArr(out);
    };
    return out;
   };
   var jsVar = function(s){ return String(s || '').replace(/-/g,"_"); };
            function isNum(s){
                var regexp=/^((-)?([0-9]+)(([\.\,]{0,1})([0-9]+))?$)/
                return (typeof s == "number") || regexp.test(String((s && typeof s == "string") ? jQuery.trim(s) : ''));
            };
                                                               
   var myArr = function(o){
    if(!$.isArray(o)) o = [ o ]; o.length=o.length;
               
    return o;
   };
   if(typeof xml=='string') xml = $.text2xml(xml);
  
   if(!xml.nodeType) return;
   if(xml.nodeType == 3 || xml.nodeType == 4) return xml.nodeValue;
  
   var root = (xml.nodeType == 9) ? xml.documentElement : xml;
  
   var out = parseXML(root, true);
  
   xml = null; root = null;
  
   return out;
  },
 
  text2xml: function(str) {
   var out;
   try{
    var xml = ($.browser.msie)?new ActiveXObject("Microsoft.XMLDOM"):new DOMParser();
    xml.async = false;
   }catch(e){ throw new Error("XML Parser could not be instantiated") };
   try{
    if($.browser.msie) out = (xml.loadXML(str))?xml:false;
    else out = xml.parseFromString(str, "text/xml");
   }catch(e){ throw new Error("Error parsing XML string") };
   return out;
  }
       
 }); // extend $
})($sab);

// cookies pour jQuery
(function ($, document, undefined) {
	var pluses = /\+/g;
	function raw(s) {
		return s;
	}
	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}
	var config = $.cookie = function (key, value, options) {
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);
			if (value === null) {
				options.expires = -1;
			}
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
			value = config.json ? JSON.stringify(value) : String(value);
			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '',
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}

		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}
		return null;
	};
	config.defaults = {};
	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};
})($sab, document);

// json encode
(function($){var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};$.toJSON=typeof JSON==='object'&&JSON.stringify?JSON.stringify:function(o){if(o===null){return'null';}
var type=typeof o;if(type==='undefined'){return undefined;}
if(type==='number'||type==='boolean'){return''+o;}
if(type==='string'){return $.quoteString(o);}
if(type==='object'){if(typeof o.toJSON==='function'){return $.toJSON(o.toJSON());}
if(o.constructor===Date){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
if(day<10){day='0'+day;}
if(hours<10){hours='0'+hours;}
if(minutes<10){minutes='0'+minutes;}
if(seconds<10){seconds='0'+seconds;}
if(milli<100){milli='0'+milli;}
if(milli<10){milli='0'+milli;}
return'"'+year+'-'+month+'-'+day+'T'+
hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
if(o.constructor===Array){var ret=[];for(var i=0;i<o.length;i++){ret.push($.toJSON(o[i])||'null');}
return'['+ret.join(',')+']';}
var name,val,pairs=[];for(var k in o){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=$.quoteString(k);}else{continue;}
type=typeof o[k];if(type==='function'||type==='undefined'){continue;}
val=$.toJSON(o[k]);pairs.push(name+':'+val);}
return'{'+pairs.join(',')+'}';}};$.evalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(src){return eval('('+src+')');};$.secureEvalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(src){var filtered=src.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+src+')');}else{throw new SyntaxError('Error parsing JSON, source is not valid.');}};$.quoteString=function(string){if(string.match(escapeable)){return'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+string+'"';};})($sab);

// cache, via les storages 
unsafeWindow.sab_cache = {
	domaine : "sab_",
	// cache_serveur : ["sab_xml_hordes_maj","sab_xml_hordes_attaque","sab_xml_hordes_contenu_banque","sab_xml_hordes_puits","sab_xml_hordes_building","sab_xml_hordes_annuaire","sab_xml_hordes_historique","sab_metacoa_dernier_affichage","sab_reglages_*","sab_xml_hordes_*"],
	cache_serveur : ["sab_reglages_*","sab_xml_hordes_*"],
	set_domaine : function (domaine) {
		this.domaine = "sab_"+domaine+"_";
	},
	get : function (key) {
		if (key == 'api_key') {
			console.debug("Attention! clef API demandée en court terme!");
			var retour = unsafeWindow.localStorage[this.domaine+key];
			return (retour) ?  $sab.parseJSON(retour) : null;
		}
		var retour = unsafeWindow.sessionStorage[this.domaine+key];
		return (retour) ?  $sab.parseJSON(retour) : null;
	},
	get_long_term : function (key) {
		var retour = unsafeWindow.localStorage[this.domaine+key];
		return (retour) ?  $sab.parseJSON(retour) : null;
	},
	set : function (key,value) {
		// if (key == 'api_key')
			// return unsafeWindow.localStorage[this.domaine+key]=$sab.toJSON(value);
        return unsafeWindow.sessionStorage[this.domaine+key]=$sab.toJSON(value);
	},
	set_long_term : function (key,value) {
		var value_prepared = $sab.toJSON(value);
		if (value_prepared != unsafeWindow.localStorage[this.domaine+key]) {
			// console.log("set long term : ",this.domaine+key,value);
			unsafeWindow.localStorage[this.domaine+key]=value_prepared;
			if (this.domaine == "sab_reglages_" || this.domaine == "sab_xml_hordes_" || $sab.inArray(this.domaine+key,this.cache_serveur) >=0)
				unsafeWindow.sab_serveur.prepare_set(key,value_prepared,this.domaine);
		}
        return value_prepared;
	},
	set_raw : function(key,value) {
        return unsafeWindow.localStorage[this.domaine+key]=value;
	},
	get_raw : function (key) {
		var retour = unsafeWindow.localStorage[this.domaine+key];
		return retour || null;
	},
	get_serveur : function (key) {
		unsafeWindow.sab_serveur.get(this.domaine+key);
	},
	vider_session : function () {
		Object.keys(localStorage)
			.forEach(function(key){
				// if ($sab.inArray(key,unsafeWindow.sab_cache.cache_serveur)) {
				if (key.match(/^sab_/)) {
					localStorage.removeItem(key);
				}
			});
		Object.keys(sessionStorage)
			.forEach(function(key){
				// if ($sab.inArray(key,unsafeWindow.sab_cache.cache_serveur)) {
				if (key.match(/^sab_/)) {
					sessionStorage.removeItem(key);
				}
			});
	},
	sauvegarder_session : function (datas) {
		$sab.each(datas,function(clef,valeur) {
			localStorage[clef] = valeur;
			sessionStorage[clef] = valeur;
		})
	}
}

// serveur
unsafeWindow.sab_serveur = {
	datas : {
		// url_serveur : "http://guizmus.fr/",
		// url_serveur : "http://guizmus.fr/dev/",
		url_serveur : "http://guizmus.fr/v1_3_2_1/",
		url_fixe : "http://www.guizmus.fr/",
		callbacks : {},
		id_r : 0,
		est_identifie : false,
		uid : 0,
		sends_prepared : {}
	},
	executer : function (param) {
		this.datas.id_r ++;
		if (param.success)
			this.register_callback(this.datas.id_r,param.success);
		param.data.id_r = this.datas.id_r;
		param.data.m_a = unsafeWindow.sab_metacoa.datas.meta_actuelle;
		param.success = function (retour) {
			try {
				eval(retour);
			} catch (err) {
				alert("GHS : Erreur dans l'échange serveur !"+retour);
			}
			// eval(retour);
		}
		$sab.ajax(param);
	},
	register_callback : function (id,callback) {
		this.datas.callbacks[id] = callback;
	},
	callback_serveur : function (id_appel,datas) {
		return this.datas.callbacks[id_appel] ? (this.datas.callbacks[id_appel])(datas) : false;
	},
	send_xml : function () {
		if (unsafeWindow.sab_xml_hordes.est_autorise()) {
			unsafeWindow.sab_cache.set_domaine("reglages");
			var clef = unsafeWindow.sab_cache.get_long_term("api_key");
			this.executer({
				url : this.datas.url_serveur+"update_xml.php",
				type : 'POST',
				data : { k : clef },
				success : function (retour) {
					alert("Sauvegarde du XML "+(retour.success == 1 ? "réussie" : "échouée"));
				}
			});
		}
	},
	execution_identifee : function (param) {
		unsafeWindow.sab_cache.set_domaine("reglages");
		var clef_serveur = unsafeWindow.sab_cache.get("clef_serveur");
		this.datas.est_identifie = (clef_serveur != null);
		if (!this.datas.est_identifie) {
			if (unsafeWindow.sab_debug)
				this.datas.uid = unsafeWindow.sab_debug_id;
			if (!this.datas.uid) {
				var uid_actuel = __tid.infos.match(/realIdi([0-9]+)y/) || false;
				if (uid_actuel) {
					this.datas.username = $('.tid_userMenu>.tid_userInfos>div.tid_bigTitle').first().text().trim();
					this.datas.uid = uid_actuel[1];
				} else {
					unsafeWindow.clearTimeout(unsafeWindow.sab_timerAnalyse);
				}
			}
			if (this.datas.uid) {
				unsafeWindow.sab_cache.set_domaine("reglages");
				var clef = unsafeWindow.sab_cache.get_long_term("api_key");
				var datas = {uid : this.datas.uid};
				if (this.datas.username)
					datas.username = this.datas.username;
				if (clef)
					datas.k = clef;
				datas.version = unsafeWindow.sab_version.infos['num_'+(unsafeWindow.chrome ? "chrome" : "GM")];
				datas.browser = unsafeWindow.chrome ? "CH" : "GM";
				this.executer({
					url : this.datas.url_serveur+"connexion.php",
					type : 'POST',
					data : datas,
					success : function (retour) {
						// console.log("retour authentification : ",retour);
						unsafeWindow.sab_serveur.finaliser_authentification(retour);
						if (!param.data) param.data = {};
						param.data.clef_auth = retour.clef_auth;
						param.data.m_a = unsafeWindow.sab_metacoa.datas.meta_actuelle;
						return unsafeWindow.sab_serveur.executer(param);
					}
				});
			}
		} else {
			if (!param.data) param.data = {};
			param.data.clef_auth = clef_serveur;
			param.data.m_a = unsafeWindow.sab_metacoa.datas.meta_actuelle;
			return unsafeWindow.sab_serveur.executer(param);
		}
	},
	finaliser_authentification : function (datas) {
		this.datas.est_identifie = true;
		unsafeWindow.sab_cache.set_domaine("reglages");
		unsafeWindow.sab_cache.set("clef_serveur",datas.clef_auth);
		var num_meta = 0;
		var metas = new Array();
		while(typeof(datas["meta_"+num_meta]) != "undefined") {
			metas[num_meta] = datas["meta_"+num_meta];
			num_meta ++;
		}
		unsafeWindow.sab_metacoa.datas.metas = metas;
		unsafeWindow.sab_metacoa.datas.meta_actuelle = false; // utile?
		unsafeWindow.sab_cache.set_domaine("metacoa");
		unsafeWindow.sab_cache.set("datas",metas);
	},
	set : function (champ, valeur) {
		this.execution_identifee({
			url : this.datas.url_serveur+"update.php",
			type : 'POST',
			data : {
				champ : champ,
				valeur : valeur
			},
			success : function (retour) {
				// console.log(retour);
			}
		});
	},
	sets : function (valeurs) {
		this.execution_identifee({
			url : this.datas.url_serveur+"update.php",
			type : 'POST',
			data : {
				valeurs : valeurs
			},
			success : function (retour) {
				// console.log(retour);
			}
		});
	},
	get  : function (champ) {
		this.execution_identifee({
			url : this.datas.url_serveur+"update.php",
			type : 'POST',
			data : {
				champ : champ
			},
			success : function (retour) {
				// console.log(retour);
			}
		});
	},
	gets : function (champs) {
		this.execution_identifee({
			url : this.datas.url_serveur+"update.php",
			type : 'POST',
			data : {
				champs : champs
			},
			success : function (retour) {
				// console.log(retour);
			}
		});
	},
	prepare_set : function (key,value,domaine) {
		// console.log("prepare set : ",domaine+key," : ",value);
		// if (!unsafeWindow.sab_debug) {
		unsafeWindow.sab_cache.set_domaine("serveur");
		var sends = unsafeWindow.sab_cache.get_long_term("sends_prepared") || {};
		sends[domaine+key] = value;
		unsafeWindow.sab_cache.set_long_term("sends_prepared",sends);
		// }
	},
	send_set : function () {
		unsafeWindow.sab_cache.set_domaine("serveur");
		var sends = unsafeWindow.sab_cache.get_long_term("sends_prepared");
		var valeurs = new Array();
		if (sends) {
			$sab.each(sends,function(x,y) {
				// valeurs.push({champ : x,valeur: $sab.parseJSON(y)});
				valeurs.push({champ : x,valeur: y});
			});
			if (valeurs.length > 0) {
				unsafeWindow.sab_cache.set_long_term("sends_prepared",null);
				unsafeWindow.sab_serveur.sets(valeurs)
			}
		}
		unsafeWindow.clearTimeout(unsafeWindow.sab_timerServeur);
		// unsafeWindow.sab_timerServeur = unsafeWindow.setTimeout(unsafeWindow.sab_serveur.send_set,((valeurs.length == 1) && (valeurs[0].champ == "sab_metacoa_dernier_affichage")) ? 15000 : 5000);
		unsafeWindow.sab_timerServeur = unsafeWindow.setTimeout(unsafeWindow.sab_serveur.send_set,((valeurs.length == 1)) ? 15000 : 5000);
	},
	load_session : function (f) {
		console.log("Guizmus'Hordes Script : chargement de vos données...");
		unsafeWindow.sab_cache.vider_session();
		return {
			url : this.datas.url_serveur+"update.php",
			type : 'POST',
			data : {
				champs : unsafeWindow.sab_cache.cache_serveur
			},
			success : function (retour) {
			

				unsafeWindow.sab_serveur.datas.loading_a_faire = false;
				unsafeWindow.sab_cache.set_domaine("reglages");
				var time_now = (new Date()).getTime();
				unsafeWindow.sab_cache.set("last_loading",time_now);
				var sk_actuel = window.location.href.match(/\?sk=([0-9a-z]+)/);
				sk_actuel = sk_actuel ? sk_actuel[1] : false;
				if(typeof(sk_actuel)!="undefined") {
					unsafeWindow.sab_cache.set("sk_loaded",sk_actuel);
					unsafeWindow.sab_cache.sauvegarder_session(retour);
					var reglages = unsafeWindow.sab_options.charger_reglages();
					if (reglages.meta_actif) 
						unsafeWindow.sab_metacoa.lister_jumps()
				};
				f();
				// console.log("retour LoadSession ! ",retour);
			}
		};
	}
}

// gestions des options et de leur synchronisation
unsafeWindow.sab_options = {
	charger_reglages : function () {
		unsafeWindow.sab_cache.set_domaine("reglages");
		return {
			api_key : unsafeWindow.sab_cache.get_long_term('api_key'),
			log_alertes : unsafeWindow.sab_cache.get_long_term('log_alertes_actif'),
			mwl_actif : unsafeWindow.sab_cache.get_long_term('MWL_actif'),
			format_note : unsafeWindow.sab_cache.get_long_term('format_note'),
			seuil_mwl : unsafeWindow.sab_cache.get_long_term('seuil_mwl') ? unsafeWindow.sab_cache.get_long_term('seuil_mwl') : 0,
			affichage_outside : unsafeWindow.sab_cache.get_long_term('affichage_outside'),
			ressources_affichees : unsafeWindow.sab_cache.get_long_term('ressources_affichees'),
			meta_actif : unsafeWindow.sab_cache.get_long_term('meta_actif') ? false : true,
			meta_notif : unsafeWindow.sab_cache.get_long_term('meta_notif'),
			meta_smileys : unsafeWindow.sab_cache.get_long_term('meta_smileys'),
			v_light : unsafeWindow.sab_cache.get_long_term('v_light') == 1,
		};
	},
	creer_options : function () {
		if (($sab("#sab_allow_api").length == 0) && ($sab(".options").length > 0)) {
			var sab_menu = $sab("<form onsubmit='sab_options.sauvegarder_options(); return false;' class='form' id='sab_options'></form>");
			unsafeWindow.sab_cache.set_domaine("reglages");
			var reglages = this.charger_reglages();
			reglages.autorisation_globale = $sab("#allowExtern").prop("checked") == true;
			if (!reglages.api_key) sab_menu.css({"display" : "none"});
			
			var categorie_generale = this.creer_categorie("Wifi-embarqué",{});
			
			// option des alertes logs
			categorie_generale.append(unsafeWindow.sab_options.creer_ligne_option({
				name : "sab_affichage_chantiers",
				type : "checkbox",
				checked : reglages.ressources_affichees ? true  : false,
				label : "Deviner les chantiers",
				onclick : "sab_options.maj_option_check('ressources_affichees',this);",
				aide : "Affiche les PAs totaux des chantiers commencés (30/50PA), ainsi que les ressources des chantiers actuellement bloqués.",
				attr_row : {"style" : 'display:inline-block'},
				autorisation_globale : reglages.autorisation_globale
			}));
			categorie_generale.append(unsafeWindow.sab_options.creer_ligne_option({
				name : "sab_affichage_outside",
				type : "checkbox",
				checked : reglages.affichage_outside ? true  : false,
				label : "Activer le Wifi",
				onclick : "sab_options.maj_option_check('affichage_outside',this);",
				aide : "Permet de suivre l'activité en ville depuis le désert. Ajoute des onglets :<br/><b>Attaque/Défense</b><br/><img src='http://guizmus.fr/captures/Aide_attaque_outside.PNG' width='420px'/><br/><b>Banque</b><br/><img src='http://guizmus.fr/captures/Aide_banque_outside.PNG' width='420px'/><br/><b>Annuaire</b><br/><img src='http://guizmus.fr/captures/Aide_annuaire_outside.PNG' width='420px'/>",
				aide_width : 420,
				attr_row : {"style" : 'display:inline-block'},
				autorisation_globale : reglages.autorisation_globale
			}));
			categorie_generale.append(unsafeWindow.sab_options.creer_ligne_option({
				name : "sab_log_alerte",
				type : "checkbox",
				checked : (reglages.log_alertes && !reglages.v_light) ? true  : false,
				disabled : reglages.v_light , // c'est ici ;)
				label : "Activer les notifications",
				onclick : "sab_options.maj_option_check('log_alertes_actif',this);",
				aide : "Crée une notification quand quelque chose se passe en ville.<br/>Ne se déclenche que si vous êtes actif sur le jeu (changer d'écran en ville, ramasser un objet, ...)<br/><img src='http://guizmus.fr/captures/Aide_log.PNG'/>",
				aide_width : 420,
				attr_row : {"style" : 'display:inline-block'},
				autorisation_globale : reglages.autorisation_globale
			}));
			
			var categorie_debug = this.creer_categorie("Débug",{}).append(unsafeWindow.sab_options.creer_ligne_option({
				name : "sab_send_xml",
				type : "button",
				label : "Envoyer le XML",
				label_button : "DEBUG",
				autorisation_globale : reglages.autorisation_globale,
				onclick : "sab_serveur.send_xml();",
				attr_row : {"style" : 'display:inline-block'}
			}));
			
			var categorie_meta = this.creer_categorie("MétaCoa",{});
			categorie_meta.append(unsafeWindow.sab_options.creer_ligne_option({
				name : "sab_meta_actif",
				type : "checkbox",
				checked : reglages.meta_actif ? true  : false,
				label : "Activer le module",
				onclick : "sab_options.maj_option_check('meta_actif',this);",
				aide : "Active le module Métacoalition.<br/>Dans votre âme, allez dans le nouvel onglet MétaCoa pour candidater à une MétaCoa, ou même créer la votre !",
				attr_row : {"style" : 'display:inline-block'},
				autorisation_globale : reglages.autorisation_globale
			}));
			categorie_meta.append(unsafeWindow.sab_options.creer_ligne_option({
				name : "sab_meta_notif",
				type : "checkbox",
				checked : reglages.meta_notif ? true  : false,
				label : "Afficher les notifs",
				onclick : "sab_options.maj_option_check('meta_notif',this);",
				aide : "Affiche une icone <img src='/gfx/design/anim_icon_mail.gif' title='Nouveaux messages !' class='sab_img_nv_msg'/> quand votre MétaCoa discute, de la même manière que pour votre coalition classique",
				attr_row : {"style" : 'display:inline-block'},
				autorisation_globale : reglages.autorisation_globale
			}));
			// categorie_meta.append(unsafeWindow.sab_options.creer_ligne_option({
				// name : "sab_meta_smileys",
				// type : "checkbox",
				// checked : reglages.meta_smileys,
				// label : "[?]Afficher les smileys",
				// onclick : "sab_options.maj_option_check('meta_smileys',this);",
				// aide : "Fonctionnalité peut être à venir. Cochez si vous voulez que je l'ajoute !",
				// attr_row : {"style" : 'display:inline-block'},
				// autorisation_globale : reglages.autorisation_globale
			// }));
			
			var categorie_mwl = this.creer_categorie("Divination",{});
			
			categorie_mwl.append(unsafeWindow.sab_options.creer_ligne_option({
				name : "sab_mwl_actif",
				type : "checkbox",
				checked : reglages.mwl_actif ? true  : false,
				label : "Activer le module",
				onclick : "sab_options.maj_option_check('MWL_actif',this);",
				aide : "Active l'affichage des recommandations et plaintes MWL.<br/><img src='http://guizmus.fr/captures/Aide_evaluation_MWL.PNG'/>",
				aide_width : 565,
				attr_row : {"style" : 'display:inline-block'},
				autorisation_globale : reglages.autorisation_globale
			}));
			
			categorie_mwl.append(unsafeWindow.sab_options.creer_ligne_option({
				name : "sab_mwl_format_note",
				type : "button",
				label : "Format d'affichage",
				label_values :  { on : "Evaluation", off : "MWL" },
				label_state : reglages.format_note ? "on" : "off",
				autorisation_globale : reglages.autorisation_globale,
				aide : "<b>Permet de choisir le format d'affichage de la note.</b><br/>Evaluation : note allant de 0 à 10, mise plus ou moins en valeur en fonction des plaintes et recommandations de l'utilisateur<br/>MWL : affichage du nombre de plaintes et recommandations directement",
				onclick : 'sab_options.button_change({ on : "Evaluation", off : "MWL" },this,"format_note");',
				attr_row : {"style" : 'display:inline-block'}
			}));
			
			categorie_mwl.append(unsafeWindow.sab_options.creer_ligne_option({
				name : "sab_mwl_seuil_mwl",
				type : "input",
				label : "Seuil d'affichage",
				value : reglages.seuil_mwl,
				autorisation_globale : reglages.autorisation_globale,
				aide : "Permet de choisir le minimum d'évaluations nécessaires pour que les recommandations d'un joueur apparaissent.<br/>Si la valeur est à 5 par exemple, le module ne s'activera que pour les personnes ayant 5 recommandations et/ou plaintes ou plus.",
				onchange : 'sab_options.save_change_input(this,"seuil_mwl")',
				attr_row : {"style" : 'display:inline-block'}
			}));
			
			
			$sab(".options").append($("<h2>").append(unsafeWindow.sab_options.creer_ligne_option({
				name : "sab_allow_api",
				type : "checkbox",
				checked : reglages.api_key,
				label : "Activer Guizmus'script<b>+</b>",
				autorisation_globale : reglages.autorisation_globale,
				onclick : "sab_xml_hordes.maj_key();"
			})));
			sab_menu.append(categorie_generale);
			sab_menu.append(categorie_mwl);
			sab_menu.append(categorie_meta);
			sab_menu.append(categorie_debug);
			$sab(".options").append(sab_menu);
		}
	},
	creer_ligne_option : function (param) {
		var option = $sab("<div class='row'></div>");
		if (param.attr_row)
			option.attr(param.attr_row);
		option.append($sab("<label>").html(param.label));
		var input = $sab("<"+(param.type == "button" ? "a" : "input")+">")
			.attr({
				"name" : param.name,
				"id" : param.name,
				"onclick" : param.onclick
			});
		if (param.type == 'checkbox') {
			input.attr({
				"prop" : param.checked ? 1 : 0,
				"type" : param.type,
			})
			if (!param.autorisation_globale || param.disabled)
				input.prop("disabled","disabled");
			if (param.checked)
				input.prop("checked","checked");
		}
		if (param.type == 'button') {
			input.addClass('inlineButton');
			param.label_button = ( param.label_button ? param.label_button : (param.label_state ? param.label_values[param.label_state] : "Go"));
			input.html(param.label_button || "Go");
			if (param.aide)
				input.attr({
					"onmouseout" : "js.HordeTip.hide(event)",
					"onmouseover" : "js.HordeTip.showHelp(this,\"<p>"+(param.disabled ? "<i>Désactivé en attente de validation</i><br/>" :"")+param.aide+"</p>\");"+(param.aide_width ? "$('#tooltip').css({'width':'"+param.aide_width+"px'});" : "")
				})
		}
		if (param.type == 'input') {
			input.attr({
				"type" : "text",
				"onchange" : param.onchange
			}).addClass("field").css({
				"width" : "90px"
			});
			input.prop("value",param.value);
			if (param.aide)
				input.attr({
					"onmouseout" : "js.HordeTip.hide(event)",
					"onmouseover" : "js.HordeTip.showHelp(this,\"<p>"+(param.disabled ? "<i>Désactivé en attente de validation</i><br/>" :"")+param.aide+"</p>\");"+(param.aide_width ? "$('#tooltip').css({'width':'"+param.aide_width+"px'});" : "")
				})
		}
		option.append(input);
		if (param.aide && (param.type == "checkbox")) {
			var aide_contextuelle = $sab("<a>")
				.attr({
					"href" : "#",
					"onclick" : "return false;",
					"onmouseout" : "js.HordeTip.hide(event)",
					"onmouseover" : "js.HordeTip.showHelp(this,\"<p>"+(param.disabled ? "<i>Désactivé en attente de validation</i><br/>" :"")+param.aide+"</p>\");"+(param.aide_width ? "$('#tooltip').css({'width':'"+param.aide_width+"px'});" : "")
				})
				.addClass("helpLink")
				.append("<img src='/gfx/loc/fr/helpLink.gif' alt=''/>");
			option.append(aide_contextuelle);
		}
		return option;
	},
	sauvegarder_options : function () {
		unsafeWindow.sab_serveur.send_set();
	},
	creer_categorie : function (name,css) {
		return $sab("<div>")
			.css({
				"width" : "45%",
				"display" : "inline-block",
				"margin" : "2px 1%",
				"vertical-align" : "top",
			})
			.css(css)
			.addClass("critical")
			.append($sab("<h2>"+name+"</h2>").css({
					// "margin-top" : "0 !important"
					"margin-top" : "0"
				})
			);
	},
	maj_option_check : function(option_name,element) {
		unsafeWindow.sab_cache.set_domaine("reglages");
		unsafeWindow.sab_cache.set_long_term(option_name,($sab(element).attr("checked") === "checked") ? true : null);
	},
	button_change : function (options,element,option_name) {
		var value = element.innerHTML == options.on;
		unsafeWindow.sab_cache.set_domaine("reglages");
		if (value) {
			element.innerHTML = options.off;
			unsafeWindow.sab_cache.set_long_term(option_name,null);
		} else {
			element.innerHTML = options.on;
			unsafeWindow.sab_cache.set_long_term(option_name,true);
		}
	},
	save_change_input : function (element,option_name) {
		var value = element.value;
		unsafeWindow.sab_cache.set_domaine("reglages");
		unsafeWindow.sab_cache.set_long_term(option_name,value);
	}
}

// recherches et affichages de plaintes MWL.
// cache présent sur les analyses simples (sans le détail des plaintes)
// todo : faire une liste des raisons de plaintes pour corriger l'encodage
unsafeWindow.sab_MWL = {
	init: function(){
		this.noms_a_analyser = Array();
		this.callback = function () {};
	},
	ajouter_nom : function (nom) { this.noms_a_analyser.push(escape(nom)); },
    query : function (type) {
        if (this.noms_a_analyser.length > 0) {
			if (type=="detail") {
				var callback = this.callback;
				$sab.each(this.noms_a_analyser,function(x,c) {
					$sab.ajax({
						type: 'GET',
						url : "http://hordes.my-css-lab.com/stats.php?user="+c,
						success : callback,
                        contentType : "text/plain;charset=UTF-8",
						ext : 'html',
						format : 'json'
					});
				});
			} else {
				// console.log("lancement requete crossdomain pour "+this.noms_a_analyser.join(","));
				$sab.ajax({
					type: 'GET',
					url : "http://hordes.my-css-lab.com/xml.php?name="+this.noms_a_analyser.join(","),
					success : this.callback,
					ext : 'xml'
				});
			}
        }
    },
	display_rating : function (nom) {
		unsafeWindow.sab_cache.set_domaine("tida");
		var datas = unsafeWindow.sab_cache.get(nom) || {};
		var reglages = unsafeWindow.sab_options.charger_reglages();
		datas.recomms = datas.recomms ? parseInt(datas.recomms) : 0;
		datas.plaintes = datas.plaintes ? parseInt(datas.plaintes) : 0;
		if (reglages.seuil_mwl <= datas.plaintes + datas.recomms) {
			if (reglages.format_note) {
				var note = (datas.plaintes+datas.recomms >= reglages.seuil_mwl) ? ((datas.recomms - datas.plaintes)/(datas.recomms + datas.plaintes) +1) *5 : false;
				
				if (note) {
					note=Math.round(note*10)/10;
					var importance_note = (datas.recomms + datas.plaintes) > 15;
					var color_note = (note > 7) ? "#CEF6CE" : (note < 3 ? "#F6CECE" : false);
					color_note = (color_note && importance_note) ? "color:"+color_note+";" : "";
					var rating = $sab("<span onclick='sab_MWL.detail_plaintes(\""+nom+"\")' onmouseout='js.HordeTip.hide(event)' onmouseover='js.HordeTip.showHelp(this,\"Cliquez pour avoir le détail des plaintes<br/>"+( datas.recomms > 0 ? "<br/>"+datas.recomms+"<img src=&apos;/gfx/forum/smiley/h_"+(datas.recomms>=10 ? "lol" : "wink")+".gif&apos;/>" : "")+(datas.plaintes==0?"":"<br/>"+datas.plaintes+"<img src=&apos;/gfx/icons/item_soul_"+(datas.plaintes>=10 ? "red" : "blue")+".gif&apos;/> ")+"\");' style='position:relative;display:inline-block;text-align:center;border:1px outset #4E5162;border-radius:3px;background-color:#4E5162 !important;min-width:10px;margin-left:5px;"+color_note+"font-weight:"+(importance_note ? "bold" : "lighter")+" !important' class='sab_rating'>"+note+"</span>");
				}
			} else {
				var rating = $sab("<span style='position:relative' class='sab_rating'>"+(datas.plaintes==""?"":datas.plaintes+"<img onmouseout='js.HordeTip.hide(event)' onmouseover='js.HordeTip.showHelp(this,\"Cliquez pour avoir le détail des plaintes\");' src='http://data.hordes.fr/gfx/icons/item_soul_"+(datas.plaintes>=10 ? "red" : "blue")+".gif' alt='plaintes' style='cursor:pointer' onclick='sab_MWL.detail_plaintes(\""+nom+"\")' title='plaintes'/> ")+( datas.recomms > 0 ? datas.recomms+"<img src='/gfx/forum/smiley/h_"+(datas.recomms>=10 ? "lol" : "wink")+".gif'/>" : "")+"</span>");
			}
		}
		$sab.each($sab("a.sab_tid_analysed"),function(x,a) {
			var sanitize = $sab(a).contents().first().text().trim().toLowerCase();
			if ((sanitize == datas.name) && ($sab(".sab_rating",$sab(a).parent()).length == 0))
				$sab(a).after(rating);
		});
	},
	sanitize_name : function (name) {
		var sanitize = $sab(name).contents().first().text().trim().toLowerCase();
		return sanitize;
	},
	analyser_tid : function () {
		// unsafeWindow.sab_cache.set_domaine("tida");
		this.noms_a_analyser = Array();
		$sab.each($sab("a.tid_user:not(.sab_tid_analysed), a.sab_tid_todo"),function (x,a) {
			$sab(a).addClass("sab_tid_analysed").removeClass("sab_tid_todo");
			var nom = unsafeWindow.sab_MWL.sanitize_name(a);
			unsafeWindow.sab_cache.set_domaine("tida");
			if (unsafeWindow.sab_cache.get(nom))
				unsafeWindow.sab_MWL.display_rating(nom);
			else
				unsafeWindow.sab_MWL.ajouter_nom(nom);
		});
		this.callback = function (res) {
			var citizens = $sab.xml2json($sab.parseXML(res.responseText));
			citizens = citizens.citizen ? (citizens.citizen.length > 0 ? citizens.citizen : citizens ) : Array();
			$sab.each(citizens,function(x,c){
				unsafeWindow.sab_cache.set_domaine("tida");
				unsafeWindow.sab_cache.set(c.name,{name : c.name, plaintes : c.plaintes, recomms : c.recomms});
				unsafeWindow.sab_MWL.display_rating(c.name);
			});
		};
		this.query("");
	},
	analyse_a_effectuer : false,
	analyser_ville : function () {
		if (!this.analyse_a_effectuer) return false;
		
		if ($sab(".maps .table ul").length  == 0) {
			window.setTimeout(this.analyser_ville, 200);
			return false;
		}
		
		this.analyse_a_effectuer = false;
		$sab(".maps .table ul:not(.sab_analysed) li a").addClass("sab_tid_todo");
		$sab(".maps .table ul:not(.sab_analysed)").addClass("sab_analysed");
		unsafeWindow.sab_MWL.analyser_tid();
		
		var div_texte_coa = $sab("a[href^='#ghost/team']");
		if (div_texte_coa.length == 0) {
			// l'utilisateur ne fait pas partie d'une coa
			var in_coa = false;
			var disponible = false;
		} else {
			var in_coa = true;
			var disponible = div_texte_coa.parent().hasClass("help");
		}
		// $sab(".maps .table tr:has(a[href*='joinMap'])")
		// #ghost/joinMap?mid=328729;
		
		return false;
	},
	lanch_analyse_ville : function () {
		this.analyse_a_effectuer = true;
		this.analyser_ville();
	},
	detail_plaintes : function (nom) {
		js.HordeTip.showHelp(this,"Détail des plaintes de <strong>"+nom+"</strong><br/><img src=\"http://twinoid.com/img/loading.gif\">");
		var MWL = unsafeWindow.sab_MWL;
		MWL.init();
		MWL.ajouter_nom(nom);
		MWL.callback = function (res) {
			res = res.responseText.body.table.tr;
			var contenu = "<table>";
			for (var i=1; i< res.length;i++)
				contenu += "<tr><td>"+res[i].td[0].p+"</td><td>"+res[i].td[1].p+"</td></tr>";
			contenu += "</table>";
			js.HordeTip.showHelp(this,"Détail des plaintes de <strong>"+res[0].td[0].p+"</strong><br/>"+contenu);
		};
		MWL.query("detail");
	}
};

// gestion du chargement et cache du XML. gere aussi la clef api.
unsafeWindow.sab_xml_hordes = {
	api_key : null,
	est_autorise : function () { // retour l'autorisation ou non d'utiliser le XML (changeable dans les options de l'ame)
		unsafeWindow.sab_cache.set_domaine("reglages");
		this.api_key = unsafeWindow.sab_cache.get_long_term('api_key');
		return (typeof(this.api_key) == "string")
	},
	est_a_jour : function () {
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var maj = unsafeWindow.sab_cache.get_long_term("maj");
		if (maj == null) return false;
		// unsafeWindow.sab_cache.set_domaine("xml_hordes");
		// if (unsafeWindow.sab_cache.get("annuaire") == null) return false;
		// return ((new Date()).getTime() < maj);
		return ((new Date()).getTime() < (new Date(maj)).getTime());
	},
	maj_key : function () {
		if ($sab("#sab_allow_api").length == 1)
			if ($sab("#sab_allow_api").attr("checked") === "checked") {
				// $sab("#sab_log_alerte").parent().css({"display":""});
				$sab("#sab_options").css({"display":""});
				this.api_key = $sab("div.key input.field[name='ek']").attr("value");
				unsafeWindow.sab_cache.set_domaine("reglages");
				unsafeWindow.sab_cache.set_long_term("api_key",this.api_key);
			} else {
				// $sab("#sab_log_alerte").parent().css({"display":"none"});
				$sab("#sab_options").css({"display":"none"});
				this.api_key = null;
				unsafeWindow.sab_cache.set_domaine("reglages");
				unsafeWindow.sab_cache.set_long_term("api_key",null);
			}
	},
	maj_alertes : function () {
		if ($sab("#sab_log_alerte").length == 1)
			if ($sab("#sab_log_alerte").prop("checked")) {
				unsafeWindow.sab_cache.set_domaine("reglages");
				unsafeWindow.sab_cache.set_long_term("log_alertes",(new Date()).getTime());
			} else {
				unsafeWindow.sab_cache.set_domaine("reglages");
				unsafeWindow.sab_cache.set_long_term("log_alertes",null);
			}
	},
	charger_XML : function (callback) {
		var time_now = (new Date()).getTime();
		var date_maj = (new Date(time_now + (unsafeWindow.sab_debug ? 0 : (5 * 60 * 1000)))).getTime();
		// var date_maj = (new Date(time_now)).getTime();
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		unsafeWindow.sab_cache.set_long_term("maj",date_maj);
		var url_temp = unsafeWindow.sab_debug ? unsafeWindow.sab_serveur.datas.url_fixe+"save_xml/"+unsafeWindow.sab_debug_xml+".xml" : "xml?k="+unsafeWindow.sab_xml_hordes.api_key;
		// var url_temp = unsafeWindow.sab_serveur.datas.url_fixe+"v1_3_2_1/save_xml/debug.php";
		$sab.ajax({
			url : url_temp,
			ext : 'xml',
			type : "GET",
			success : function (res) {
				// console.log("XML hordes actualisé.");
				res = (typeof(res.responseText) == 'undefined') ? res : res.responseText;
				
				// sauvegarde des généralités
				var datas = $sab.xml2json(res);
				if (datas.error && (datas.error.code == "not_in_game")) {
					unsafeWindow.sab_cache.set_domaine("xml_hordes");
					unsafeWindow.sab_cache.set("coord_ville",null);
					unsafeWindow.sab_cache.set("puits",null);
					unsafeWindow.sab_cache.set("upgrades",null);
					unsafeWindow.sab_cache.set("annuaire",null);
					unsafeWindow.sab_cache.set("buildings",null);
					unsafeWindow.sab_cache.set("attaque",null);
					unsafeWindow.sab_cache.set("contenu_banque",null);
					unsafeWindow.sab_cache.set_long_term("coord_ville",null);
					unsafeWindow.sab_cache.set_long_term("puits",null);
					unsafeWindow.sab_cache.set_long_term("upgrades",null);
					unsafeWindow.sab_cache.set_long_term("annuaire",null);
					unsafeWindow.sab_cache.set_long_term("buildings",null);
					unsafeWindow.sab_cache.set_long_term("attaque",null);
					unsafeWindow.sab_cache.set_long_term("contenu_banque",null);
					if (typeof(callback) != "undefined")
						return callback();
					return false;
				}
				unsafeWindow.sab_cache.set_domaine("xml_hordes");
				unsafeWindow.sab_cache.set("iconurl",datas.headers.iconurl,date_maj);
				unsafeWindow.sab_cache.set_long_term("iconurl",datas.headers.iconurl,date_maj);
				unsafeWindow.sab_cache.set("coord_ville","x:"+datas.data.city.x+",y:"+datas.data.city.y);
				unsafeWindow.sab_cache.set_long_term("coord_ville","x:"+datas.data.city.x+",y:"+datas.data.city.y);
				unsafeWindow.sab_cache.set("puits",datas.data.city.water);
				unsafeWindow.sab_cache.set_long_term("puits",datas.data.city.water);
				
				// sauvegarde de la banque
				var items = new Array();
				$sab.each(datas.data.bank.item, function (x,item) {
					items.push(item.id+":"+item.count+(item.broken == 1 ? ":b":""));
				});
				unsafeWindow.sab_cache.set("contenu_banque",items.join(";"));
				
				// sauvegarde des upgrades
				var ups = {};
				var ups_each = datas.data.upgrades ? datas.data.upgrades.up : null;
				if ((typeof(ups_each) != 'undefined') && (ups_each != null)) {
					if(typeof(ups_each.level) != 'undefined')
						ups_each = [ups_each];
					$sab.each(ups_each,function(x,up) {
						ups[up.name] = {
							name : up.name,
							level : up.level,
							building : up.buildingID
						}
					});
				}
				// unsafeWindow.sab_cache.set_long_term("upgrades",ups);
				unsafeWindow.sab_cache.set("upgrades",ups);
				
				
				// sauvegarde de l'anuaire
				var citizens = new Array();
				var citizens_each = datas.data.citizens.citizen;
				if (typeof(citizens_each.out) != 'undefined')
					citizens_each = [citizens_each];
				$sab.each(citizens_each,function (x,citizen) {
					citizens.push({
						id:citizen.id,
						job:citizen.job,
						name:citizen.name,
						out:citizen.out,
						x:typeof(citizen.x) == "undefined" ? null : citizen.x,
						y:typeof(citizen.y) == "undefined" ? null : citizen.y,
						ban:citizen.ban,
						def:citizen.baseDef,
						annonce:citizen.toString() == "[object Object]" ? "" :  citizen.toString()
					});
				});
				unsafeWindow.sab_cache.set("annuaire",citizens);
				
				// sauvegarde des chantiers
				var buildings = new Array();
				var buildings_each = datas.data.city.building;
				if (typeof(buildings_each) != 'undefined') {
					if (typeof(buildings_each.name) != 'undefined')
						buildings_each = [buildings_each];
					$sab.each(buildings_each,function (x,building) {
						buildings.push({
							id:building.id,
							name:building.name
						});
					});
				}
				unsafeWindow.sab_cache.set("buildings",buildings);
				
				// sauvegarde de l'attaque
				var attaque = {
					mini : datas.data.estimations ? datas.data.estimations.e.min : null,
					maxi : datas.data.estimations ? datas.data.estimations.e.max : null,
					opti : datas.data.estimations ? datas.data.estimations.e.maxed : null,
					total_def : datas.data.city.defense ?  datas.data.city.defense.total : 0,
					def_buildings : datas.data.city.defense ? datas.data.city.defense.buildings : 0,
					def_citoyen : datas.data.city.defense ? datas.data.city.defense.citizen_homes : 0,
					def_od : datas.data.city.defense ? datas.data.city.defense.itemsMul * datas.data.city.defense.items : 0,
					citoyens : citizens.length,
				};
				unsafeWindow.sab_cache.set("attaque",attaque);
				
				unsafeWindow.sab_xml_hordes.comparer_nouveau_xml();
				// if (unsafeWindow.sab_logs.alertes_actives())
					// unsafeWindow.sab_logs.afficher_alertes();
				if (typeof(callback) != "undefined")
					callback();
			}
		});
	},
	comparer_nouveau_xml : function () {
		var date =  (new Date()).getTime();
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var historique = unsafeWindow.sab_cache.get_long_term("historique");
		if (historique == null) historique = new Array();
		
		if (historique.length == 0)
			historique.push({date:date,com:"Initialisation du module"});
		
		// comparaison de la banque
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var nv_banque = unsafeWindow.sab_cache.get("contenu_banque");
		var an_banque = unsafeWindow.sab_cache.get_long_term("contenu_banque");
		unsafeWindow.sab_cache.set_long_term("contenu_banque",nv_banque);
		if (an_banque != null) {
			var temp_items = nv_banque.split(";");
			nv_banque = new Array();
			$sab.each(temp_items,function(x,item) {
				var details_items = item.split(":");
				nv_banque[details_items[0]] = details_items[1];
			})
			var temp_items = an_banque.split(";");
			an_banque = new Array();
			$sab.each(temp_items,function(x,item) {
				var details_items = item.split(":");
				an_banque[details_items[0]] = details_items[1];
			})
			
			var item = null;
			$sab.each(nv_banque,function(id,count) {
				if (typeof(an_banque[id]) == "undefined") {
					if (parseInt(count) > 0)
						historique.push({date:date,com:count,item:id});
				} else {
					if (typeof(an_banque[id]) == "undefined")
						an_banque[id] = 0;
					if (typeof(count) == "undefined")
						count = 0;
					if (parseInt(count)-parseInt(an_banque[id]) != 0)
						historique.push({date:date,com:parseInt(count)-parseInt(an_banque[id]),item:id});
				}
			});
		}
		
		// comparaison du puits
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var an_eau = unsafeWindow.sab_cache.get_long_term("puits");
		var nv_eau = unsafeWindow.sab_cache.get("puits");
		unsafeWindow.sab_cache.set_long_term("puits",nv_eau);
		if ((an_eau != null)  && (nv_eau != an_eau)) {
			var dif_eau = parseInt(nv_eau) - parseInt(an_eau);
			historique.push({date:date,puits:dif_eau});
		}
		
		//comparaison des buildings
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var nv_building = unsafeWindow.sab_cache.get("buildings");
		var an_building = unsafeWindow.sab_cache.get_long_term("buildings");
		unsafeWindow.sab_cache.set_long_term("buildings",nv_building);
		if (an_building != null) {
			var nv_buildings = new Array();
			$sab.each(nv_building,function(x,building) {
				nv_buildings.push(building.id);
			});
			$sab.each(an_building,function(x,building) {
				if($sab.inArray(building.id,nv_buildings) < 0)
					historique.push({date:date,building:building.id,com:"Destruction"});
			});
			
			var an_buildings = new Array();
			$sab.each(an_building,function(x,building) {
				an_buildings.push(building.id);
			});
			$sab.each(nv_building,function(x,building) {
				if($sab.inArray(building.id,an_buildings) < 0)
					historique.push({date:date,building:building.id,com:"Construction"});
			});
		}
		
		// comparaison des défenses
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var nv_attaque = unsafeWindow.sab_cache.get("attaque");
		var an_attaque = unsafeWindow.sab_cache.get_long_term("attaque");
		unsafeWindow.sab_cache.set_long_term("attaque",nv_attaque);
		if (an_attaque != null) {
			if ((an_attaque.mini != nv_attaque.mini) || (an_attaque.mini != nv_attaque.mini))
				historique.push({date:date,com:"Nouvelle estimation de l'attaque : "+nv_attaque.mini+"-"+nv_attaque.maxi+(nv_attaque.opti == 1 ? " (meilleure estimation)" : "")});
			if (an_attaque.def_citoyen != nv_attaque.def_citoyen) {
				var def = parseInt(nv_attaque.def_citoyen - an_attaque.def_citoyen);
				historique.push({date:date,com:"Maisons : "+(def > 0 ? "+":"")+def+" (soit "+nv_attaque.def_citoyen+")",def:1});
			}
			if (an_attaque.def_buildings != nv_attaque.def_buildings) {
				var def = parseInt(nv_attaque.def_buildings - an_attaque.def_buildings);
				historique.push({date:date,com:"Chantiers : "+(def > 0 ? "+":"")+def+" (soit "+nv_attaque.def_buildings+")",def:1});
			}
			if (an_attaque.def_od != nv_attaque.def_od) {
				var def = parseInt(nv_attaque.def_od - an_attaque.def_od);
				historique.push({date:date,com:"ODs : "+(def > 0 ? "+":"")+def+" (soit "+nv_attaque.def_od+")",def:1});
			}
			if (an_attaque.total_def != nv_attaque.total_def) {
				var def = parseInt(nv_attaque.total_def - an_attaque.total_def);
				historique.push({date:date,com:"Déf. totale : "+(def > 0 ? "+":"")+def+" (soit "+nv_attaque.total_def+")",def:1});
			}
		}
		
		// comparaison des citoyens pour détecter les morts et les nouveaux venus.
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var nv_annuaire = unsafeWindow.sab_cache.get("annuaire");
		var an_annuaire = unsafeWindow.sab_cache.get_long_term("annuaire");
		unsafeWindow.sab_cache.set_long_term("annuaire",nv_annuaire);
		if (an_annuaire != null) {
			nv_c = new Array();
			$sab.each(nv_annuaire,function(x,c) {
				nv_c[c.id] = c;
			})
			an_c = new Array();
			$sab.each(an_annuaire,function(x,c) {
				an_c[c.id] = c;
			})
			
			$sab.each(nv_c,function(id,c) {
				if ((typeof(an_c[id]) == "undefined") && (typeof(nv_c[id]) != "undefined")){
					if (parseInt(c.id) > 0)
						historique.push({date:date,com:c.name,arrive_c:true});
				}
				if ((typeof(nv_c[id]) == "undefined") && (typeof(an_c[id]) != "undefined")){
					if (parseInt(an_c[id].id) > 0)
						historique.push({date:date,com:an_c[id].name,arrive_c:false});
				}
			});
		}
		
		// enregistrement de l'historique
		if (historique.length > 100)
			historique = historique.slice(historique.length-100);
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		unsafeWindow.sab_cache.set_long_term("historique",historique);
		if ($sab("#sab_log").length>0)
			unsafeWindow.sab_logs.construire_logs($sab("#sab_log"),true);
		unsafeWindow.sab_serveur.send_set();
	}
}

// Page vue d'ensemble de la ville
unsafeWindow.sab_resume_ville = {
	creer_boutons : function () {
		var bouton_1 = $sab(" <a class='inlineButton sab_temp' onclick='sab_resume_ville.preparer_form_analyse_atk(this);'>Analyser</span>");
		$sab("#generic_section div.cityHome ul.ul:has(img[src='/gfx/icons/small_human.gif']) li").last().append(bouton_1);
		var reglages = unsafeWindow.sab_options.charger_reglages();
		if (reglages.meta_notif)
			unsafeWindow.sab_metacoa.check_last_msg(function(retour) {
				if (typeof(retour.last_msg) != "undefined") {
					// $sab.each(retour.last_msg,function(x,id) {
					
					// }
					if (retour.last_msg.length>0) {
						var bouton_2 = unsafeWindow.sab_metacoa.icone_last_msg(retour.last_msg);
						if (bouton_2 != "")
							bouton_2 = $sab("<li>").append($sab("<a style='cursor:pointer' onclick='sab_metacoa.charger_onglet()'> Nouveaux messages dans vos MétaCoas !</a>").prepend(bouton_2));
						$sab("#generic_section div.cityHome ul.ul:has(img[src='/gfx/icons/small_human.gif']) li").last().after(bouton_2);
					}
				}
			});
		// $sab(bouton_1).parent().parent().append("<li><a class='inlineButton' onclick='sab_resume_ville.maj_bbh();'>MàJ BBH</span></li>");
		// $sab(bouton_1).parent().parent().append("<li>Mise à jour des sites : <a class='inlineButton' id='sab_maj_BBH' onclick='sab_resume_ville.maj_site_externe(\"BBH\");'>BBH</span> <a class='inlineButton' id='sab_maj_OOEV' onclick='sab_resume_ville.maj_site_externe(\"OOEV\");'>OOEV</span> <a class='inlineButton' id='sab_maj_PATA' onclick='sab_resume_ville.maj_site_externe(\"PATA\");'>Patamap</span> <a class='inlineButton' onclick='sab_resume_ville.maj_site_externe(\"PATA\");sab_resume_ville.maj_site_externe(\"OOEV\");sab_resume_ville.maj_site_externe(\"BBH\");'>Les 3</span></li>");
		// $sab(".contentPanel .contentBlock").append(unsafeWindow.sab_outside.creer_boutons());
		
	},
	preparer_form_analyse_atk : function (button) {
		var ul = $sab(button).parent().parent();
		var defense = $sab("ul.statusSummary li.left strong span").contents()[0].textContent.trim();
		var attaque = $sab("ul.statusSummary li.mid strong").contents()[0].textContent.trim().split(" ");
		var citoyens = $sab("img[src='/gfx/icons/small_human.gif']").prev().text().trim();
		$sab(".sab_temp").remove();
		ul.after("<h2>Analyse de l'attaque</h2><ul class='ul'><li>Défense prévue : <input name='sab_def' class='sab_data' type='text' onsubmit='return false' value='"+defense+"'/></li><li>Attaque min : <input name='sab_atk_min' class='sab_data' type='text' onsubmit='return false' value='"+attaque[0]+"'/></li><li>Attaque maxi : <input name='sab_atk_max' class='sab_data' type='text' onsubmit='return false' value='"+attaque[attaque.length-1]+"'/></li><li>Citoyens dormant en ville : <input type='text' name='sab_citoyen' class='sab_data' onsubmit='return false' value='"+citoyens+"'/></li><li><a class='sab_temp inlineButton' onclick='sab_resume_ville.executer_analyse(true); return false'>Lancer l'analyse</a></li></ul>");
	},
	factor : function (x,y) {
		if (x <= y) {
			var retour = 1;
			while (x <= y) {
				retour = x*retour;
				x++;
			}
			return retour;
		}
		return 1;
	},
	p_exact : function (n,c,z) {
		return Math.floor((this.factor(z-n+1,z)*Math.pow(c-1,z-n)/(Math.pow(c,z)*this.factor(1,n)))*1000)/10;
	},
	probas : function (n_max,p_max,c,z1,z2,def,j) {
		var d1 = z1-def;
		var d2 = z2-def;
		if (d2 <= 0) return [100]
		if (j >= 6) {
			var x = j + 1 + (j>=15 ? 3 : 0) + (j>=19 ? 1 : 0);
			var d_max = x * c;
			d1 = Math.min(d1,d_max);
			d2 = Math.min(d2,d_max);
		}
		var n = 0;
		var last_p_1 = 0;
		var last_p_2 = 0;
		var sortie = new Array();
		while ((n < n_max) && (Math.min(last_p_1,last_p_2) < p_max)) {
			last_p_1 += this.p_exact(n,c,d1);
			last_p_2 += this.p_exact(n,c,d2);
			sortie.push([last_p_1,last_p_2])
			n++;
		}
		return sortie;
	},
	executer_analyse : function (en_ville) {
		// analyse de l'attaque
		// pull les données d'un programme python développé par ma part
		// http://pythonanywhere.com/ (serveur python libre, hébergement d'une webapp gratuit)
		// désormais, le calcul est en JS.
		var datas = Array();
		$sab(".sab_data").each(function(x,a){
			datas[$sab(a).attr("name")] = $sab(a).attr("value");
		})
		// var analyse = this.probas(20,99.5,datas['sab_citoyen'],datas['sab_atk_min'],datas['sab_atk_max'],datas['sab_def'],$sab('.day').text().match('[0-9]+')[0]);
		// console.log(analyse);
		// var sortie = "**Nombre de citoyens dormant en ville :** "+datas['sab_citoyen']+"<br/>";
		// sortie += "**Attaque mini :** "+datas['sab_atk_min']+"<br/>";
		// sortie += "**Attaque maxi :** "+datas['sab_atk_max']+"<br/>";
		// sortie += "**Def totale :** "+datas['sab_def']+"<br/><br/>";
		// sortie += "**Def personnelle** -> //Chances de survie //<br/>";
		// for (var i = 0;i < analyse.length;i++)
			// sortie += "**"+i+"** -> //"+Math.round(analyse[i][1]*100)/100+"%-"+Math.round(analyse[i][0]*100)/100+"%//<br/>";
		
		$sab.ajax({
			type: 'GET',
			url : "http://guizmus.pythonanywhere.com/stats/"+datas['sab_atk_min']+"/"+datas['sab_atk_max']+"/"+datas['sab_def']+"/"+datas['sab_citoyen'],
			success : function (res) {
				if (en_ville) {
					$sab(".sab_resume_ville").parent().remove();
					$sab(".sab_temp").parent().after("<li><div class='sab_resume_ville' style='background-color:black;color:white;border: 1px solid white;padding:10px;'>"+res.responseText+"</div></li>");
				} else {
					$sab(".sab_resume_ville").remove();
					$sab(".sab_temp").after("<span class='sab_resume_ville'><br/><hr/><div style='background-color:black;color:white;border: 1px solid white;padding:10px;text-align:left'>"+res.responseText+"</div></span>");
				}
			},
			ext : 'html'
		});
	},
	maj_bbh : function (){
		var a = $sab("<iframe src='http://bbh.fred26.fr/'></iframe>");
		$sab(a).css({
			display:"none"
		})
		$sab(a).attr("onload","$sab(this).remove()");
		$sab("body").append(a);
	},
	maj_site_externe : function (site) {
		var url;
		unsafeWindow.sab_cache.set_domaine("reglages");
		var api_key = unsafeWindow.sab_cache.get_long_term('api_key');
		if (api_key == null) {
			$sab('.sab_info_temp').remove();
			$sab("#sab_maj_"+site).parent().append("<span class='sab_info_temp'><br/>Pour afficher cette fonctionnalité, veuillez activer le script dans <a href='/#ghost/city?go=ghost/options'>les réglages</a>.</span>");
			return false;
		}
		switch (site) {
			case "BBH" : url = 'http://bbh.fred26.fr/'; break;
			case "OOEV" : url = 'http://www.oeev-hordes.com/'; break;
			case "PATA" : url = 'http://www.patamap.com/hmupdater.php'; break;
		}
		$sab.ajax({
			url 	: 	url,
			type	: 	'POST',
			data	:	'key='+api_key,
			format	:	'html',
			ext		:	'htmlpost',
			success	:	function (retour) {
							unsafeWindow.sab_resume_ville.valide_maj_externe(site);
						},
		});
		$sab("#sab_maj_"+site).append("<span class='sab_info_temp_"+site+"'><img src='http://data.hordes.fr/gfx/design/loading.gif' height='17px' width='17px'/></span>");
		return true;
	},
	valide_maj_externe : function (site) {
		$sab('.sab_info_temp_'+site).remove();
	}
}

// Page chantiers
unsafeWindow.sab_chantiers = {
	creer_boutons : function () {
		// if ($sab("#sab_options_chantier").length == 0) {
		if (($sab(".bvote ul.tabs").length > 0) && !$sab(".bvote ul.tabs").attr("sab_loaded"))  {
			$sab(".bvote ul.tabs").attr("sab_loaded",true)
			unsafeWindow.sab_cache.set_domaine("reglages");
			var checked = unsafeWindow.sab_cache.get_long_term('ressources_affichees');
			// if (checked == null) {
				// checked = false;
				// unsafeWindow.sab_cache.set_long_term('ressources_affichees',false);
			// }
			// $sab("#generic_section div.bvote ul.tabs").before("<div class='reco' id='sab_options_chantier'>Chantiers <input type='checkbox' checked disabled/>Disponibles <input name='sab_chantiers_indispos' type='checkbox' onchange='sab_chantiers.afficher_indisponibles(this)' onmouseout='js.HordeTip.hide(event)' onmouseover='js.HordeTip.showHelp(this,\"Attention! opération lourde, bloque la page quelques instants.\");'/>A débloquer<br/><input type='checkbox' "+(checked ? "checked " : "")+"onchange='sab_chantiers.afficher_bloques($sab(this).prop(\"checked\"))'/>Afficher toutes les ressources</div>");
			if (checked == 1) {
				window.setTimeout("sab_chantiers.afficher_bloques(true)",500);
			}
		}
	},
	afficher_indisponibles : function (afficher) {
		if ($sab(afficher).prop('checked')) {
			if ($sab(".sab_chantier_non_dispo").length > 0) {
				$sab(".sab_chantier_non_dispo").css({display:''});
			} else {
				this.construire_indisponibles();
			}
		} else {
			$sab(".sab_chantier_non_dispo").css({display:'none'});
		}
	},
	afficher_bloques : function (afficher) {
		unsafeWindow.sab_cache.set_domaine("reglages");
		if (afficher) {
			unsafeWindow.sab_cache.set_long_term('ressources_affichees',true);
			if ($sab(".sab_chantier_bloques").length > 0) {
				$sab(".sab_chantier_bloques").css({display:''});
			} else {
				this.construire_bloques();
			}
		} else {
			unsafeWindow.sab_cache.set_long_term('ressources_affichees',false);
			$sab(".sab_chantier_bloques").css({display:'none'});
		}
	},
	construire_bloques : function () {
		this.load_chantiers();
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var niveau_atelier = unsafeWindow.sab_cache.get_long_term("upgrades");
		niveau_atelier = ((niveau_atelier == null) || (typeof(niveau_atelier.Atelier) == "undefined")) ? 0 : niveau_atelier.Atelier.level;
		$sab.each($sab(".building.locked"),function(x,tr_building) {
			var details_building = $sab(tr_building).attr("class").match(/sab_taged_chantier_([0-9]+)/);
			if (details_building.length>1) {
				var datas = unsafeWindow.sab_chantiers.infos_chantier({id:details_building[1]});
				var list_requis = $sab("<div>").addClass("list").addClass("sab_chantier_bloques");
				list_requis.append($sab('<div class="rscItem"><img src="/gfx/loc/fr/small_pa.gif" alt=""> '+unsafeWindow.sab_chantiers.valeur_pa(datas.ap,niveau_atelier)+'</div>'));
				$sab.each(datas.items,function (x,item) {
					list_requis.append($sab('<div class="rscItem"><img src="gfx/icons/item_'+unsafeWindow.detail_items_bbh[item.id].img+'.gif" alt=""> '+item.count+'</div>'));
				});
				$sab('.rsc',tr_building).append(list_requis);
			}
		});
		var niveau_atelier = unsafeWindow.sab_cache.get_long_term("upgrades");
		niveau_atelier = ((niveau_atelier == null) || (typeof(niveau_atelier.Atelier) == "undefined")) ? 0 : niveau_atelier.Atelier.level;
		$sab.each($sab("tr.building:has(.rscItem img[src*='/small_pa.gif'])"),function(x,tr) {
			var details_building = $sab(tr).attr("class").match(/sab_taged_chantier_([0-9]+)/);
			if (details_building.length>1) {
				var datas = unsafeWindow.sab_chantiers.infos_chantier({id:details_building[1]});
				var temp_el = $sab(".rscItem:has(img[src*='/small_pa.gif'])",tr)
				temp_el.html(temp_el.html()+"<span class='sab_chantier_bloques'>/"+unsafeWindow.sab_chantiers.valeur_pa(datas.ap,niveau_atelier)+"</span>");
				
			}
		});
	},
	construire_indisponibles : function () {
		if (typeof(this.infos_chantiers) == "undefined") {
			this.load_chantiers();
		}
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var niveau_atelier = unsafeWindow.sab_cache.get_long_term("upgrades");
		niveau_atelier = ((niveau_atelier == null) || (typeof(niveau_atelier.Atelier) == "undefined")) ? 0 : niveau_atelier.Atelier.level;
		$sab.each(this.infos_chantiers, function (x, chantier) {
			if (typeof(chantier) != "undefined")
				unsafeWindow.sab_chantiers.construire_ligne(chantier.id,niveau_atelier);
		});
	},
	construire_ligne : function (chantier,niveau_atelier) {
		chantier = this.infos_chantiers[chantier];
		if (typeof(chantier) == "undefined")
			return false;
		var est_construit = this.tr_chantier_est_construit(chantier);
		if (est_construit) {
			return est_construit;
		}
		
		var el = this.construire_tr_chantier(chantier,niveau_atelier);
		this.infos_chantiers[chantier.id].element = el;
		$sab(this.construire_ligne(chantier.parent,niveau_atelier)).after(el);
		return el;
	},
	tr_chantier_est_construit : function (chantier) {
		return chantier.element || $sab(".sab_taged_chantier_"+chantier.id)[0] || $sab("#generic_section div.bvote tr.building:has(strong:econtains('"+chantier.name+"'))")[0];
	},
	infos_chantier : function (chantier) {
		var id_chantier = parseInt(chantier.id);
		return (!this.infos_chantiers[id_chantier].categorie) ? this.remonter_parents(this.infos_chantiers[id_chantier]) : this.infos_chantiers[id_chantier];
	},
	construire_tr_chantier : function (chantier,niveau_atelier) {
		var datas = this.infos_chantier(chantier);
		var sortie = $sab("<tr>").addClass("building").addClass("sab_chantier_non_dispo").addClass("sab_taged_chantier_"+datas.id);
		
		sortie.append($sab("<td class='btype btype_"+datas.categorie+"'>&nbsp;</td>"));
		
		var td = $sab("<td style='background-color:#7E4D2A !important'></td>").attr("class","important");
		for (var i = 0; i < datas.nb_parents; i++)
			td.append($sab('<img src="/gfx/icons/small_parent.gif" alt="">'));
		td.append($sab('<img src="/gfx/icons/'+datas.img+'.gif" alt="icon" title="">'));
		td.append($sab("<strong> "+datas.name+"</strong>"));
		if (datas.temporaire == "1")
			td.append($sab(' <img src="http://data.hordes.fr/gfx/icons/small_warning.gif">'));
		if ((datas.plan) && (parseInt(datas.plan) > 0))  {
			td.append($sab('<img style="float:right" src="gfx/icons/item_'+unsafeWindow.detail_items_bbh[datas.plan].img+'.gif">'));
		}
		sortie.append(td);
		
		sortie.append($sab('<td style="background-color:#7E4D2A !important" class="important def">'+(parseInt(datas.def) > 0 ? datas.def+' <img src="/gfx/icons/small_def.gif" alt="icon" title="">' : '')+'</td>'));

		td = $sab("<td style='background-color:#7E4D2A !important'></td>").addClass("rsc");
		var list_requis = $sab("<div>").addClass("list");
		list_requis.append($sab('<div class="rscItem"><img src="/gfx/loc/fr/small_pa.gif" alt=""> '+this.valeur_pa(datas.ap,niveau_atelier)+'</div>'));
		$sab.each(datas.items,function (x,item) {
			list_requis.append($sab('<div class="rscItem"><img src="gfx/icons/item_'+unsafeWindow.detail_items_bbh[item.id].img+'.gif" alt=""> '+item.count+'</div>'));
		});
		td.append(list_requis);
		sortie.append(td);
		sortie.append($sab('<td class="act" style="background-color:#7E4D2A !important">&nbsp;</td>'));
		return sortie;
	},
	valeur_pa : function (pa_base,atelier) {
		var prct = 1;
		switch (parseInt(atelier)) {
			case 1 : prct = 0.95; break;
			case 2 : prct = 0.90; break;
			case 3 : prct = 0.85; break;
			case 4 : prct = 0.80; break;
			case 5 : prct = 0.75; break;
			case 0 : default : break;
		}
		return Math.ceil(prct*pa_base);
	},
	// private, transforme la BDD chantier en un array, index = id_chantier
	load_chantiers : function () {
		this.infos_chantiers = new Array();
		var chantier;
		$sab.each(unsafeWindow.detail_chantiers,function(x,chantier) {
			unsafeWindow.sab_chantiers.infos_chantiers[parseInt(chantier.id)] = chantier;
			$sab("#generic_section div.bvote tr.building:has(strong:econtains('"+chantier.name+"'))").addClass("sab_taged_chantier_"+chantier.id);
		});
		// while (chantier = unsafeWindow.detail_chantiers.pop()) {
			// this.infos_chantiers[parseInt(chantier.id)] = chantier;
			// $sab("#generic_section div.bvote tr.building:has(strong:econtains('"+chantier.name+"'))").addClass("sab_taged_chantier_"+chantier.id);
		// }
		return this.infos_chantiers;
	},
	remonter_parents : function (chantier) {
		if (parseInt(chantier.parent) == 0) {
			this.infos_chantiers[parseInt(chantier.id)].nb_parents = 0;
			return this.infos_chantiers[parseInt(chantier.id)];
		} else {
			var parent = this.infos_chantiers[parseInt(chantier.parent)];
			if (typeof(parent) != "undefined") {
				if (typeof(parent.nb_parents) == 'undefined')
					parent = this.remonter_parents(parent);
				chantier.nb_parents = parent.nb_parents + 1;
				// categorie : wall1 = muraille / pump / command = atelier / tower / fondations / doorLock = portail
				chantier.categorie = parent.categorie;
				this.infos_chantiers[parseInt(chantier.id)] = chantier;
			}
		}
		return this.infos_chantiers[parseInt(chantier.id)];
	}
}

// Page outremonde, nombreux modules
unsafeWindow.sab_outside = {
	creer_menu : function () {
		if (($sab("#generic_section div.right:has(ul.outInv)").length > 0) && ($sab("#sab_outside_menu").length == 0)) {
			$sab("#generic_section div.right:has('ul.outInv')").after(this.creer_boutons());
			// this.charger_contenu('charger_maj_externes');
		}
	},
	creer_boutons : function () {
		var reglages = unsafeWindow.sab_options.charger_reglages();
		// console.log(reglages.meta_notif);
		if (reglages.meta_notif)
			unsafeWindow.sab_metacoa.check_last_msg(function(retour) {
				if (typeof(retour.last_msg) != "undefined") {
					// $sab.each(retour.last_msg,function(x,id) {
					
					// }
					// console.log(reglages.meta_notif);
					if (retour.last_msg.length>0) {
						var bouton_2 = unsafeWindow.sab_metacoa.icone_last_msg();
						// if (bouton_2 != "")
							// bouton_2 = $sab("<li>").append($sab("<a style='cursor:pointer' onclick='sab_metacoa.charger_onglet()'> Nouveaux messages dans vos MétaCoas !</a>").prepend(bouton_2));
						$sab("#sab_hook_outside_meta").prepend(bouton_2);
					}
				}
			});
		// return $sab('<div class="clear"></div><ul id="sab_outside_menu" class="tabs" style="margin-bottom:0;">'+(reglages.meta_actif ? '<li id="sab_hook_outside_meta"><a href="'+window.location.hash+'" style="cursor:pointer" onclick="sab_metacoa.charger_onglet()">MétaCoa</a></li>' : '' )+'<li><a href="'+window.location.hash+'" style="cursor:pointer" onclick="sab_outside.marquer_onglet(this);sab_outside.charger_contenu(\'charger_banque\')">Banque</span></li><li><a href="'+window.location.hash+'" style="cursor:pointer" onclick="sab_outside.marquer_onglet(this);sab_outside.charger_contenu(\'charger_attaque\')">Défense/attaque</span></li><li><a href="'+window.location.hash+'" style="cursor:pointer" onclick="sab_outside.marquer_onglet(this);sab_outside.charger_contenu(\'charger_annuaire\')">Citoyens</span></li></ul><div id="sab_outside_content" style="padding : 5px;margin-bottom : 7px;text-align : justify;background-color : #9A8652;-moz-border-radius : 10px"></div>');
		return $sab('<div class="clear"></div><ul id="sab_outside_menu" class="tabs" style="margin-bottom:0;">'+(reglages.meta_actif ? '<li id="sab_hook_outside_meta"><a style="cursor:pointer" onclick="sab_metacoa.charger_onglet();">MétaCoa</a></li>' : '' )+'<li><a href="'+window.location.hash+'" style="cursor:pointer" onclick="sab_outside.marquer_onglet(this);sab_outside.charger_contenu(\'charger_banque\')">Banque</span></li><li><a href="'+window.location.hash+'" style="cursor:pointer" onclick="sab_outside.marquer_onglet(this);sab_outside.charger_contenu(\'charger_attaque\')">Défense/attaque</span></li><li><a href="'+window.location.hash+'" style="cursor:pointer" onclick="sab_outside.marquer_onglet(this);sab_outside.charger_contenu(\'charger_annuaire\')">Citoyens</span></li></ul><div id="sab_outside_content" style="padding : 5px;margin-bottom : 7px;text-align : justify;background-color : #9A8652;-moz-border-radius : 10px"></div>');
	},
	charger_contenu : function (fonction) {
		$sab("#sab_outside_content").html(this[fonction]());
	},
	marquer_onglet : function (onglet) {
		$sab(".selected",$sab(onglet).parent().parent()).removeClass("selected");
		$sab(onglet).parent().addClass("selected");
	},
	append_contenu : function (contenu) {
		$sab("#sab_outside_content").html(contenu);
	},
	charger_maj_externes : function () {
		return ($sab("Mises à jour sites externes temporairement désactivée"));
		// unsafeWindow.sab_cache.set_domaine("reglages");
		// var api_key = unsafeWindow.sab_cache.get_long_term('api_key');
		// if (api_key == null) 
			// return $sab("<span>Pour afficher cet onglet, veuillez activer le script dans <a href='/#ghost/city?go=ghost/options'>les réglages</a>.</span>");
		// return $sab("Mise à jour des sites : <a class='inlineButton' id='sab_maj_BBH' onclick='sab_resume_ville.maj_site_externe(\"BBH\");'>BBH</span> <a class='inlineButton' id='sab_maj_OOEV' onclick='sab_resume_ville.maj_site_externe(\"OOEV\");'>OOEV</span> <a class='inlineButton' id='sab_maj_PATA' onclick='sab_resume_ville.maj_site_externe(\"PATA\");'>Patamap</span> <a class='inlineButton' onclick='sab_resume_ville.maj_site_externe(\"PATA\");sab_resume_ville.maj_site_externe(\"OOEV\");sab_resume_ville.maj_site_externe(\"BBH\");'>Les 3</span>");
	},
	charger_banque : function () {
		var retour = $sab("<ul class='tools shortTools nada cityInv stocks' id='sab_banque' style='margin-bottom:0;display:inline-block;width:305px;max-height:300px !important;overflow-y:scroll;vertical-align:top;'><li class='clear'></li></ul><ul id='sab_log' class='logs' style='width:235px;display:inline-block;max-height:290px !important;margin-left:5px;vertical-align:top;'></ul>");
		// unsafeWindow.sab_cache.set_domaine("xml_hordes");
		// var contenu_banque = unsafeWindow.sab_cache.get("contenu_banque");
		if (unsafeWindow.sab_xml_hordes.est_autorise()) {
			if (!unsafeWindow.sab_xml_hordes.est_a_jour()) {
				unsafeWindow.sab_xml_hordes.charger_XML(function() {
					unsafeWindow.sab_outside.afficher_banque($sab("#sab_banque").length > 0 ? $sab("#sab_banque,#sab_log") : null);
				});
				return retour;
			}
		} else {
			return $sab("<span>Pour afficher cet onglet, veuillez activer le script dans <a href='/#ghost/city?go=ghost/options'>les réglages</a>.</span>");
		}
		return this.afficher_banque(retour);
	},
	afficher_banque : function (hook) {
		if (hook == null)
			hook = $sab("#sab_banque,#sab_log");
		var hook_banque = $sab(hook[0])
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var contenu_banque = unsafeWindow.sab_cache.get("contenu_banque");
		var iconurl = unsafeWindow.sab_cache.get_long_term("iconurl");
		var items = contenu_banque.split(";")
		$sab.each(items, function (x,item) {
			var item_datas = item.split(":");
			var details_item = unsafeWindow.detail_items_bbh[item_datas[0]];
			var nouvel_objet = $sab("<li>").attr("class","multi");
			nouvel_objet.append($sab("<a>").attr("onmouseout", "js.HordeTip.hide(event)").attr("onmouseover","js.HordeTip.showTip(this,\""+details_item.nom+" <img src='"+iconurl+"item_"+details_item.img+".gif' alt='item'/>\",\""+item_datas[1]+" en banque\", event)").attr("class",item_datas.length == 3 ? "limited" : "").append($sab("<img alt='item' src='"+iconurl+"item_"+details_item.img+".gif'/> <span class='count'>"+item_datas[1]+"</span>")));
			// ordre : ressource / provision / 
			if ($sab("."+details_item.categorie,hook_banque).length == 0) {
				if (details_item.categorie == "Ressource") {
					hook_banque.children().first().after($sab("<li class='clear'></li><li class='group "+details_item.categorie+"'>"+details_item.categorie+"</li><li class='clear'></li>"));
				} else {
					 hook_banque.children().last().before($sab("<li class='clear'></li><li class='group "+details_item.categorie+"'>"+details_item.categorie.replace("_"," ")+"</li><li class='clear'></li>"));
				}
			};
			$sab("."+details_item.categorie,hook_banque).next().after(nouvel_objet);
		});
		hook = unsafeWindow.sab_logs.construire_logs(hook,false);
		// var historique = unsafeWindow.sab_cache.get_long_term("historique");
		// var horaire_precedent = 0;
		// if(historique == null) historique = new Array();
		// $sab.each(historique,function(x,data) {
			// if (data.date != horaire_precedent) {
				// var date = new Date(horaire_precedent);
				// if (horaire_precedent != 0)
					// hook.last().prepend("<li class='silenceSeparator'>"+(date.getHours()<10?"0"+date.getHours():date.getHours())+"h"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+"</li>");
				// horaire_precedent = data.date;
			// }
			// if (data.item) {
				// var details_item = unsafeWindow.detail_items_bbh[data.item];
				// data.com = parseInt(data.com);
				// hook.last().prepend("<li class=entry><strong class='tool'><img alt='item' src='"+iconurl+"item_"+details_item.img+".gif'/> "+details_item.nom+"</strong> <span style='font-weight:bold;color:"+(data.com > 0 ? "green'>+" : "red'>")+data.com+"</span></li>");
			// } else if (data.building) {
				// sab_chantiers.load_chantiers();
				// var details_building = unsafeWindow.sab_chantiers.infos_chantier({id:data.building});
				// hook.last().prepend("<li class='entry CL_OutsideChat'><strong class='tool'><img alt='building' src='"+iconurl+details_building.img+".gif'/> "+details_building.name+"</strong> : "+data.com+" !</li>");
			// } else if (data.def) {
				// hook.last().prepend("<li class='entry CL_OutsideTempEvent'><img src='/gfx/icons/small_def.gif' alt='def'> "+data.com+"</li>");
			// } else if (data.puits) {
				// hook.last().prepend("<li class='entry CL_OutsideTempEvent'><img src='/gfx/icons/small_water.gif' alt='eau'> <span style='font-weight:bold;color:"+(data.puits > 0 ? "green'>+" : "red'>")+data.puits+"</span> eau au puits</li>");
			// } else {
				// hook.last().prepend("<li class=entry>"+data.com+"</li>");
			// }
		// });
		// var date = new Date(horaire_precedent);
		// if (horaire_precedent != 0)
			// hook.last().prepend("<li class='silenceSeparator'>"+(date.getHours()<10?"0"+date.getHours():date.getHours())+"h"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+"</li>");
		return hook;
	},
	charger_attaque : function () {
		if (unsafeWindow.sab_xml_hordes.est_autorise()) {
			// unsafeWindow.sab_cache.set_domaine("xml_hordes");
			// var attaque = unsafeWindow.sab_cache.get("attaque");
			if (!unsafeWindow.sab_xml_hordes.est_a_jour()) {
				unsafeWindow.sab_xml_hordes.charger_XML(function() {
					unsafeWindow.sab_outside.afficher_attaque();
				});
				return null;
			}
			return this.afficher_attaque();
		} else {
			return $sab("<span>Pour afficher cet onglet, veuillez activer le script dans <a href='/#ghost/city?go=ghost/options'>les réglages</a>.</span>");
		}
	},
	afficher_attaque : function () {
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var attaque = unsafeWindow.sab_cache.get("attaque");
		var retour = "<table class='table' style='display:inline-block'><tr><th colspan=4>Attaque et défenses</th></tr><tr><td>Défense prévue</td><td><input name='sab_def' class='sab_data' type='text' onsubmit='return false' value='"+attaque.total_def+"'/></td><td><b>Attaque estimée</b></td><td>"+attaque.mini+" - "+attaque.maxi+"</td></tr><tr><td>Attaque min</td><td><input name='sab_atk_min' class='sab_data' type='text' onsubmit='return false' value='"+attaque.mini+"'/></td><td><b>Défense totale</b></td><td>"+attaque.total_def+"</td></tr><tr><td>Attaque maxi</td><td><input name='sab_atk_max' class='sab_data' type='text' onsubmit='return false' value='"+attaque.maxi+"'/></td><td>Citoyens dormant en ville</td><td><input type='text' name='sab_citoyen' class='sab_data' onsubmit='return false' value='"+attaque.citoyens+"'/></td></tr><tr><td colspan=4 style='text-align:center'><a class='sab_temp inlineButton' onclick='sab_resume_ville.executer_analyse(false); return false'>Lancer l'analyse</a></td></tr>"
		// retour += "<table style='display:inline-block' class='table'><tr><tr></tr><tr><th colspan=2>Chantiers défensifs actuels</th>";
		retour += "<tr><th colspan=4>Chantiers défensifs actuels</th></tr>";
		var buildings = unsafeWindow.sab_cache.get_long_term("buildings");
		var iconurl = unsafeWindow.sab_cache.get_long_term("iconurl");
		var liste_buildings = {
			temporaire : [],
			definitif : []
		};
		if ((buildings != null) && (buildings.length)) {
			sab_chantiers.load_chantiers();
			$sab.each(buildings,function(x,building) {
					var details_building = unsafeWindow.sab_chantiers.infos_chantier({id:building.id});
					if (details_building.temporaire == 1) {
						liste_buildings.temporaire.push(details_building);
					} else {
						liste_buildings.definitif.push(details_building);
					}
			});
		}
		var odd = true;
		if (liste_buildings.temporaire.length > 0)
			$sab.each(liste_buildings.temporaire, function (x,building) {
				if (odd)
					retour += "<tr>";
				retour += "<td colspan=2 class='tool'><img src='http://data.hordes.fr/gfx/icons/small_warning.gif'><img alt='building' src='"+iconurl+building.img+".gif'/> "+building.name+(building.def > 0 ?"<span style='float:right'><img src='/gfx/icons/small_def.gif' alt='def'/>"+building.def+"</span>" : "")+"</td>";
				if (!odd)
					retour += "</tr>";
				odd = !odd;
			});
		if (liste_buildings.definitif.length > 0)
			$sab.each(liste_buildings.definitif, function (x,building) {
				if (odd)
					retour += "<tr>";
				retour += "<td colspan=2 class='tool'><img alt='building' src='"+iconurl+building.img+".gif'/> "+building.name+(building.def > 0 ?"<span style='float:right'><img src='/gfx/icons/small_def.gif' alt='def'/>"+building.def+"</span>" : "")+"</td>";
				if (!odd)
					retour += "</tr>";
				odd = !odd;
			});
		if (!odd)
			retour += "</tr>";
		retour += "</table>";
		return this.append_contenu($sab(retour));
	
	},
	charger_annuaire : function () {
		if (unsafeWindow.sab_xml_hordes.est_autorise()) {
			// unsafeWindow.sab_cache.set_domaine("xml_hordes");
			// var annuaire = unsafeWindow.sab_cache.get("annuaire");
			if (!unsafeWindow.sab_xml_hordes.est_a_jour()) {
				unsafeWindow.sab_xml_hordes.charger_XML(function() {
					unsafeWindow.sab_outside.afficher_annuaire();
				});
				return null;
			}
			return this.afficher_annuaire();
		} else {
			return $sab("<span>Pour afficher cet onglet, veuillez activer le script dans <a href='/#ghost/city?go=ghost/options'>les réglages</a>.</span>");
		}
	},
	afficher_annuaire : function () {
		unsafeWindow.sab_cache.set_domaine("xml_hordes");
		var annuaire = unsafeWindow.sab_cache.get_long_term("annuaire");
		var coord_ville = unsafeWindow.sab_cache.get_long_term("coord_ville");
		coord_ville = coord_ville == null ? false : coord_ville.split(",")
		
		var sortie = $sab("<table>").addClass("table").css({"width":"100%"});
		sortie.append("<tr><th>Nom</th><th width='20px'></th><th style='width:180px'>Annonce</th><th width='20px'>Déf.</th><th>Emplacement</th></tr>");
		unsafeWindow.sab_outside.tri_annuaire = {};
		$sab.each(annuaire,function(a,citizen) {
			var coordonnees = coord_ville ? (citizen.out == 1 ? (citizen.x == null ? "Dehors" : (citizen.x-parseInt(coord_ville[0].substr(2)))+"/"+(parseInt(coord_ville[1].substr(2))-citizen.y) ) : "En ville") : "";
			var tr = $sab("<tr><td>"+(citizen.ban == 1 ? "<img src='/img/icons/r_ban.gif' alt='ban'> " : "")+"<a href='/#ghost/city?go=ghost/user?uid="+citizen.id+"'>"+citizen.name+"</a></td><td>"+unsafeWindow.sab_outside.image_job(citizen.job)+"</td><td>"+citizen.annonce+"</td><td>"+(citizen.job == 'basic' ? citizen.def : parseInt(citizen.def)+2)+"</td><td>"+coordonnees+"</td></tr>");
			if (typeof(unsafeWindow.sab_outside.tri_annuaire[coordonnees]) == "undefined")
				unsafeWindow.sab_outside.tri_annuaire[coordonnees] = [];
			unsafeWindow.sab_outside.tri_annuaire[coordonnees].push(tr);
		});
		var last_coord = "";
		var add_color = false;
		$sab.each(unsafeWindow.sab_outside.tri_annuaire,function(coord,trs){
			if (coord != last_coord) {
				add_color = !add_color;
				last_coord = coord;
			}
			$sab.each(trs,function(x,tr) {
				if (add_color)
					$sab("td",tr).attr("style","background-color:#7E4D2A !important;border-right:1px solid #5C2B20 !important;border-bottom:1px solid #5C2B20 !important");
				sortie.append(tr);
			});
		});
		this.append_contenu(sortie);
		// _tid.checkUsers();
	},
	image_job : function (job) {
		var img = $sab("<img>");
		switch(job) {
			case "basic" : 
				img.attr("src","/gfx/icons/item_basic_suit.gif");
				break;
			case "eclair" : 
				img.attr("src","/gfx/icons/item_vest_on.gif");
				break;
			case "tech" :
				img.attr("src","/gfx/icons/item_keymol.gif");
				break;
			case "tamer" : 
				img.attr("src","/gfx/icons/item_tamed_pet.gif");
				break;
			case "collec" :
				img.attr("src","/gfx/icons/item_pelle.gif");
				break;
			case "shaman" :
				img.attr("src","/gfx/icons/item_shaman.gif");
				break;
			case "guardian" :
				img.attr("src","/gfx/icons/item_shield.gif");
				break;
			case "hunter" :
				img.attr("src","/gfx/icons/item_surv_book.gif");
				break;
			default : 
				img.html(job);
				break;
		}
		return img[0].outerHTML;
	}
}

// Page gazette
unsafeWindow.sab_logs = {
	masquer_tous : function () {
		$sab("ul.logs .entry").css({display:'none'});
	},
	afficher_tous : function () {
		$sab("ul.logs .entry").css({display:''});
	},
	afficher_item : function (nom) {
		$sab("ul.logs .entry:has(.tool img[src*='item_"+nom+".gif'])").css({display:''});
	},
	afficher_categorie : function (categorie) {
		$sab("ul.logs .CL_"+categorie).css({display:''});
	},
	afficher_eau : function () {
		this.masquer_tous();
		this.afficher_item("water");
		this.afficher_item("jerrycan");
		this.afficher_item("water_can_empty");
		this.afficher_item("water_can_1");
		this.afficher_item("water_can_2");
		this.afficher_item("water_can_3");
		this.afficher_categorie("Well");
	},
	analyse_eau : function () {
		this.afficher_eau();
		$sab("ul.logs .entry:visible")
	},
	extraire_nom_item : function (img) {
		var reg_src_item = /\/item_(.*).gif/;
		return reg_src_item.exec($sab(img).attr("src"))[1]
	},
	creer_liste_items : function () {
		var liste_items = new Array();
		var items_vus = new Array();
		$sab.each($sab("ul.logs .entry .tool img"), function (x,img) {
			var nom = unsafeWindow.sab_logs.extraire_nom_item(img);
			if ($sab.inArray(nom,items_vus) < 0) {
				items_vus.push(nom);
				liste_items.push({
					nom : nom,
					img : $sab(img).clone(),
					nom_fr : $sab(img).parent().text().trim()
				});
			}
		});
		liste_items.sort(function(a, b) {
			return a.nom_fr.toUpperCase().localeCompare(b.nom_fr.toUpperCase());
		})
		
		var menu = $sab("<select>").attr("onchange","sab_logs.filtrer(this.value)");
		menu.append($sab("<option value=''>[ Voir tous ]</option>"));
		menu.append($sab("<option value='gestion_eau'>[ Gestion de l'eau ]</option>"));
		$sab.each(liste_items,function (x,o) {
			menu.append($sab("<option value='"+o.nom+"'></option>").append(o.img).append(o.nom_fr));
		});
		var sortie = $sab("<div class='crit'></div>").append("<label>Objets :</label>").append(menu);
		
		var hook = $sab(".crit").last();
		hook.after(sortie);
		
		var hook = $sab("<ul id='sab_log' class='logs' style='width:250px;max-height:290px !important;position:absolute;margin-top:520px;margin-left:20px'></ul>");
		$sab(".logControl").after(hook);
		this.construire_logs(hook,false);
	},
	construire_logs : function (hook,recent) {
		if (unsafeWindow.sab_xml_hordes.est_autorise()) {
			if (!unsafeWindow.sab_xml_hordes.est_a_jour()) return hook;
			if (!hook) return hook;
			unsafeWindow.sab_cache.set_domaine("reglages");
			var reglages = unsafeWindow.sab_options.charger_reglages();
			var horaire_alerte = parseInt(unsafeWindow.sab_cache.get_long_term("log_alertes"));
			unsafeWindow.sab_cache.set_domaine("xml_hordes");
			var iconurl = unsafeWindow.sab_cache.get_long_term("iconurl");
			var historique = unsafeWindow.sab_cache.get_long_term("historique");
			var horaire_precedent = 0;
			var last_date = 0;
			if(historique == null) historique = new Array();
			if (!reglages.v_light) {
				$sab.each(historique,function(x,data) {
					if (!recent || (data.date > horaire_alerte)) {
						if (data.date != horaire_precedent) {
							var date = new Date(horaire_precedent);
							if (horaire_precedent != 0)
								hook.last().prepend("<li class='silenceSeparator'>"+(date.getHours()<10?"0"+date.getHours():date.getHours())+"h"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+"</li>");
							horaire_precedent = data.date;
						}
						if (data.item) {
							var details_item = unsafeWindow.detail_items_bbh[data.item];
							data.com = parseInt(data.com);
							hook.last().prepend("<li class=entry><strong class='tool'><img alt='item' src='"+iconurl+"item_"+details_item.img+".gif'/> "+details_item.nom+"</strong> <span style='font-weight:bold;color:"+(data.com > 0 ? "green'>+" : "red'>")+data.com+"</span></li>");
						} else if (data.building) {
							sab_chantiers.load_chantiers();
							var details_building = unsafeWindow.sab_chantiers.infos_chantier({id:data.building});
							hook.last().prepend("<li class='entry CL_OutsideTempEvent'><strong class='tool'><img alt='building' src='"+iconurl+details_building.img+".gif'/> "+details_building.name+"</strong> : "+data.com+" !</li>");
						} else if (data.def) {
							hook.last().prepend("<li class='entry CL_OutsideTempEvent'><img src='/gfx/icons/small_def.gif' alt='def'> "+data.com+"</li>");
						} else if (data.puits) {
							hook.last().prepend("<li class='entry CL_OutsideTempEvent'><img src='/gfx/icons/small_water.gif' alt='eau'> <span style='font-weight:bold;color:"+(data.puits > 0 ? "green'>+" : "red'>")+data.puits+"</span> eau au puits</li>");
						} else if (typeof(data.arrive_c) == "boolean") {
							hook.last().prepend("<li class='entry CL_"+(data.arrive_c ? "NewUser" : "Attack")+"'>"+data.com+" est "+(data.arrive_c ? "arrivé":"mort")+" !</li>");
						} else {
							hook.last().prepend("<li class=entry>"+data.com+"</li>");
						}
						last_date = data.date;
					}
				});
			}
			var date = new Date(horaire_precedent);
			if (horaire_precedent > 0)
				hook.last().prepend("<li class='silenceSeparator'>"+(date.getHours()<10?"0"+date.getHours():date.getHours())+"h"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+"</li>");
			$sab("#logs .logs").css({"max-height":"480px !important"});
			if (recent && (last_date > 0) && (hook.attr("id")!="sab_log"))
				$sab("li",hook).first().prepend("<a class='inlineButton' onclick='sab_logs.fermer_alerte("+last_date+")'>Lu</a> ");
		} else {
			hook.append("<li>Pour afficher cet onglet, veuillez activer le script dans <a href='/#ghost/city?go=ghost/options'>les réglages</a>.</li>");
		}
		
		return hook;
	},
	filtrer : function (item) {
		if (item == '')
			return this.afficher_tous();
		if (item == "gestion_eau")
			return this.afficher_eau();
		this.masquer_tous();
		this.afficher_item(item);
	},
	// alertes_actives : function () {
		// unsafeWindow.sab_cache.set_domaine("reglages");
		// return unsafeWindow.sab_cache.get_long_term("log_alertes_actif") ? true : false;
	// },
	afficher_alertes : function () {
		var hook = ($sab("#sab_cadre_alerte").length == 0) ? $sab("<ul id='sab_cadre_alerte' class='logs' style='width:250px;max-height:110px !important;position:absolute;margin-top:-210px;margin-left:25px;width:'></ul>") : $sab("#sab_cadre_alerte");
		if($sab("li",hook).length > 0)
			hook.children().remove();
		unsafeWindow.sab_logs.construire_logs(hook,true);
		if($sab("li",hook).length == 0) {
			if ($sab("#sab_cadre_alerte").length > 0)
				$sab("#sab_cadre_alerte").remove();
		} else
			if ($sab("#sab_cadre_alerte").length == 0)
				$sab('#clock').before(hook);
	},
	fermer_alerte : function (time) {
		unsafeWindow.sab_cache.set_domaine("reglages");
		unsafeWindow.sab_cache.set_long_term("log_alertes",time);
		$sab("#sab_cadre_alerte").remove();
	}
}

// Page annuaire et maisons
unsafeWindow.sab_annuaire = {
	sauvegarder_ordre_citoyens : function () {
		unsafeWindow.sab_cache.set_domaine("annuaire");
		var ordre_citoyens = unsafeWindow.sab_cache.get('ordre_citoyens');
		if (ordre_citoyens == null) {
			ordre_citoyens = Array();
			$sab.each($sab("div.citizens table.large tr:not(:has(img[src*='small_death'])) .msg"),function (x,td) {
				ordre_citoyens.push($sab(td).attr("onclick").match(/\?id=([0-9]+);/)[1]);
			});
		}
		unsafeWindow.sab_cache.set('ordre_citoyens',ordre_citoyens);
	},
	identifier_maison : function () {
		return $sab("div.clint ul.tabs li.selected a").attr("onclick").match(/\?id=([0-9]+);/)[1];
	},
	ajouter_boutons : function () {
		unsafeWindow.sab_cache.set_domaine("annuaire");
		var ordre_citoyens = unsafeWindow.sab_cache.get('ordre_citoyens');
		if (ordre_citoyens != null) {
			var id = this.identifier_maison();
			if (id) {
				var position = $sab.inArray(id,ordre_citoyens);
				var sk = unsafeWindow.location.href.match(/;sk=[0-9a-z]+/)[0];
				if (position > 0)
					var id_precedent = ordre_citoyens[position-1];
				if (position < ordre_citoyens.length -1)
					var id_suivante = ordre_citoyens[position+1];
				if (id_precedent)
					$sab("div.clint ul.tabs li.selected").before("<li><a href='#city/seeClint?id="+id_precedent+";sk="+sk+"' onclick='js.XmlHttp.get(\"city/seeClint?id="+id_precedent+";sk="+sk+"\",this); return false;'>Précédente</li>");
				if (id_suivante)
					$sab("div.clint ul.tabs li.selected").after("<li><a href='#city/seeClint?id="+id_suivante+";sk="+sk+"' onclick='js.XmlHttp.get(\"city/seeClint?id="+id_suivante+";sk="+sk+"\",this); return false;'>Suivante</li>");
			}
		}
	}
}

// Module de méta coalition
unsafeWindow.sab_metacoa = {
	datas : {
		meta_actuelle : false,
		metas : new Array(),
	},
	creer_onglet : function () {
		var reglages = unsafeWindow.sab_options.charger_reglages();
		if (reglages.meta_actif)
			if (($sab("#ghost_pages ul.tabs li a[href^='#ghost/team']").length > 0) && ($sab('#sab_onglet_metacoa').length == 0)) {
				$sab("#ghost_pages ul.tabs li:has(a[href^='#ghost/team'])")
					.before('<li id="sab_onglet_metacoa"><a onclick="sab_metacoa.charger_onglet(); return false;" href="'+window.location.hash+'">MétaCoa</a></li>');
				if (reglages.meta_notif)
					unsafeWindow.sab_metacoa.check_last_msg(function(retour) {
						if ((retour.last_msg) && (retour.last_msg.length > 0)) {
							$sab.each(retour.last_msg,function(x,id) {
								$sab("#sab_onglet_meta_"+id).prepend(unsafeWindow.sab_metacoa.icone_last_msg());
							})
							if ($sab(".sab_img_nv_msg").length == 0)
								$sab("#sab_onglet_metacoa").prepend(unsafeWindow.sab_metacoa.icone_last_msg());
						}
					});
			}
	},
	charger_onglet : function (id_meta) {
		if (typeof(id_meta)!="undefined") {
			unsafeWindow.sab_cache.set_domaine("metacoa");
			unsafeWindow.sab_cache.set_long_term("id",id_meta);
			unsafeWindow.sab_metacoa.datas.meta_actuelle = id_meta;
		}
		if (!unsafeWindow.location.href.match(/go=ghost\//)) {
			unsafeWindow.sab_cache.set_domaine("metacoa");
			unsafeWindow.sab_cache.set("redirect",true);
			unsafeWindow.sab_cache.set_domaine("reglages");
			unsafeWindow.location.href="/#ghost/city?go=ghost/user;sk="+unsafeWindow.sab_cache.get("sk_loaded");
			return false;
		} else {
			unsafeWindow.sab_cache.set("redirect",false);
		}
		// if (($sab("#ghost_pages").length == 0) && unsafeWindow.location.href.match(/go=outside\//)) {
			// $sab("#gameLayout").removeClass("outside").addClass("ghostLayout");
			// $sab("#gameLayout tr").html("").append("<td class='leftPanel'><div id='ghost_pages'><div class='clear'></div></td><td class='rightPanel' style='width:238px;'></td>");
		// }
		$sab("#ghost_pages ul.tabs li.selected").removeClass("selected");
		$sab("#sab_onglet_metacoa").addClass("selected");
		var clear = $("#ghost_pages .clear").first();
		
		while (clear.next().length > 0) clear.next().remove();
		
		// unsafeWindow.sab_cache.set_domaine("metacoa");
		// var id_meta = unsafeWindow.sab_cache.get_long_term("id");
		// if (id_meta) {
			// unsafeWindow.sab_metacoa.charger_infos_coa(false,unsafeWindow.sab_metacoa.completer_onglet);
			// var onglet = $sab("<div id='sab_contenu_metacoa' class='gteam'>Chargement en cours ...<br/></div>");
			// onglet.append("<a onclick='sab_metacoa.quitter_meta();return false;' class='inlineButton'>Quitter ma métacoa</a>");
		// } else {
			// onglet.append("Chargement en cours ...");
		// }
		var onglet = $sab("<div id='sab_contenu_metacoa' class='gteam'>");
		$sab("#ghost_pages .clear").first().after(onglet);
		unsafeWindow.sab_metacoa.charger_infos_coa('full',unsafeWindow.sab_metacoa.completer_onglet);
		return false;
	},
	charger_infos_coa : function (mode,callback) {
		unsafeWindow.sab_serveur.execution_identifee({
			url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
			type : 'POST',
			data : {
				action : "recuperer_infos"+(mode == 'chat_only' ? "_chat" : (mode == 'jump_only' ? "_jump" : ""))
			},
			success : function (retour) {
				if (retour.id_meta) {
					unsafeWindow.sab_metacoa.datas.meta_actuelle = retour.id_meta;
					unsafeWindow.sab_cache.set_domaine("metacoa");
					unsafeWindow.sab_cache.set_long_term("id",retour.id_meta);
					// unsafeWindow.sab_cache.set_long_term("rang",retour.id_rang);
				} else {
					unsafeWindow.sab_cache.set_domaine("metacoa");
					unsafeWindow.sab_cache.set_long_term("id",null);
					unsafeWindow.sab_metacoa.datas.meta_actuelle = false;
					// unsafeWindow.sab_cache.set_long_term("rang",null);
				}
				if (retour.my_metas) {
					unsafeWindow.sab_cache.set_domaine("reglages");
					unsafeWindow.sab_cache.set_long_term("my_metas",retour.my_metas);
				
				}
				if (!(callback === false)) {
					if (mode == 'chat_only') callback = unsafeWindow.sab_metacoa.completer_onglet_avec_coa;
					if ((mode == 'jump_only')) callback = unsafeWindow.sab_metacoa.lister_jumps;
					callback(retour);
				}
			}
		});
	},
	fermer_annonce_generale : function (id) {
		$("#sab_annonce_generale").remove();
		unsafeWindow.sab_cache.set_domaine("reglages");
		unsafeWindow.sab_cache.set_long_term('id_last_news',id);
	},
	completer_onglet : function (retour) {
		var reglages = unsafeWindow.sab_options.charger_reglages();
		$sab('#sab_onglet_metacoa')
			// .prepend(unsafeWindow.sab_metacoa.icone_last_msg(retour.last_msg))
			.parent().css({"margin-bottom":"0px"});
		if (!retour.chat_only) $sab("#sab_contenu_metacoa").html("");
		unsafeWindow.sab_cache.set_domaine("reglages");
		unsafeWindow.sab_cache.set_long_term("my_metas",retour.my_metas);
		if (retour.message_general.id > unsafeWindow.sab_cache.get_long_term('id_last_news')) {
			$sab("#sab_contenu_metacoa").append("<div class='help' id='sab_annonce_generale'><a class='inlineButton' onclick='sab_metacoa.fermer_annonce_generale("+retour.message_general.id+")'>Lu</a> "+retour.message_general.txt+"</div>");
		}
		$sab("#sab_contenu_metacoa").append(unsafeWindow.sab_metacoa.completer_onglet_tabs(retour));
		// $sab("#sab_onglet_meta_"+(retour.id_meta ? retour.id_meta : 0)).addClass("selected");
		if(!retour.jump_only) {
			if (retour.id_meta) {
				unsafeWindow.sab_metacoa.completer_onglet_avec_coa(retour);
			} else {
				unsafeWindow.sab_metacoa.completer_onglet_sans_coa(retour);
			}
		}
	},
	completer_onglet_tabs : function (infos_meta) {
		var retour = $sab("<ul id='sab_barre_onglets_meta'>")
			.addClass("tabs")
			.css("margin-bottom","-36px");
		infos_meta.my_metas.push({
			id : 0,
			nom : "+"
		});
		var last_msg = infos_meta.last_msg ? infos_meta.last_msg : new Array();
		// console.log("last msg : ",infos_meta.last_msg,last_msg);
		unsafeWindow.sab_cache.set_domaine("reglages");
		unsafeWindow.sab_cache.set_long_term("my_metas",infos_meta.my_metas);
		$sab(".sab_img_nv_msg").remove();
		$sab.each(infos_meta.my_metas,function(x,meta) {
			var onglet = $sab('<li id="sab_onglet_meta_'+meta.id+'">');
			onglet.append($sab("<a>")
				.html(meta.nom)
				.attr({
					"onclick" : "sab_metacoa.charger_onglet("+meta.id+"); return false;",
					"href" : window.location.hash
				})
			);
			if (meta.id == infos_meta.id_meta) {
				onglet.addClass("selected");
			} else if ($sab.inArray(""+meta.id,last_msg)>=0) { // on force la comparaison en string car l'array des "last msg" est fait de strings pour éviter array(2) ...
				onglet.prepend(unsafeWindow.sab_metacoa.icone_last_msg());
			}
			retour.append(onglet);
		});
		
		// if (infos_meta.last_msg) {
			// $sab.each(infos_meta.last_msg,function(x,id) {
				// $sab("#sab_onglet_meta_"+id).prepend(unsafeWindow.sab_metacoa.icone_last_msg());
			// })
			// if ($sab(".sab_img_nv_msg").length == 0)
				// $sab("#sab_onglet_metacoa").prepend(unsafeWindow.sab_metacoa.icone_last_msg());
		// }
				
		// $sab("#sab_barre_onglets_meta .selected").removeClass("selected");
		
		return retour;
	},
	construire_ligne_chat : function (info,last_affichage) {
		var ligne = $sab("<li>")
			.append("<em>["+info.date+"]</em> ");
		info.cmd = typeof(info.cmd) == "number" ? info.cmd : 0;
		if (/\[lien=([^\]]+)\]([^\[]+)\[\/lien\]/.test(info.message)) {
			var donnees_lien = info.message.match(/\[lien=([^\]]+)\]([^\[]+)\[\/lien\]/);
			info.message = info.message.replace(donnees_lien[0],"<a href='"+donnees_lien[1]+"'>"+donnees_lien[2]+"</a>");
		}
		if (/\[img=([^\]]+)\]/.test(info.message)) {
			var donnees_img = info.message.match(/\[img=([^\]]+)\]/);
			// info.message = info.message.replace(donnees_lien[0],"<img src='"+donnees_lien[1]+"' style='height:18px' onclick='sab_metacoa.toggle_image(this)' >"+donnees_lien[2]+"</a>");
			info.message = info.message.replace(donnees_img[0],$sab("<span>").append($sab("<a>")
				.attr({
					"href" : donnees_img[1],
					"onmouseout" : "js.HordeTip.hide(event)",
					"onmouseover" : "js.HordeTip.showSpecialTip(this, 'simpleTip', '', '<img src=\""+donnees_img[1]+"\"/>', event);",
					"onclick" : "window.open(\""+donnees_img[1]+"\",'_blank');"
				})
				.css({
					"cursor" : "pointer"
				})
				.append("<img src='http://guizmus.fr/img/photo.png' style='height:18px'>")
				).html()
			);
		}
		if (info.cmd >= 100) ligne.addClass("CL_AttackEvent");
		$sab.each(this.emotes.filter(function(emote){return (info.cmd == emote.id || (!info.cmd && (emote.id == 0)))}), function(x,emote) {
			if (!emote.aff) {
				ligne.append("<img src='"+emote.img+"'/> <strong>"+info.username+"</strong> <strong>:</strong> « "+info.message+" »");
			} else {
				ligne.append(emote.aff(info,emote));
			}
		});
		ligne.filter(function(x){if (info.timestamp > last_affichage) return true; return false;})
				.addClass("recent")
			.end();
		return ligne;
	},
	emotes : new Array(
		{id:0, img : "/gfx/forum/smiley/h_chat.gif", aff :function(info,emote) {return "<img src='"+emote.img+"'/> <strong>"+info.username+" :</strong> « "+info.message+" »";},patern : 'normal'},
		{id:10, img : "/gfx/forum/smiley/h_arrow.gif", patern : "fleche"},
		{id:6, img : "/gfx/forum/smiley/h_warning.gif", patern : "attention"},
		{id:1, aff :function(info) {return " « <i>"+info.username+" "+info.message+"</i> »"}},
		{id:3, aff :function(info) {return " <strong>"+info.username+" : "+info.message+"</strong>"}},
		{id:2, img : "http://mush.twinoid.com/img/icons/ui/discrete.png", aff :function(info,emote) {return "<img src='"+emote.img+"'/> ° * "+info.username+" <strong>:</strong> <i>"+info.message+"</i> * °"}, patern : "chuchoter"},
		{id:5, img : "/gfx/forum/smiley/h_zombie.gif", patern : "zombie"},
		{id:9, img : "/gfx/forum/smiley/h_ghoul.gif", patern : "goule"},
		{id:17, img : "/gfx/forum/smiley/h_hunter.gif", patern : "ermite"},
		{id:18, img : "/gfx/forum/smiley/h_tamer.gif", patern : "apprivoiseur"},
		{id:19, img : "/gfx/forum/smiley/h_tech.gif", patern : "technicien"},
		{id:20, img : "/gfx/forum/smiley/h_ranger.gif", patern : "eclaireur"},
		{id:21, img : "/gfx/forum/smiley/h_collec.gif", patern : "fouineur"},
		{id:22, img : "/gfx/forum/smiley/h_guard.gif", patern : "gardien"},
		{id:13, img : "/gfx/forum/smiley/h_smile.gif", patern : ":)"},
		{id:14, img : "/gfx/forum/smiley/h_sad.gif", patern : ":("},
		{id:15, img : "/gfx/forum/smiley/h_surprise.gif", patern : ":O"},
		{id:16, img : "/gfx/forum/smiley/h_lol.gif", patern : ":D"},
		{id:7, img : "/gfx/forum/smiley/h_wink.gif", patern : ";)"},
		{id:8, img : "/gfx/forum/smiley/h_rage.gif", patern : "><"},
		{id:23, img : "/gfx/forum/smiley/h_sick.gif", patern : ":()"},
		{id:4, img : "/gfx/forum/smiley/h_sleep.gif", patern : "dormir"},
		{id:11, img : "/gfx/forum/smiley/h_calim.gif", patern : "calimero"},
		{id:24, img : "http://data.hordes.fr/gfx/icons/item_pet_cat.gif", patern : "miaou"},
		{id:12, img : "/gfx/forum/smiley/h_ban.gif", patern : "bannir"},
		{id:100, img : "http://mush.twinoid.com/img/icons/ui/more.png", aff:function(info,emote) {return "<img src='"+emote.img+"'/> <strong><u>"+info.message+"</u> a rejoint la MétaCoa !</strong>"}},
		{id:101, img : "http://mush.twinoid.com/img/icons/ui/less.png", aff:function(info,emote) {return "<img src='"+emote.img+"'/> <strong><u>"+info.message+"</u> a quitté la MétaCoa !</strong>"}},
		{id:102, img : "/img/icons/r_heroac.gif", aff:function(info,emote) {return "<img src='"+emote.img+"'/> <strong><u>"+info.message+"</u> devient le nouveau leader de la MétaCoa !</strong>"}},
		{id:103, img : "/gfx/forum/smiley/h_human.gif", aff:function(info,emote) {return "<img src='"+emote.img+"'/> <strong>Nouvelle candidature : "+info.message+"</strong>"}},
		{id:104, img : "/gfx/forum/smiley/h_human.gif", aff:function(info,emote) {return "<img src='"+emote.img+"'/> <strong>Nouvelle recommandation de Jump : "+info.message+"</strong>"}},
		{id:105, img : "/img/icons/r_armag.gif", aff:function(info,emote) {
			var details_msg = info.message.split(',');
			return "<img src='"+emote.img+"'/> Pouf le <strong>"+details_msg[1]+"</strong> ! On dirait bien que <strong>"+details_msg[0]+"</strong> l'a viré !";
		}}
	),
	ajoute_emote_shoutbox : function (admin, patern) {
		var clef = admin ? "#sab_input_shoutbox_admin" : "#sab_input_shoutbox";
		$sab(clef).prop('value','/'+patern+' '+$(clef).prop('value'));
		$sab(clef).focus();
	},
	maj_apercu_emote : function(admin, id, maj) {
		
		var clef = admin ? "#sab_apercu_emote_admin" : "#sab_apercu_emote";
		if (typeof($sab(clef)[0].current) == "undefined")
			$sab(clef)[0].current = 0;
		if (id === false)
			var id = $sab(clef)[0].current;
		
		$sab.each(this.emotes.filter(function(emote){return (id == emote.id)}),function (x,emote) {
			// console.log(emote);
			$sab(clef).attr("src",emote.img);
		});
		if (maj === true) {
			$sab(clef)[0].current = id;
			$sab(clef).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
			$sab(admin ? "#sab_input_shoutbox_admin" : "#sab_input_shoutbox").focus();
		}
	},
	menu_chat : function (admin) {
		var form = $sab("<form>")
			.attr("onsubmit","sab_metacoa.envoyer_message("+(admin ? "true" : "false")+");return false;")
			.append("<input type='submit' value='Envoyer' name='submit' class='button'>")
			.append($sab("<input type='text' id='sab_input_shoutbox"+(admin ? "_admin" : "")+"' value='' class='field' name='message' maxlength='255'>")
				.css("width","270px")
			).append($sab("<img id='sab_apercu_emote"+(admin ? "_admin" : "")+"' src='/gfx/forum/smiley/h_chat.gif' style='float:left;width:18px;height:18px;margin-right:2px'/>")
				// .attr("current","0")
			);
		
		var menu_emotes = $sab("<div>").addClass("critical");
		$sab.each(sab_metacoa.emotes.filter(function(emote){return (typeof(emote.patern) != "undefined")}),function (x,emote) {
			var icone = $sab("<span>"+(emote.img ? "<img src='"+emote.img+"' style='width:20px;height:20px' title=\"/"+emote.patern+"\"/>" : emote.txt)+"</span>")
			icone.css({
				"display" : "inline-block",
				"width" : "20px",
				"height" : "20px",
				"magin-right" : "5px",
				"cursor" : "pointer",
				"background-image": 'url("/gfx/design/button.gif")',
				'border': '1px solid black',
				"vertical-align": "top",
			}).attr({
				// "onclick" : "sab_metacoa.ajoute_emote_shoutbox(false,\""+emote.patern+"\");sab_metacoa.maj_apercu_emote(false,"+emote.id+",true)",
				"onclick" : "sab_metacoa.maj_apercu_emote("+(admin ? "true" : "false")+","+emote.id+",true)",
				"onmouseover" : "sab_metacoa.maj_apercu_emote("+(admin ? "true" : "false")+","+emote.id+",false)",
				"onmouseout" : "sab_metacoa.maj_apercu_emote("+(admin ? "true" : "false")+",false,false)",
			})
			if(emote.id=='13') menu_emotes.append("<br/>");
			menu_emotes.append(icone);
		});
		return [form,menu_emotes];
	},
	completer_onglet_avec_coa : function (infos_meta) {
		// console.log("complétion avec meta : ",infos_meta);
		unsafeWindow.sab_cache.set_domaine("metacoa");
		var last_affichage = infos_meta.last_affichage;
		// var last_affichage = unsafeWindow.sab_cache.get_long_term("dernier_affichage");
		// unsafeWindow.sab_cache.set_long_term("dernier_affichage",infos_meta.last_msg);
		$sab("#sab_onglet_meta_"+infos_meta.id_meta+" .sab_img_nv_msg").remove();
		if (infos_meta.chat_only) {
			var historique_chat = $sab("#sab_metacoa_shoutbox");
			if (historique_chat.length > 0) {
				historique_chat.children().remove();
				$sab.each(infos_meta.shoutbox,function(x,info) {
					historique_chat.append(unsafeWindow.sab_metacoa.construire_ligne_chat(info,last_affichage));
				});
			}
			var historique_chat = $sab("#sab_metacoa_shoutbox_admin");
			if (historique_chat.length > 0) {
				historique_chat.children().remove();
				$sab.each(infos_meta.shoutbox_admin,function(x,info) {
					historique_chat.append(unsafeWindow.sab_metacoa.construire_ligne_chat(info,last_affichage));
				});
			}
		} else {
			var onglet = $sab("#sab_contenu_metacoa");
			// onglet.html("");
			var titre = $sab("<h2>");
			titre.append("MétaCoa [<span id='sab_metacoa_name' style='color:white !important'>"+infos_meta.nom_meta+"</span>]");
			if (infos_meta.responsable)
				titre.append(" <a class='inlineButton' onclick='sab_metacoa.changer_nom_coa()'>Modifier</a>");
			onglet.append(titre);
			onglet.append("<div class='clear'></div>");
			
			if (infos_meta.news != "") {
				var news = $sab("<div class='critical'>"+infos_meta.news+"</div>");
				if (infos_meta.id_rang<3)
					news.append(" <a class='inlineButton' onclick='sab_metacoa.changer_news()'>Modifier</a>");
				onglet.append(news);
				onglet.append("<div class='clear'></div>");
			} else {
				if (infos_meta.id_rang<3) {
					var news = $sab("<div class='critical'>"+infos_meta.news+"</div>");
					news.append(" <a class='inlineButton' onclick='sab_metacoa.changer_news()'>Choisir la news de la MétaCoa</a>");
					onglet.append(news);
					onglet.append("<div class='clear'></div>");
				}
			}
			
			var left = $sab("<div class='left'>")
				.css({
					"margin-top" : "0px"
				});
			left.append("<h2>Shoutbox de la MétaCoa</h2>")
			left.append($sab("<a>actualiser</a>")
				.attr({
					"onmouseout" : "js.HordeTip.hide(event)",
					"onmouseover" : "js.HordeTip.showSpecialTip(this, 'simpleTip', '', 'Cliquez sur ce lien pour actualiser le chat.', event);",
					"onclick" : "sab_metacoa.charger_infos_coa('chat_only');return false;",
					"href" :  unsafeWindow.location.hash,
					"class" : "refresh"
					
				}))
			
			
			var menu_chat = unsafeWindow.sab_metacoa.menu_chat(false)
			left.append(menu_chat[0]);
			left.append(menu_chat[1]);
			var historique_chat = $sab("<ul class='logs' id='sab_metacoa_shoutbox'>");
			$sab.each(infos_meta.shoutbox,function(x,info) {
				historique_chat.append(unsafeWindow.sab_metacoa.construire_ligne_chat(info,last_affichage));
			});
			left.append(historique_chat);
			
			onglet.append(left);
			
			var right = $sab("<div class='right' id='sab_metacoa_right'>")
				.css({
					"overflow-y" : "scroll",
					"height" : "500px",
					"width": "230px",
					"margin-top" : "0px"
				});
			
			var news = $sab("<div class='tid_streamList'>");
			if (infos_meta.responsable)
				news.append("<div class='tid_streamItem' style='width:95% !important;text-align:center'>Vous êtes le responsable de cette Métacoa.</div>");
			right.append(news);
			
			var titre_membres = $sab("<h2>Membres</h2>");
			var membres = $sab("<ul id='sab_metacoa_membres' style='display:inline-block;width:180px;max-height: 320px !important;'>");
			if (infos_meta.membres)
				$sab.each(infos_meta.membres,function(x,membre) {
					var nv_membre = $("<li style='height:42px !important; width: 178px;'>");
					nv_membre.append($("<div class='name'>")
						.append("<img class='status' alt='' src='/gfx/icons/small_"+(membre.actif ? "on" : "off")+"line.gif' title='Dernière connexion le "+membre.derniere_co+"'/>")
						.append("<a target='_blank' href='/#ghost/city?go=ghost/user?uid="+membre.uid+"'>"+membre.username+"</a>")
						.append(" <em"+(((infos_meta.id_rang < 2) && (membre.uid != infos_meta.id_responsable)) ? " style='cursor:pointer;' onclick='sab_metacoa.modifier_rang("+membre.uid+")' title='Changer le rang'" : "")+">["+membre.rang+"]"+(((infos_meta.id_rang < 2) && (membre.uid != infos_meta.id_responsable)) ? "<img src='/img/icons/r_heroac.gif' style='cursor:pointer;' onclick='sab_metacoa.nommer_responsable("+membre.uid+")' title='Nommer responsable' /><img src='/gfx/icons/small_fight.gif' title='Renvoyer' onclick='sab_metacoa.renvoyer_membre("+membre.uid+")' style='cursor:pointer;'>" : "")+"</em>")
					);
					membres.append(nv_membre);
				});
			if ((membres.children().length == 1) || !infos_meta.responsable)
				titre_membres.append($sab("<a class='inlineButton' onclick='sab_metacoa.quitter_meta()'>Quitter</a>")
					.css({
						"float": "right",
						"width": "60px",
						"margin": "0px",
						"padding": "1px 2px",
						"height": "15px",
						"position": "relative",
						"top": "-5px",
						"left": "-5px",
					})
				);
			right.append(titre_membres);
			right.append(membres);
			onglet.append(right);
			
			if (infos_meta.id_rang<3) {
				// partie admin
				onglet.append("<div class='clear'></div>");
				var admin = $sab('<div style="background-color: #5C2B20;border-radius: 10px;margin:20px 10px 5px 5px;padding: 5px;"></div>').append('<div class="critical" style="margin-bottom:10px">Administration de la MétaCoa</div>');
				var left = $sab("<div class='left'></div>")
					.css({
						"margin-top" : "0px"
					});
				// left.append($sab("<form>")
					// .attr("onsubmit","sab_metacoa.envoyer_message(true);return false;")
					// .append("<input type='submit' value='Envoyer' name='submit' class='button'>")
					// .append("<input type='text' id='sab_input_shoutbox_admin' value='' class='field' name='message' maxlength='255'>")
				// );
				
				var menu_chat = unsafeWindow.sab_metacoa.menu_chat(true)
				left.append(menu_chat[0]);
				left.append(menu_chat[1]);
				var historique_chat = $sab("<ul class='logs' id='sab_metacoa_shoutbox_admin'>");
				$sab.each(infos_meta.shoutbox_admin,function(x,info) {
					historique_chat.append(unsafeWindow.sab_metacoa.construire_ligne_chat(info,last_affichage));
				});
				left.append(historique_chat);
				
				admin.append(left);
				
				var right = $sab("<div class='right' style='overflow-y:scroll;height: 440px !important;'></div>");
				
				var recrutements_actifs = $sab("<div>Recrutements : </div>")
					.append($sab("<a class='inlineButton'>"+(infos_meta.recrutement_actif ? "Ouverts" : "Fermés")+"</a>")
						.attr({
							'onclick' : 'sab_metacoa.changer_statut_recrutement(this)',
							"onmouseout" : "js.HordeTip.hide(event)",
							"onmouseover" : "js.HordeTip.showHelp(this,'Si vous ouvrez vos recrutements, vous pourrez recevoir des candidatures de joueurs intéressés par votre annonce.')",
							
						})
						.css({
							'cursor' : 'pointer'
						})
					);
				right.append(recrutements_actifs);
				var annonce_recrutement = $("<div>")
					.html("Annonce de recrutement ")
					.append($sab("<img/>")
						.attr({
							"src" : "/img/icons/r_forum.gif",
							"onmouseout" : "js.HordeTip.hide(event)",
							"onmouseover" : "js.HordeTip.showHelp(this,'<b>Annonce actuelle :</b><br/>"+infos_meta.annonce+"')",
							"style" : "cursor : pointer"
						}))
					.append($sab("<img/>")
						.attr({
							"src" : "http://twinoid.com/img/icons/edit.png",
							"onclick" : "sab_metacoa.modifier_annonce()",
							"onmouseout" : "js.HordeTip.hide(event)",
							"onmouseover" : "js.HordeTip.showHelp(this,'Modifier l&apos;annonce')",
							"style" : "cursor : pointer"
						}));
				right.append(annonce_recrutement);
				
				var titre_candidats = $sab("<h2>Candidats</h2>");
				titre_candidats.append($sab("<a>")
					.attr({
						"href" : "#",
						"onclick" : "return false;",
						"onmouseout" : "js.HordeTip.hide(event)",
						"onmouseover" : "js.HordeTip.showHelp(this,\"Les candidats ci dessous sont issus des candidatures spontanées des joueurs. Vous pouvez inviter un joueur à rejoindre votre MétaCoa directement depuis son âme.\");"
					})
					.addClass("helpLink")
					.append("<img src='/gfx/loc/fr/helpLink.gif' alt=''/>"));
				var candidats = $sab("<ul id='sab_metacoa_candidats' style='display:inline-block;width:180px;max-height:320px !important;'>");
				if (infos_meta.candidats)
					$sab.each(infos_meta.candidats,function(x,candidat) {
						var nv_candidat = $("<li style='height:42px !important; width: 178px;'>");
						var name = $("<div class='name'>");
						name.append("<img class='status' alt='' src='/gfx/icons/small_"+(candidat.actif ? "on" : "off")+"line.gif' title='Dernière connexion le "+candidat.derniere_co+"'/>")
							.append("<a target='_blank' href='/#ghost/city?go=ghost/user?uid="+candidat.uid+"'>"+candidat.username+(candidat.script ? "" : " [<img src='/gfx/icons/item_lock.gif' title='Script non installé'/>]")+"</a>");
						if (candidat.invitation) {
							name.append(" <img src='http://twinoid.com/img/icons/remove.png' style='cursor:pointer' onclick='sab_metacoa.annuler_invitation("+candidat.uid+"); return false;' title='Annuler l&apos;invitation'/>");
							nv_candidat.append(name);
							nv_candidat.append("<div class='game'><b>Invitation en attente</b></div>");
						} else {
							name.append(" <img src='http://twinoid.com/img/icons/done.png' style='cursor:pointer' onclick='sab_metacoa.repondre_candidature(true,"+candidat.uid+"); return false;' title='Accepter la candidature'/><img src='http://twinoid.com/img/icons/remove.png' style='cursor:pointer' onclick='sab_metacoa.repondre_candidature(false,"+candidat.uid+"); return false;' title='Refuser la candidature'/>");
							nv_candidat.append(name);
							nv_candidat.append("<div class='game'><em>"+candidat.texte+"</em></div>");
						}
						candidats.append(nv_candidat);
					});
				right.append(titre_candidats);
				right.append(candidats);
				
				admin.append(right);
				admin.append("<div class='clear'></div>");
				onglet.append(admin);
			}
			
		}
	},
	completer_onglet_sans_coa : function (infos) {
		var onglet = $sab("#sab_contenu_metacoa");
		// onglet.html("");
		var titre = $sab("<h2>Rejoindre une MétaCoa</h2>")
				// .css({"margin-bottom":"-35px"});
		onglet.append(titre);
		onglet.append("<br/>");
		
		if (infos.candidatures.length > 0) {
			var liste_candidatures = $sab("<table class='table' style='text-align:center;width :628px !important'>");
			liste_candidatures.append("<tr><th>Nom de la MétaCoa</th><th>Dernier changement</th><th>Etat de votre candidature</th><th></th></tr>");
			var ids_candidature = new Array();
			$sab.each(infos.candidatures,function(x,candidature) {
				ids_candidature.push(candidature.id_coa);
				var ligne_candidature = $sab("<tr>");
				ligne_candidature.append("<td><em>"+candidature.nom+"</em></td>");
				ligne_candidature.append("<td>"+candidature.maj+"</td>");
				var texte_etape = '';
				var action = null;
				switch (candidature.etape) {
					case 1 : 
						texte_etape = "Candidature soumise à la MétaCoa, en attente.";
						action = $sab("<td>")
							.append($sab("<img/>")
								.attr({
									"src" : "/img/icons/r_forum.gif",
									"style" : "cursor:pointer",
									"onmouseout" : "js.HordeTip.hide(event)",
									"onmouseover" : "js.HordeTip.showHelp(this,'<b>Texte de candidature actuel :</b><br/>"+candidature.texte+"<br/><b>Cliquez pour modifier.</b>')",
									"onclick" : "sab_metacoa.candidater("+candidature.id_coa+");"
								}))
							.append($sab("<img/>")
								.attr({
									"src" : "http://twinoid.com/img/icons/remove.png",
									"style" : "cursor:pointer",
									"onmouseout" : "js.HordeTip.hide(event)",
									"onmouseover" : "js.HordeTip.showHelp(this,'Retirer ma candidature')",
									"onclick" : "sab_metacoa.retirer_candidature("+candidature.id_coa+")"
								}));
						break;
					case 2 :
						texte_etape = "Candidature soumise à la MétaCoa, refusée.";
						action = $sab("<td>")
							.append($sab("<img/>")
								.attr({
									"src" : "http://twinoid.com/img/icons/edit.png",
									"style" : "cursor:pointer",
									"onmouseout" : "js.HordeTip.hide(event)",
									"onmouseover" : "js.HordeTip.showHelp(this,'Candidater de nouveau')",
									"onclick" : "sab_metacoa.candidater("+candidature.id_coa+");"
								}))
							.append($sab("<img/>")
								.attr({
									"src" : "http://twinoid.com/img/icons/remove.png",
									"style" : "cursor:pointer",
									"onmouseout" : "js.HordeTip.hide(event)",
									"onmouseover" : "js.HordeTip.showHelp(this,'Supprimer')",
									"onclick" : "sab_metacoa.retirer_candidature("+candidature.id_coa+")"
								}));
						break;
					case 3 :
						texte_etape = "Invitation de la MétaCoa."; 
						action = $sab("<td>")
							.append($sab("<img/>")
								.attr({
									"src" : "http://twinoid.com/img/icons/done.png",
									"style" : "cursor:pointer",
									"onmouseout" : "js.HordeTip.hide(event)",
									"onmouseover" : "js.HordeTip.showHelp(this,'Accepter')",
									"onclick" : "sab_metacoa.rejoindre_meta("+candidature.id_coa+");"
								}))
							.append($sab("<img/>")
								.attr({
									"src" : "http://twinoid.com/img/icons/remove.png",
									"style" : "cursor:pointer",
									"onmouseout" : "js.HordeTip.hide(event)",
									"onmouseover" : "js.HordeTip.showHelp(this,'Refuser')",
									"onclick" : "sab_metacoa.retirer_candidature("+candidature.id_coa+")"
								}));
						break;
				}
				ligne_candidature.append("<td>"+texte_etape+"</td>");
				ligne_candidature.append(action);
				liste_candidatures.append(ligne_candidature);
			});
			onglet.append(liste_candidatures);
		}
		var liste_metas = $sab("<table class='table' style='text-align:center;width :628px !important'>");
		liste_metas.append("<tr><th>Nom</th><th>Responsable</th><th>Membres</th><th>Annonce</th><th></th></tr>");
		// console.log("ids candidatures : ",ids_candidature);
		// console.log("infos.metas : ",infos.metas);
		unsafeWindow.sab_cache.set_domaine("reglages");
		// console.log("my_metas : ",unsafeWindow.sab_cache.get_long_term("my_metas"));
		$sab.each(infos.metas,function(x,meta) {
			unsafeWindow.sab_cache.set_domaine("reglages");
			// console.log($sab(ids_candidature).filter(function(x,id) {return (id == meta.id_coa)}));
			if (($sab(ids_candidature).filter(function(x,id) {return (id == meta.id_coa)}).length == 0) && ($sab(unsafeWindow.sab_cache.get_long_term("my_metas")).filter(function(x,m) {return (m.id == meta.id_coa)}).length == 0)) {
				// console.log("affichage de ",meta);
			// inArray(meta.id_coa,unsafeWindow.sab_cache.get("my_metas"))<0)){
				var ligne_meta = $sab("<tr>");
				ligne_meta.append("<td><em>"+meta.nom+"</em></td>");
				ligne_meta.append("<td><a target='_blank' href='/#ghost/city?go=ghost/user?uid="+meta.id_responsable+"'>"+meta.responsable+"</a></td>");
				ligne_meta.append("<td>"+meta.nombre_membres+"</td>");
				ligne_meta.append("<td>"+meta.annonce+"</td>");
				// ligne_meta.append($sab("<td style='vertical-align:middle'></td>")
					// .append($sab("<img/>")
						// .attr({
							// "src" : "http://twinoid.com/img/icons/done.png",
							// "onmouseout" : "js.HordeTip.hide(event)",
							// "onmouseover" : "js.HordeTip.showHelp(this,'Candidature en cours ...')"
						// }))
				// );
				ligne_meta.append("<td style='vertical-align:middle'><a class='inlineButton' onmouseout='js.HordeTip.hide(event)' onmouseover='js.HordeTip.showHelp(this,&apos;Postuler&apos;)' onclick='sab_metacoa.candidater("+meta.id_coa+");' style='width:10p;'>+</a></td>");
				liste_metas.append(ligne_meta);
			}
		});
		// console.log("liste metas",liste_metas.children("tr"));
		if ($sab("tr",liste_metas).length > 1){
			onglet.append(liste_metas);
			onglet.append("<br/>");
		}
		onglet.append($sab("<a>Créer ma méta !</a>")
			.attr({
				'onclick' : 'sab_metacoa.creer_meta();return false;',
				'class' : 'inlineButton',
				"onmouseout" : "js.HordeTip.hide(event)",
				"onmouseover" : "js.HordeTip.showHelp(this,'Attention, vos candidatures et invitations actuelles à d&#039;autres MétaCoa seront supprimées !')"
			})
		);
	},
	retirer_candidature : function (id_meta) {
		unsafeWindow.sab_serveur.execution_identifee({
			url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
			type : 'POST',
			data : {
				action : "decandidater",
				id_meta : id_meta
			},
			success : function (retour) {
				unsafeWindow.sab_metacoa.charger_onglet();
			}
		});
	},
	candidater : function (id_meta) {
		var texte = prompt("Une petite note d'accompagnement avec votre candidature?");
		if (texte)
			unsafeWindow.sab_serveur.execution_identifee({
				url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
				type : 'POST',
				data : {
					action : "candidater",
					id_meta : id_meta,
					texte : texte
				},
				success : function (retour) {
					unsafeWindow.sab_metacoa.charger_onglet();
				}
			});
	},
	repondre_candidature : function (reponse,id_candidat) {
		unsafeWindow.sab_serveur.execution_identifee({
			url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
			type : 'POST',
			data : {
				action : "valider_candidature",
				id_candidat : id_candidat,
				reponse : reponse
			},
			success : function (retour) {
				unsafeWindow.sab_metacoa.charger_onglet();
				// if (retour.id_meta) {
					// unsafeWindow.sab_cache.set_domaine("metacoa");
					// unsafeWindow.sab_cache.set_long_term("id",retour.id_meta);
					// unsafeWindow.sab_metacoa.charger_onglet();
				// }
			}
		});
	},
	rejoindre_meta : function (id_meta) {
		if (confirm("Voulez vous rejoindre cette MétaCoa ?"))
			unsafeWindow.sab_serveur.execution_identifee({
				url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
				type : 'POST',
				data : {
					action : "rejoindre",
					id_meta : id_meta
				},
				success : function (retour) {
					if (retour.id_meta) {
						unsafeWindow.sab_cache.set_domaine("metacoa");
						unsafeWindow.sab_cache.set_long_term("id",retour.id_meta);
						// unsafeWindow.sab_metacoa.datas.meta_actuelle = retour.id_meta;
						unsafeWindow.sab_metacoa.charger_onglet(retour.id_meta);
					}
				}
			});
	},
	envoyer_message : function (admin) {
		var message = $sab.trim($sab("#sab_input_shoutbox"+(admin ? "_admin" : ""))[0].value);
		$sab("#sab_input_shoutbox"+(admin ? "_admin" : ""))[0].value = "";
		var id = $sab("#sab_apercu_emote"+(admin ? "_admin" : ""))[0].current;
		var emote_trouvee = {id:0};
		$sab.each(this.emotes.filter(function(emote){return (id == emote.id)}),function (x,emote) {
			emote_trouvee = emote;
		});
		if (emote_trouvee.id > 0)
			message = "/"+emote_trouvee.patern+" "+message;
		if ((message != "") && (unsafeWindow.sab_metacoa.locked != true)) {
			unsafeWindow.sab_metacoa.locked = true;
			unsafeWindow.sab_serveur.execution_identifee({
				url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
				type : 'POST',
				data : {
					action : "envoyer_message",
					message : message,
					admin : admin ? "true" : "false"
				},
				success : function (retour) {
					unsafeWindow.sab_metacoa.locked = false;
					unsafeWindow.sab_metacoa.charger_infos_coa('chat_only');
				}
			});
		}
	},
	modifier_annonce : function () {
		var texte = prompt("Veuillez saisir votre nouvelle annonce de recrutement. Laissez vide pour annuler.");
		if (texte.length > 0) 
			unsafeWindow.sab_serveur.execution_identifee({
				url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
				type : 'POST',
				data : {
					action : "modifier_annonce_recrutement",
					texte : texte
				},
				success : function (retour) {
					unsafeWindow.sab_metacoa.charger_onglet();
				}
			});
	},
	changer_news : function () {
		var texte = prompt("Veuillez saisir le contenu de votre news. Laissez vide pour annuler.");
		if (texte && texte.length > 0) 
			unsafeWindow.sab_serveur.execution_identifee({
				url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
				type : 'POST',
				data : {
					action : "modifier_news",
					texte : texte
				},
				success : function (retour) {
					unsafeWindow.sab_metacoa.charger_onglet();
				}
			});
	
	},
	changer_statut_recrutement : function (em) {
		if ($sab(em).html() == "Ouverts") {
			unsafeWindow.sab_serveur.execution_identifee({
				url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
				type : 'POST',
				data : {
					action : "changer_statut_recrut",
					statut : 0
				},
				success : function (retour) {
					unsafeWindow.sab_metacoa.charger_onglet();
				}
			});
		} else  {
			unsafeWindow.sab_serveur.execution_identifee({
				url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
				type : 'POST',
				data : {
					action : "changer_statut_recrut",
					statut : 1
				},
				success : function (retour) {
					unsafeWindow.sab_metacoa.charger_onglet();
				}
			});
		
		}
	},
	creer_meta : function () {
		unsafeWindow.sab_serveur.execution_identifee({
			url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
			type : 'POST',
			data : {
				action : "creer_meta"
			},
			success : function (retour) {
				if (retour.id_meta) {
					unsafeWindow.sab_cache.set_domaine("metacoa");
					unsafeWindow.sab_cache.set_long_term("id",retour.id_meta);
					unsafeWindow.sab_metacoa.charger_onglet(retour.id_meta);
				}
			}
		});
	},
	quitter_meta : function () {
		if (unsafeWindow.confirm("Etes vous sûr de vouloir quiter votre MétaCoa ?"))
			unsafeWindow.sab_serveur.execution_identifee({
				url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
				type : 'POST',
				data : {
					action : "quitter"
				},
				success : function (retour) {
					if (retour.success) {
						unsafeWindow.sab_cache.set_domaine("metacoa");
						unsafeWindow.sab_cache.set_long_term("id",null);
						unsafeWindow.sab_metacoa.charger_onglet(0);
					}
				}
			});
	},
	changer_nom_coa : function () {
		var nouveau_nom = prompt("Veuillez choisir un nouveau nom pour la MétaCoa. Laissez vide pour annuler.");
		if (nouveau_nom.length > 0) 
			unsafeWindow.sab_serveur.execution_identifee({
				url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
				type : 'POST',
				data : {
					action : "changer_nom",
					nom : nouveau_nom
				},
				success : function (retour) {
					unsafeWindow.sab_metacoa.charger_onglet();
				}
			});
	},
	modifier_rang : function (id_user) {
		unsafeWindow.sab_serveur.execution_identifee({
			url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
			type : 'POST',
			data : {
				action : "modifier_rang",
				membre : id_user,
				responsable : "non"
			},
			success : function (retour) {
				if (retour.success) {
					unsafeWindow.sab_metacoa.charger_onglet();
				}
			}
		});
		
	},
	nommer_responsable : function (id_user) {
		if (confirm("Voulez-vous confier la gestion de la MétaCoa à ce membre ? Cette opération est irréversible."))
			unsafeWindow.sab_serveur.execution_identifee({
				url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
				type : 'POST',
				data : {
					action : "modifier_rang",
					membre : id_user,
					responsable : "oui"
				},
				success : function (retour) {
					if (retour.success) {
						unsafeWindow.sab_metacoa.charger_onglet();
					}
				}
			});
		
	},
	renvoyer_membre : function (id_user) {
		if (confirm("Voulez-vous renvoyer ce membre de la MétaCoa ? Cette opération est irréversible."))
			unsafeWindow.sab_serveur.execution_identifee({
				url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
				type : 'POST',
				data : {
					action : "renvoyer",
					membre : id_user
				},
				success : function (retour) {
					if (retour.success) {
						unsafeWindow.sab_metacoa.charger_onglet();
					}
				}
			});
		
	},
	completer_ame : function () {
		var retour = unsafeWindow.location.href.match(/ghost\/user\?uid=([0-9]+);/);
		var id_ame = retour[1];
		unsafeWindow.sab_serveur.execution_identifee({
			url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
			type : 'POST',
			data : {
				action : "infos_ame",
				id_ame : id_ame,
			},
			success : function (retour) {
				// console.log("completion ame sur :",retour);
				var cadre_meta = $sab("<div class='score' id='sab_metacoa_invit'></div>");
				
				if (retour.metas_ame.length > 0) {
					var table_metas = $sab("<table>");
					table_metas.append("<tr><th>MétaCoa</th><th></th>");
					
					$sab.each(retour.metas_ame,function(x,meta) {
						var ligne_meta = $sab("<tr>");
						ligne_meta.append("<td>"+meta.nom+"</td>");
						var cas = 0;
						if (meta.ame_rang < 4) { // si il est dans la méta
							cas = ((meta.my_rang == 4) && (meta.ouvert == 1)) ? 1 : 2;
						} else {
							cas = (meta.my_rang < 3) ? 3 : 4;
						}
						// cas 1 : candidature possible
						// cas 2 : candidature impossible
						// cas 3 : invitation possible
						// cas 4 : invitation impossible
						var explication = "";
						var onclick = "";
						switch (cas) {
							case 1 :
								onclick="sab_metacoa.candidater("+meta.id+")";
								break;
							case 2 : 
								if (meta.ame_rang < 4) {
									explication = "Vous êtes aussi un membre de cette MétaCoa.";
								} else {
									explication = "Cette MétaCoa a fermé ses recrutements actuellement.";
								}
								break;
							case 3 :
								onclick="sab_metacoa.inviter("+id_ame+","+meta.id+");";
								break;
							case 4 : 
								explication = "Vous n'avez pas un rang assez élevé dans cette MétaCoa pour inviter des membres";
								break;
							default : explication = "";
						}
						ligne_meta.append($sab("<td>")
							.append($sab("<a>")
								.html((cas <=2) ? "Postuler" : "Inviter")
								.addClass("button")
								.css({
									"text-align" : "center",
									"width" : "60px"
								})
								.filter(function(x){return ((cas == 2) || (cas == 4))})
									.attr({
										"onmouseover" : "js.HordeTip.showHelp(this,"+explication+")",
										"onmouseout" : "js.HordeTip.hide()",
									})
									.addClass("off")
								.end()
								.filter(function(x){return ((cas == 1) || (cas == 3))})
									.attr({
										"onclick" : onclick
									})
								.end()
							)
						);
						// console.log(ligne_meta,cas);
						if (cas > 0)
							table_metas.append(ligne_meta);
					});
					if($sab("tr",table_metas).length>1)
						cadre_meta.append(table_metas);
				}
				if(cadre_meta.children().length>0)
					$sab(".guser .right").first().prepend(cadre_meta);
			}
		});
	},
	inviter : function (id_user,id_meta) {
		unsafeWindow.sab_metacoa.datas.meta_actuelle = id_meta;
		unsafeWindow.sab_serveur.execution_identifee({
			url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
			type : 'POST',
			data : {
				action : "invitation",
				id_invit : id_user,
				nom_user : $("span[onedit*='account?open=name']").text().trim()
			},
			success : function (retour) {
				$sab('#sab_metacoa_invit .inlineButton').append("<img src='http://twinoid.com/img/icons/done.png' title='Invitation envoyée !'/>");
				$sab('#sab_metacoa_invit .inlineButton').attr({"onclick":""});
			}
		});
	},
	annuler_invitation : function (id_user) {
		unsafeWindow.sab_serveur.execution_identifee({
			url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
			type : 'POST',
			data : {
				action : "annuler_invitation",
				id_invit : id_user
			},
			success : function (retour) {
				unsafeWindow.sab_metacoa.charger_onglet();
			}
		});
	},
	lister_jumps : function () {
		if (($sab("#ghostImg img[src='http://data.hordes.fr/gfx/loc/fr/ghost_red.jpg']").length > 0) && unsafeWindow.location.href.match(/ghost\/maps[;?]/)) {// is héros
			// return unsafeWindow.sab_metacoa.charger_infos_coa(false,unsafeWindow.sab_metacoa.lister_jumps);
			unsafeWindow.sab_cache.set_domaine("reglages");
			var my_metas = unsafeWindow.sab_cache.get_long_term("my_metas");
			if (my_metas == null) {
				// console.log("Reload : metas non chargées : ",my_metas);
				unsafeWindow.sab_metacoa.charger_infos_coa('jump_only');
				return false;
			}
			if ($sab(".maps .table tr:not(.locked)").length == 0) {
				// console.log("Reload : pas de villes",my_metas);
				window.setTimeout("unsafeWindow.sab_metacoa.lister_jumps()",2000);
				return false;
			}
			// console.log("liste jumps !",my_metas);
			$sab(".sab_img_jump").remove();
			// return false;
			// unsafeWindow.sab_cache.set_domaine("metacoa");
			// var rang = unsafeWindow.sab_cache.get_long_term("rang",retour.id_rang);
			$sab.each(my_metas,function(x,meta) {
				if (meta.rang<3) {
					$sab(".maps .table tr:not(.locked) td.name").append($sab("<img/>")
						.attr({
							"src" : "/img/icons/r_ebuild.gif",
							"class" : "sab_img_jump",
							"style" : "cursor:pointer;float:right;",
							"onclick" : "sab_metacoa.recommander_jump({ligne:this,id_meta:"+meta.id+"})",
							"onmouseout" : "js.HordeTip.hide(event)",
							"onmouseover" : "js.HordeTip.showHelp(this,'Recommander ce jump à la MétaCoa "+meta.nom+"')",
						})
					);
				}
				if (meta.jump) {
					$sab(".maps .table tr:not(.locked):has(.name a[href*='joinMap?mid="+meta.jump+";']) td")
						.css({"background-color" : "black !important"})
						.first().append($sab("<img/>")
						.attr({
							"src" : "/gfx/icons/r_surgrp.gif",
							"class" : "sab_img_jump",
							"style" : "cursor:help;",
							"onmouseout" : "js.HordeTip.hide(event)",
							"onmouseover" : "js.HordeTip.showHelp(this,'Jump recommandé par la MétaCoa "+meta.nom+"')",
						})
					).filter(function(x) {return (meta.rang<3);})
					.append($sab("<img/>")
						.attr({
							"src" : "http://twinoid.com/img/icons/remove.png",
							"class" : "sab_img_jump",
							"style" : "cursor:pointer;float:right;",
							"onclick" : "sab_metacoa.recommander_jump({id_jump:0,id_meta:"+meta.id+"})",
							"onmouseout" : "js.HordeTip.hide(event)",
							"onmouseover" : "js.HordeTip.showHelp(this,'Annuler la recommandation pour la MétaCoa "+meta.nom+"')",
						})
					)
				}
			});
		}
	},
	recommander_jump : function (data) {
		if (typeof(data.ligne) != "undefined")
			data.id_jump = $sab("a",$sab(data.ligne).parent()).attr("href").match(/mid=([0-9]+)[;?]/)[1];
		unsafeWindow.sab_serveur.execution_identifee({
			url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
			type : 'POST',
			data : {
				action : "recommander_jump",
				id_ville : data.id_jump,
				id_meta : data.id_meta
			},
			success : function (retour) {
				// unsafeWindow.sab_metacoa.reload_jump();
				unsafeWindow.sab_metacoa.charger_infos_coa('jump_only',unsafeWindow.location.reload);
			}
		});
	
	},
	// reload_jump : function () {
	// },
	icone_last_msg : function(new_last) {
		// unsafeWindow.sab_cache.set_domaine("metacoa");
		// var last_msg = unsafeWindow.sab_cache.get_long_term("dernier_affichage");
		// last_msg = (typeof(last_msg) != "number") ? 0 : last_msg;
		// $sab(".sab_img_nv_msg").remove();
		// return (last_msg < new_last) ? $sab("<img src='/gfx/design/anim_icon_mail.gif' title='Nouveaux messages !' class='sab_img_nv_msg'/>") : "";
		return $sab("<img src='/gfx/design/anim_icon_mail.gif' title='Nouveaux messages !' class='sab_img_nv_msg'/>");
	},
	check_last_msg : function (callback) {
		unsafeWindow.sab_serveur.execution_identifee({
			url : unsafeWindow.sab_serveur.datas.url_serveur+"metacoa.php",
			type : 'POST',
			data : {
				action : "check_last_msg"
			},
			success : function (retour) {
				callback(retour);
			}
		});
	}
}

// BDDs statiques
if (true) {
	unsafeWindow.detail_chantiers = [{"id":"1010","name":"Muraille","categorie":"wall1","parent":"0","def":"10","img":"small_wallimprove","temporaire":"0","plan":"0","ap":"30","items":[{"id":"59","count":"6"},{"id":"60","count":"4"}]},{"id":"1011","name":"Pompe","categorie":"pump","parent":"0","def":"0","img":"small_water","temporaire":"0","plan":"0","ap":"25","items":[{"id":"60","count":"8"},{"id":"84","count":"1"}]},{"id":"1012","name":"Renforts d'urgence","parent":"1074","def":"10","img":"item_wood_plate","temporaire":"1","plan":"0","ap":"30","items":[{"id":"59","count":"8"}]},{"id":"1013","name":"Champs piégés","parent":"1074","def":"15","img":"small_trap","temporaire":"1","plan":"305","ap":"12","items":[{"id":"59","count":"6"}]},{"id":"1014","name":"Guerilla","parent":"1074","def":"35","img":"small_trap","temporaire":"1","plan":"307","ap":"24","items":[{"id":"41","count":"2"},{"id":"59","count":"2"},{"id":"60","count":"1"}]},{"id":"1015","name":"Catapulte primitive","parent":"1050","def":"0","img":"item_courroie","temporaire":"0","plan":"305","ap":"40","items":[{"id":"59","count":"2"},{"id":"60","count":"1"},{"id":"159","count":"1"},{"id":"160","count":"1"}]},{"id":"1019","name":"Tas de détritus","parent":"1074","def":"5","img":"small_dig","temporaire":"1","plan":"0","ap":"10","items":[{"id":"59","count":"2"},{"id":"60","count":"2"}]},{"id":"1020","name":"Purificateur","parent":"1011","def":"0","img":"item_jerrycan","temporaire":"0","plan":"0","ap":"75","items":[{"id":"41","count":"1"},{"id":"59","count":"5"},{"id":"60","count":"6"},{"id":"84","count":"3"}]},{"id":"1021","name":"Boucherie","parent":"1033","def":"0","img":"item_meat","temporaire":"0","plan":"306","ap":"40","items":[{"id":"59","count":"9"},{"id":"60","count":"4"}]},{"id":"1022","name":"Mont pointu","parent":"1019","def":"60","img":"small_dig","temporaire":"1","plan":"305","ap":"40","items":[{"id":"60","count":"2"}]},{"id":"1023","name":"Grand fossé","parent":"1010","def":"10","img":"small_gather","temporaire":"0","plan":"0","ap":"80","items":[{"id":"59","count":"8"}]},{"id":"1024","name":"Muraille rasoir","parent":"1010","def":"50","img":"item_plate","temporaire":"0","plan":"306","ap":"40","items":[{"id":"41","count":"5"},{"id":"60","count":"15"}]},{"id":"1025","name":"Fixations de défenses","parent":"1033","def":"0","img":"item_meca_parts","temporaire":"0","plan":"307","ap":"50","items":[{"id":"41","count":"3"},{"id":"159","count":"7"},{"id":"160","count":"8"}]},{"id":"1026","name":"Potager","parent":"1011","def":"0","img":"item_vegetable_tasty","temporaire":"0","plan":"305","ap":"60","items":[{"id":"1","count":"10"},{"id":"95","count":"1"},{"id":"159","count":"10"}]},{"id":"1027","name":"Fosse à pieux","parent":"1023","def":"25","img":"small_spears","temporaire":"0","plan":"306","ap":"60","items":[{"id":"59","count":"20"}]},{"id":"1028","name":"Barbelés","parent":"1010","def":"5","img":"small_barbed","temporaire":"0","plan":"0","ap":"20","items":[{"id":"60","count":"2"}]},{"id":"1029","name":"Foreuse puits","parent":"1011","def":"0","img":"small_water","temporaire":"0","plan":"305","ap":"60","items":[{"id":"159","count":"7"},{"id":"160","count":"2"}]},{"id":"1030","name":"Projet Eden","parent":"1029","def":"0","img":"small_eden","temporaire":"0","plan":"307","ap":"65","items":[{"id":"73","count":"5"},{"id":"159","count":"5"},{"id":"160","count":"8"}]},{"id":"1031","name":"Remparts avancés","parent":"1010","def":"20","img":"small_wallimprove","temporaire":"0","plan":"305","ap":"40","items":[{"id":"41","count":"6"},{"id":"159","count":"9"},{"id":"160","count":"6"}]},{"id":"1032","name":"Champ mines eau","parent":"1020","def":"115","img":"item_bgrenade","temporaire":"1","plan":"306","ap":"40","items":[{"id":"1","count":"10"},{"id":"60","count":"3"},{"id":"73","count":"1"},{"id":"132","count":"1"}]},{"id":"1033","name":"Atelier","categorie":"command","parent":"0","def":"0","img":"small_refine","temporaire":"0","plan":"0","ap":"25","items":[{"id":"59","count":"10"},{"id":"60","count":"8"}]},{"id":"1034","name":"Piston verrou","parent":"1062","def":"15","img":"small_door_closed","temporaire":"0","plan":"305","ap":"24","items":[{"id":"41","count":"4"},{"id":"59","count":"10"},{"id":"84","count":"1"},{"id":"160","count":"3"}]},{"id":"1035","name":"Scanner","parent":"1050","def":"0","img":"item_tagger","temporaire":"0","plan":"306","ap":"20","items":[{"id":"2","count":"2"},{"id":"41","count":"1"},{"id":"101","count":"1"},{"id":"105","count":"2"}]},{"id":"1036","name":"Poutres renfort","parent":"1031","def":"25","img":"item_plate","temporaire":"0","plan":"305","ap":"55","items":[{"id":"41","count":"2"},{"id":"159","count":"1"},{"id":"160","count":"3"}]},{"id":"1037","name":"Muraille à pointes","parent":"1031","def":"45","img":"item_plate","temporaire":"0","plan":"306","ap":"35","items":[{"id":"59","count":"5"},{"id":"60","count":"20"},{"id":"134","count":"1"}]},{"id":"1039","name":"Vaporisateur","parent":"1060","def":"35","img":"small_waterspray","temporaire":"0","plan":"0","ap":"50","items":[{"id":"1","count":"10"},{"id":"41","count":"1"},{"id":"59","count":"10"},{"id":"160","count":"7"}]},{"id":"1040","name":"Sanibroyeur","parent":"1060","def":"50","img":"small_grinder","temporaire":"0","plan":"305","ap":"55","items":[{"id":"64","count":"2"},{"id":"84","count":"2"},{"id":"159","count":"2"},{"id":"160","count":"10"}]},{"id":"1041","name":"Douves","parent":"1023","def":"65","img":"small_waterhole","temporaire":"0","plan":"305","ap":"50","items":[{"id":"1","count":"20"}]},{"id":"1042","name":"Carte améliorée","parent":"1050","def":"0","img":"item_electro","temporaire":"0","plan":"306","ap":"15","items":[{"id":"2","count":"2"},{"id":"60","count":"1"},{"id":"101","count":"1"},{"id":"105","count":"2"}]},{"id":"1043","name":"Canon à briques","parent":"1046","def":"25","img":"small_canon","temporaire":"0","plan":"0","ap":"60","items":[{"id":"84","count":"1"},{"id":"101","count":"2"},{"id":"134","count":"3"},{"id":"159","count":"5"},{"id":"160","count":"5"}]},{"id":"1044","name":"Pièges à loups","parent":"1074","def":"20","img":"small_trap","temporaire":"1","plan":"0","ap":"20","items":[{"id":"60","count":"2"},{"id":"74","count":"3"}]},{"id":"1045","name":"Crémato cue","parent":"1021","def":"0","img":"item_hmeat","temporaire":"0","plan":"307","ap":"45","items":[{"id":"159","count":"8"},{"id":"160","count":"1"}]},{"id":"1046","name":"Monticules à canons","parent":"1033","def":"15","img":"small_dig","temporaire":"0","plan":"0","ap":"50","items":[{"id":"134","count":"1"},{"id":"159","count":"7"},{"id":"160","count":"1"}]},{"id":"1047","name":"Perforeuse","parent":"1046","def":"55","img":"small_canon","temporaire":"0","plan":"306","ap":"30","items":[{"id":"41","count":"4"},{"id":"84","count":"1"},{"id":"101","count":"1"},{"id":"160","count":"10"}]},{"id":"1048","name":"Lance-Grenailles","parent":"1046","def":"60","img":"small_canon","temporaire":"0","plan":"305","ap":"35","items":[{"id":"41","count":"5"},{"id":"64","count":"3"},{"id":"73","count":"3"},{"id":"159","count":"5"},{"id":"160","count":"1"}]},{"id":"1049","name":"Tourniquet","parent":"1046","def":"10","img":"item_wood_beam","temporaire":"0","plan":"306","ap":"15","items":[{"id":"159","count":"2"},{"id":"160","count":"1"}]},{"id":"1050","name":"Tour de guet","categorie":"tower","parent":"0","def":"5","img":"item_tagger","temporaire":"0","plan":"0","ap":"12","items":[{"id":"59","count":"3"},{"id":"60","count":"2"}]},{"id":"1051","name":"Fondations","categorie":"fondations","parent":"0","def":"0","img":"small_building","temporaire":"0","plan":"0","ap":"30","items":[{"id":"59","count":"10"},{"id":"60","count":"8"}]},{"id":"1052","name":"Grand déménagement","parent":"1051","def":"255","img":"small_moving","temporaire":"0","plan":"308","ap":"500","items":[{"id":"134","count":"3"},{"id":"159","count":"12"},{"id":"160","count":"5"}]},{"id":"1053","name":"Derrick","parent":"1051","def":"0","img":"small_derrick","temporaire":"0","plan":"306","ap":"70","items":[{"id":"159","count":"10"},{"id":"160","count":"15"}]},{"id":"1054","name":"Râpe à zombies","parent":"1010","def":"55","img":"small_grater","temporaire":"0","plan":"305","ap":"60","items":[{"id":"41","count":"3"},{"id":"60","count":"20"},{"id":"64","count":"3"}]},{"id":"1055","name":"Oubliettes","parent":"1010","def":"25","img":"small_gather","temporaire":"0","plan":"306","ap":"65","items":[{"id":"59","count":"15"}]},{"id":"1056","name":"Grogro mur","parent":"1031","def":"80","img":"item_plate","temporaire":"0","plan":"305","ap":"50","items":[{"id":"59","count":"10"},{"id":"134","count":"2"},{"id":"159","count":"15"},{"id":"160","count":"10"}]},{"id":"1057","name":"Fausse ville","parent":"1051","def":"200","img":"small_falsecity","temporaire":"0","plan":"307","ap":"300","items":[{"id":"41","count":"6"},{"id":"159","count":"20"},{"id":"160","count":"15"}]},{"id":"1058","name":"Barrières","parent":"1010","def":"15","img":"small_fence","temporaire":"0","plan":"0","ap":"50","items":[{"id":"41","count":"2"},{"id":"159","count":"5"}]},{"id":"1059","name":"Arroseurs auto","parent":"1060","def":"135","img":"small_sprinkler","temporaire":"0","plan":"307","ap":"50","items":[{"id":"1","count":"20"},{"id":"84","count":"1"},{"id":"159","count":"7"},{"id":"160","count":"15"}]},{"id":"1060","name":"Réseau hydraulique","parent":"1011","def":"0","img":"item_firework_tube","temporaire":"0","plan":"305","ap":"40","items":[{"id":"41","count":"3"},{"id":"60","count":"5"},{"id":"84","count":"2"},{"id":"160","count":"5"}]},{"id":"1061","name":"Robinetterie","parent":"1051","def":"0","img":"small_valve","temporaire":"0","plan":"307","ap":"130","items":[{"id":"39","count":"1"},{"id":"41","count":"2"},{"id":"60","count":"10"},{"id":"159","count":"6"},{"id":"160","count":"3"}]},{"id":"1062","name":"Portail","categorie":"doorLock","parent":"0","def":"0","img":"small_door_closed","temporaire":"0","plan":"0","ap":"16","items":[{"id":"60","count":"2"}]},{"id":"1064","name":"Planificateur","parent":"1050","def":"0","img":"item_tagger","temporaire":"0","plan":"305","ap":"20","items":[{"id":"81","count":"1"},{"id":"101","count":"1"}]},{"id":"1065","name":"Manufacture","parent":"1033","def":"0","img":"small_factory","temporaire":"0","plan":"0","ap":"40","items":[{"id":"159","count":"5"},{"id":"160","count":"5"},{"id":"170","count":"1"}]},{"id":"1066","name":"Appâts","parent":"1028","def":"50","img":"small_meatbarbed","temporaire":"1","plan":"306","ap":"10","items":[{"id":"157","count":"3"}]},{"id":"1067","name":"Scies hurlantes","parent":"1033","def":"45","img":"small_saw","temporaire":"0","plan":"306","ap":"65","items":[{"id":"41","count":"3"},{"id":"60","count":"5"},{"id":"81","count":"3"},{"id":"160","count":"2"}]},{"id":"1068","name":"Dynamitage","parent":"1074","def":"35","img":"small_tnt","temporaire":"1","plan":"305","ap":"20","items":[{"id":"73","count":"3"}]},{"id":"1069","name":"Blindage d'entrée","parent":"1062","def":"5","img":"item_plate","temporaire":"0","plan":"0","ap":"35","items":[{"id":"59","count":"3"}]},{"id":"1070","name":"Seconde couche","parent":"1031","def":"55","img":"item_plate","temporaire":"0","plan":"306","ap":"65","items":[{"id":"59","count":"35"},{"id":"160","count":"5"}]},{"id":"1071","name":"Muraille évolutive","parent":"1031","def":"55","img":"item_home_def","temporaire":"0","plan":"308","ap":"65","items":[{"id":"59","count":"5"},{"id":"60","count":"20"},{"id":"134","count":"1"}]},{"id":"1072","name":"Scrutateur","parent":"1050","def":"0","img":"small_gather","temporaire":"0","plan":"305","ap":"30","items":[{"id":"101","count":"1"},{"id":"159","count":"3"},{"id":"160","count":"1"},{"id":"170","count":"1"}]},{"id":"1073","name":"Aqua tourelles","parent":"1011","def":"10","img":"item_tube","temporaire":"0","plan":"306","ap":"60","items":[{"id":"1","count":"40"},{"id":"84","count":"1"},{"id":"160","count":"10"}]},{"id":"1074","name":"Dispositifs d'urgence","parent":"1050","def":"10","img":"status_terror","temporaire":"0","plan":"0","ap":"40","items":[{"id":"59","count":"5"},{"id":"60","count":"7"}]},{"id":"1075","name":"Registre chantier","parent":"1033","def":"0","img":"item_rp_book2","temporaire":"0","plan":"0","ap":"15","items":[{"id":"170","count":"1"}]},{"id":"1076","name":"Potence","parent":"1033","def":"0","img":"r_dhang","temporaire":"0","plan":"0","ap":"13","items":[{"id":"159","count":"1"},{"id":"196","count":"1"}]},{"id":"1077","name":"Catapulte calibrée","parent":"1015","def":"0","img":"item_courroie","temporaire":"0","plan":"306","ap":"30","items":[{"id":"40","count":"1"},{"id":"59","count":"2"},{"id":"60","count":"2"},{"id":"101","count":"2"}]},{"id":"1100","name":"Canon brutal","parent":"1046","def":"25","img":"small_canon","temporaire":"1","plan":"0","ap":"24","items":[{"id":"64","count":"2"},{"id":"160","count":"1"}]},{"id":"1101","name":"Architectoire","parent":"1075","def":"0","img":"small_refine","temporaire":"0","plan":"0","ap":"75","items":[{"id":"51","count":"1"},{"id":"69","count":"1"},{"id":"159","count":"10"}]},{"id":"1102","name":"Abattoir","parent":"1033","def":"35","img":"small_slaughterhouse","temporaire":"0","plan":"305","ap":"40","items":[{"id":"134","count":"2"},{"id":"160","count":"10"}]},{"id":"1103","name":"Supports défensifs","parent":"1033","def":"0","img":"item_shield","temporaire":"0","plan":"308","ap":"55","items":[{"id":"159","count":"5"},{"id":"160","count":"15"}]},{"id":"1104","name":"Cantine à bois","parent":"1033","def":"0","img":"small_cafet","temporaire":"1","plan":"306","ap":"6","items":[{"id":"1","count":"1"},{"id":"59","count":"2"},{"id":"95","count":"1"}]},{"id":"1105","name":"Cimetière cadenassé","parent":"1033","def":"0","img":"small_cemetery","temporaire":"0","plan":"305","ap":"36","items":[{"id":"41","count":"1"},{"id":"59","count":"10"}]},{"id":"1106","name":"Cercueils sur ressort","parent":"1105","def":"0","img":"small_coffin","temporaire":"0","plan":"308","ap":"100","items":[{"id":"40","count":"1"},{"id":"41","count":"2"},{"id":"59","count":"5"},{"id":"60","count":"15"}]},{"id":"1107","name":"Cantine centrale","parent":"1033","def":"0","img":"small_cafet","temporaire":"0","plan":"307","ap":"20","items":[{"id":"95","count":"1"},{"id":"159","count":"5"},{"id":"160","count":"1"},{"id":"170","count":"1"}]},{"id":"1108","name":"Laboratoire central","parent":"1033","def":"0","img":"item_acid","temporaire":"0","plan":"307","ap":"30","items":[{"id":"41","count":"3"},{"id":"95","count":"5"},{"id":"159","count":"3"},{"id":"160","count":"10"}]},{"id":"1109","name":"Poulailler","parent":"1033","def":"0","img":"small_chicken","temporaire":"0","plan":"307","ap":"40","items":[{"id":"42","count":"3"},{"id":"59","count":"5"},{"id":"84","count":"1"},{"id":"159","count":"5"}]},{"id":"1110","name":"Infirmerie","parent":"1033","def":"0","img":"small_infirmary","temporaire":"0","plan":"308","ap":"40","items":[{"id":"95","count":"6"},{"id":"136","count":"1"},{"id":"159","count":"5"},{"id":"160","count":"5"}]},{"id":"1111","name":"Stratégies citoyennes","parent":"1033","def":"0","img":"small_strategy","temporaire":"0","plan":"308","ap":"60","items":[{"id":"41","count":"3"},{"id":"159","count":"10"},{"id":"160","count":"5"}]},{"id":"1112","name":"Quartiers circulaires","parent":"1033","def":"0","img":"small_strategy","temporaire":"0","plan":"308","ap":"60","items":[{"id":"41","count":"3"},{"id":"159","count":"15"},{"id":"160","count":"15"}]},{"id":"1113","name":"Champs d'épouvantails","parent":"1051","def":"15","img":"small_scarecrow","temporaire":"0","plan":"0","ap":"35","items":[{"id":"59","count":"15"},{"id":"81","count":"2"}]},{"id":"1114","name":"Décharge publique","parent":"1051","def":"0","img":"small_trash","temporaire":"0","plan":"0","ap":"70","items":[{"id":"134","count":"5"},{"id":"159","count":"15"},{"id":"160","count":"15"}]},{"id":"1115","name":"Décharge humidifiée","parent":"1114","def":"75","img":"small_trash","temporaire":"0","plan":"308","ap":"120","items":[{"id":"1","count":"20"},{"id":"159","count":"15"},{"id":"160","count":"10"}]},{"id":"1116","name":"Décharge blindée","parent":"1114","def":"0","img":"small_trash","temporaire":"0","plan":"307","ap":"40","items":[{"id":"41","count":"3"},{"id":"60","count":"8"}]},{"id":"1117","name":"Décharge piégée","parent":"1114","def":"0","img":"small_trash","temporaire":"0","plan":"307","ap":"20","items":[{"id":"41","count":"1"},{"id":"60","count":"8"}]},{"id":"1118","name":"Appâts odorants","parent":"1114","def":"0","img":"small_trash","temporaire":"0","plan":"306","ap":"20","items":[{"id":"59","count":"15"}]},{"id":"1119","name":"Déchardes de bois","parent":"1114","def":"0","img":"small_trash","temporaire":"0","plan":"306","ap":"30","items":[{"id":"41","count":"1"},{"id":"59","count":"5"},{"id":"60","count":"5"}]},{"id":"1120","name":"Ferraillerie","parent":"1114","def":"0","img":"small_trash","temporaire":"0","plan":"306","ap":"30","items":[{"id":"59","count":"5"},{"id":"60","count":"5"}]},{"id":"1122","name":"Cage à viande","parent":"1051","def":"0","img":"small_fleshcage","temporaire":"0","plan":"306","ap":"40","items":[{"id":"41","count":"2"},{"id":"60","count":"8"},{"id":"128","count":"1"},{"id":"159","count":"1"}]},{"id":"1123","name":"Enclos","parent":"1114","def":"0","img":"small_howlingbait","temporaire":"0","plan":"306","ap":"30","items":[{"id":"159","count":"10"}]},{"id":"1124","name":"Phare","parent":"1051","def":"0","img":"small_lighthouse","temporaire":"0","plan":"306","ap":"30","items":[{"id":"101","count":"2"},{"id":"159","count":"5"},{"id":"160","count":"5"}]},{"id":"1125","name":"Habitations fortifiées","parent":"1051","def":"0","img":"small_city_up","temporaire":"0","plan":"307","ap":"50","items":[{"id":"134","count":"2"},{"id":"159","count":"15"},{"id":"160","count":"10"}]},{"id":"1126","name":"Feu de joie","parent":"1051","def":"30","img":"small_score","temporaire":"1","plan":"307","ap":"15","items":[{"id":"26","count":"1"},{"id":"59","count":"5"}]},{"id":"1127","name":"Dictature des héros","parent":"1051","def":"0","img":"small_court","temporaire":"0","plan":"307","ap":"12","items":[{"id":"59","count":"6"},{"id":"160","count":"5"},{"id":"170","count":"1"}]},{"id":"1128","name":"Bureau des esclavagistes","parent":"1051","def":"0","img":"small_slave","temporaire":"0","plan":"308","ap":"45","items":[{"id":"159","count":"10"},{"id":"160","count":"5"},{"id":"196","count":"2"}]},{"id":"1130","name":"Cinéma","parent":"1051","def":"0","img":"small_cinema","temporaire":"0","plan":"308","ap":"100","items":[{"id":"101","count":"3"},{"id":"159","count":"15"},{"id":"160","count":"5"},{"id":"186","count":"1"},{"id":"187","count":"1"}]},{"id":"1131","name":"Montgolfière","parent":"1051","def":"0","img":"small_balloon","temporaire":"0","plan":"308","ap":"100","items":[{"id":"41","count":"6"},{"id":"54","count":"4"},{"id":"159","count":"5"},{"id":"160","count":"5"}]},{"id":"1132","name":"Labyrinthe","parent":"1051","def":"85","img":"small_labyrinth","temporaire":"0","plan":"307","ap":"200","items":[{"id":"41","count":"2"},{"id":"59","count":"40"},{"id":"60","count":"10"},{"id":"134","count":"4"}]},{"id":"1133","name":"Dernière chance","parent":"1051","def":"55","img":"small_lastchance","temporaire":"0","plan":"307","ap":"150","items":[{"id":"41","count":"4"},{"id":"159","count":"15"},{"id":"160","count":"10"}]},{"id":"1134","name":"Roquettes","parent":"1051","def":"0","img":"small_rocket","temporaire":"1","plan":"308","ap":"50","items":[{"id":"1","count":"10"},{"id":"41","count":"1"},{"id":"60","count":"5"},{"id":"73","count":"1"},{"id":"132","count":"2"}]},{"id":"1135","name":"Feux d'artifices","parent":"1051","def":"0","img":"small_fireworks","temporaire":"0","plan":"308","ap":"50","items":[{"id":"41","count":"1"},{"id":"73","count":"4"},{"id":"132","count":"2"},{"id":"159","count":"3"},{"id":"160","count":"3"}]},{"id":"1136","name":"Autel de la rédemption","parent":"1051","def":"0","img":"small_redemption","temporaire":"0","plan":"307","ap":"24","items":[{"id":"43","count":"1"},{"id":"159","count":"3"},{"id":"160","count":"2"}]},{"id":"1137","name":"PMV géant","parent":"1051","def":"0","img":"small_pmvbig","temporaire":"0","plan":"308","ap":"300","items":[{"id":"41","count":"2"},{"id":"60","count":"30"}]},{"id":"1138","name":"Statue du Corbeau","parent":"1051","def":"0","img":"small_crow","temporaire":"0","plan":"308","ap":"300","items":[{"id":"74","count":"3"},{"id":"159","count":"35"}]},{"id":"1139","name":"Grande roue de Grostas","parent":"1051","def":"0","img":"small_wheel","temporaire":"0","plan":"308","ap":"300","items":[{"id":"1","count":"20"},{"id":"41","count":"5"},{"id":"134","count":"3"},{"id":"160","count":"5"}]},{"id":"1140","name":"Château de sable","parent":"1051","def":"0","img":"small_castle","temporaire":"0","plan":"308","ap":"300","items":[{"id":"1","count":"30"},{"id":"159","count":"15"},{"id":"160","count":"10"}]},{"id":"1141","name":"Percée","parent":"1011","def":"0","img":"item_tube","temporaire":"1","plan":"305","ap":"12","items":[{"id":"59","count":"2"},{"id":"60","count":"1"}]},{"id":"1142","name":"Pluvio-canons","parent":"1011","def":"80","img":"small_watercanon","temporaire":"0","plan":"306","ap":"40","items":[{"id":"1","count":"15"},{"id":"59","count":"5"},{"id":"60","count":"5"},{"id":"160","count":"5"}]},{"id":"1143","name":"Filtre","parent":"1020","def":"0","img":"item_jerrycan","temporaire":"0","plan":"307","ap":"50","items":[{"id":"60","count":"10"},{"id":"101","count":"2"},{"id":"204","count":"1"}]},{"id":"1144","name":"Pamplemousses explosifs","parent":"1026","def":"0","img":"item_bgrenade","temporaire":"0","plan":"306","ap":"30","items":[{"id":"1","count":"10"},{"id":"59","count":"5"},{"id":"73","count":"5"}]},{"id":"1145","name":"Fertilisation sauvage","parent":"1026","def":"0","img":"item_digger","temporaire":"0","plan":"307","ap":"30","items":[{"id":"1","count":"10"},{"id":"51","count":"2"},{"id":"60","count":"5"},{"id":"95","count":"8"}]},{"id":"1146","name":"Pommier de l'outre-monde","parent":"1011","def":"0","img":"small_appletree","temporaire":"0","plan":"308","ap":"30","items":[{"id":"1","count":"10"},{"id":"74","count":"2"},{"id":"95","count":"3"},{"id":"159","count":"1"}]},{"id":"1149","name":"Douches","parent":"1060","def":"0","img":"small_shower","temporaire":"0","plan":"306","ap":"25","items":[{"id":"1","count":"5"},{"id":"59","count":"4"},{"id":"60","count":"1"},{"id":"84","count":"1"}]},{"id":"1150","name":"Caniveaux","parent":"1011","def":"60","img":"small_shower","temporaire":"0","plan":"305","ap":"50","items":[{"id":"1","count":"15"},{"id":"59","count":"10"}]},{"id":"1151","name":"Rid'eau","parent":"1011","def":"35","img":"small_shower","temporaire":"0","plan":"307","ap":"20","items":[{"id":"1","count":"10"}]},{"id":"1152","name":"Roquette foreuse","parent":"1011","def":"0","img":"small_rocketperf","temporaire":"0","plan":"308","ap":"100","items":[{"id":"73","count":"1"},{"id":"84","count":"1"},{"id":"132","count":"1"},{"id":"159","count":"5"},{"id":"160","count":"5"}]},{"id":"1153","name":"Détecteur à eau","parent":"1011","def":"0","img":"small_waterdetect","temporaire":"0","plan":"308","ap":"130","items":[{"id":"101","count":"5"},{"id":"159","count":"5"},{"id":"160","count":"10"}]},{"id":"1155","name":"Conduite d'aération","parent":"1062","def":"20","img":"small_ventilation","temporaire":"0","plan":"307","ap":"24","items":[{"id":"41","count":"1"},{"id":"60","count":"8"}]},{"id":"1156","name":"Palissade","parent":"1010","def":"45","img":"small_fence","temporaire":"0","plan":"305","ap":"50","items":[{"id":"41","count":"2"},{"id":"59","count":"20"},{"id":"159","count":"5"}]},{"id":"1157","name":"Troisième couche","parent":"1070","def":"80","img":"item_plate","temporaire":"0","plan":"305","ap":"65","items":[{"id":"60","count":"30"},{"id":"64","count":"5"},{"id":"160","count":"5"}]},{"id":"1158","name":"Bétonnade","parent":"1031","def":"50","img":"small_wallimprove","temporaire":"0","plan":"307","ap":"60","items":[{"id":"134","count":"6"},{"id":"160","count":"2"}]},{"id":"1159","name":"Mur savonné","parent":"1010","def":"60","img":"small_wallimprove","temporaire":"0","plan":"306","ap":"40","items":[{"id":"1","count":"10"},{"id":"95","count":"6"},{"id":"134","count":"1"}]},{"id":"1160","name":"Pulvérisateur","parent":"1010","def":"0","img":"small_waterspray","temporaire":"0","plan":"306","ap":"50","items":[{"id":"41","count":"2"},{"id":"60","count":"10"},{"id":"84","count":"1"},{"id":"160","count":"2"}]},{"id":"1161","name":"Projection acide","parent":"1160","def":"35","img":"small_acidspray","temporaire":"1","plan":"0","ap":"30","items":[{"id":"1","count":"2"},{"id":"95","count":"5"}]},{"id":"1162","name":"Neurotoxine","parent":"1160","def":"110","img":"small_gazspray","temporaire":"1","plan":"306","ap":"40","items":[{"id":"1","count":"2"},{"id":"51","count":"3"},{"id":"95","count":"7"}]},{"id":"1163","name":"Cloison en bois","parent":"1010","def":"25","img":"item_plate","temporaire":"0","plan":"305","ap":"30","items":[{"id":"59","count":"15"},{"id":"60","count":"5"}]},{"id":"1164","name":"Cloison métallique","parent":"1010","def":"25","img":"item_plate","temporaire":"0","plan":"305","ap":"30","items":[{"id":"59","count":"5"},{"id":"60","count":"10"}]},{"id":"1165","name":"Cloison épaisse","parent":"1010","def":"30","img":"item_plate","temporaire":"0","plan":"306","ap":"30","items":[{"id":"59","count":"10"},{"id":"60","count":"10"}]},{"id":"1166","name":"Contre-plaqué","parent":"1010","def":"15","img":"item_plate","temporaire":"0","plan":"305","ap":"30","items":[{"id":"59","count":"5"},{"id":"60","count":"5"}]},{"id":"1167","name":"Bastion","parent":"1010","def":"45","img":"item_plate","temporaire":"0","plan":"306","ap":"30","items":[{"id":"59","count":"15"},{"id":"60","count":"15"}]},{"id":"1168","name":"Panique","parent":"1074","def":"30","img":"status_terror","temporaire":"1","plan":"0","ap":"25","items":[{"id":"1","count":"4"},{"id":"59","count":"5"},{"id":"60","count":"5"}]},{"id":"1169","name":"La Bamba","parent":"1074","def":"75","img":"small_bamba","temporaire":"1","plan":"307","ap":"50","items":[{"id":"59","count":"5"},{"id":"60","count":"5"},{"id":"105","count":"3"}]},{"id":"1170","name":"Tour des gardiens","parent":"1050","def":"15","img":"small_watchmen","temporaire":"0","plan":"306","ap":"24","items":[{"id":"41","count":"1"},{"id":"64","count":"1"},{"id":"159","count":"10"},{"id":"160","count":"2"}]},{"id":"1171","name":"Tour des éclaireurs","parent":"1050","def":"10","img":"small_watchmen","temporaire":"0","plan":"307","ap":"36","items":[{"id":"41","count":"1"},{"id":"159","count":"5"},{"id":"160","count":"1"}]},{"id":"1172","name":"Décharge organisée","parent":"1114","def":"0","img":"small_trashclean","temporaire":"0","plan":"307","ap":"30","items":[{"id":"41","count":"2"},{"id":"134","count":"1"},{"id":"159","count":"10"},{"id":"160","count":"6"},{"id":"169","count":"2"}]},{"id":"1173","name":"Réacteur soviétique","parent":"1051","def":"500","img":"small_arma","temporaire":"0","plan":"308","ap":"100","items":[{"id":"2","count":"10"},{"id":"39","count":"1"},{"id":"101","count":"4"},{"id":"134","count":"2"},{"id":"160","count":"15"}]},{"id":"1174","name":"Poupée Vaudou XXL","parent":"1074","def":"200","img":"small_vaudoudoll","temporaire":"1","plan":"0","ap":"40","items":[{"id":"1","count":"2"},{"id":"41","count":"3"},{"id":"60","count":"2"},{"id":"64","count":"8"},{"id":"352","count":"5"}]},{"id":"1175","name":"Guillotine à Bokor","parent":"1074","def":"300","img":"small_bokorsword","temporaire":"1","plan":"0","ap":"60","items":[{"id":"64","count":"9"},{"id":"159","count":"8"},{"id":"160","count":"7"},{"id":"352","count":"8"}]},{"id":"1176","name":"Mirage Spirituel","parent":"1074","def":"100","img":"small_spiritmirage","temporaire":"1","plan":"0","ap":"30","items":[{"id":"59","count":"6"},{"id":"64","count":"6"},{"id":"159","count":"6"},{"id":"352","count":"3"}]},{"id":"1177","name":"Pluie Bénite","parent":"1074","def":"200","img":"small_holyrain","temporaire":"1","plan":"0","ap":"40","items":[{"id":"1","count":"7"},{"id":"59","count":"8"},{"id":"159","count":"9"},{"id":"352","count":"5"}]}];
	unsafeWindow.detail_items_bbh = [null,{"categorie":"Provision","nom":"Ration d'eau","img":"water"},{"categorie":"Autre","nom":"Pile","img":"pile"},{"categorie":"Provision","nom":"Boîte de Conserve","img":"can"},{"categorie":"Provision","nom":"Boîte de Conserve ouverte","img":"can_open"},{"categorie":"Arme","nom":"Lance-Pile 1-PDTG (chargé)","img":"pilegun"},null,{"categorie":"Arme","nom":"Taser d'auto-défense","img":"taser"},{"categorie":"Arme","nom":"Aqua-Splash (vide)","img":"watergun_opt_empty"},{"categorie":"Arme","nom":"Batteur électrique (chargé)","img":"mixergun"},{"categorie":"Arme","nom":"Tronçonneuse (chargée)","img":"chainsaw"},{"categorie":"Arme","nom":"Tondeuse à gazon","img":"lawn"},null,{"categorie":"Arme","nom":"Clé à Molette","img":"wrench"},{"categorie":"Arme","nom":"Tournevis","img":"screw"},{"categorie":"Arme","nom":"Grand Bâton Sec","img":"staff"},{"categorie":"Arme","nom":"Couteau à dents","img":"knife"},{"categorie":"Arme","nom":"Coupe-coupe","img":"cutcut"},{"categorie":"Arme","nom":"Canif dérisoire","img":"small_knife"},{"categorie":"Arme","nom":"Couteau Suisse","img":"swiss_knife"},{"categorie":"Arme","nom":"Cutter","img":"cutter"},null,{"categorie":"Sacs","nom":"Caddie","img":"cart"},{"categorie":"Ouvre-boîte","nom":"Ouvre-boîte","img":"can_opener"},null,{"categorie":"Sacs","nom":"Sac supplémentaire","img":"bag"},{"categorie":"Autre","nom":"Boîte d'allumettes","img":"lights"},null,{"categorie":"Pharmacie","nom":"Piqûre de calmant","img":"xanax"},{"categorie":"Amenagement","nom":"Rocking Chair","img":"chair"},{"categorie":"Autre","nom":"Livre poussiéreux","img":"rp_book"},{"categorie":"Objet_Defense","nom":"Matelas","img":"bed"},{"categorie":"Amenagement","nom":"Lampe de chevet éteinte","img":"lamp"},{"categorie":"Amenagement","nom":"Tapis Persan","img":"carpet"},{"categorie":"Amenagement","nom":"Petite chaîne HiFi en panne","img":"music_part"},{"categorie":"Amenagement","nom":"Chaîne de Porte + cadenas","img":"lock"},{"categorie":"Amenagement","nom":"Paillasson","img":"door_carpet"},null,{"categorie":"Autre","nom":"Dés","img":"dice"},{"categorie":"Autre","nom":"Moteur","img":"engine"},{"categorie":"Autre","nom":"Courroie","img":"courroie"},{"categorie":"Ressource_rare","nom":"Poignée de vis et écrous","img":"meca_parts"},{"categorie":"Animaux","nom":"Poule","img":"pet_chick"},{"categorie":"Animaux","nom":"Cochon malodorant","img":"pet_pig"},{"categorie":"Animaux","nom":"Rat géant","img":"pet_rat"},{"categorie":"Animaux","nom":"Chien hargneux","img":"pet_dog"},{"categorie":"Animaux","nom":"Gros chat mignon","img":"pet_cat"},{"categorie":"Animaux","nom":"Serpent de 2 mètres","img":"pet_snake"},{"categorie":"Autre","nom":"Petit manche vibrant (chargé)","img":"vibr"},null,null,{"categorie":"Pharmacie","nom":"Stéroïdes Anabolisants","img":"drug"},{"categorie":"Provision","nom":"Steak appétissant","img":"meat"},{"categorie":"Provision","nom":"Viande indéfinissable","img":"undef"},{"categorie":"Camping","nom":"Toile de tente","img":"sheet"},null,{"categorie":"Sacs","nom":"Sac super-pratique","img":"bagxl"},null,{"categorie":"Ressource","nom":"Jerrycan plein","img":"jerrycan"},{"categorie":"Ressource","nom":"Planche tordue","img":"wood2"},{"categorie":"Ressource","nom":"Ferraille","img":"metal"},null,{"categorie":"Arme","nom":"Bombe à eau","img":"grenade"},null,{"categorie":"Objet_Defense","nom":"Plaque de tôle","img":"plate"},{"categorie":"Autre","nom":"Pompe à Jerrycan (démontée)","img":"jerrygun_part"},{"categorie":"Pharmacie","nom":"Bandage rudimentaire","img":"bandage"},null,null,{"categorie":"Provision","nom":"Vodka Marinostov","img":"vodka"},{"categorie":"Arme","nom":"Pompe à Jerrycan (vide)","img":"jerrygun_off"},null,null,{"categorie":"Ressource_rare","nom":"Explosifs bruts","img":"explo"},{"categorie":"Provision","nom":"Viande Humaine","img":"hmeat"},null,{"categorie":"Autre","nom":"Sac plastique","img":"grenade_empty"},{"categorie":"Arme","nom":"Bombe à eau explosive","img":"bgrenade"},{"categorie":"Arme","nom":"Sac plastique + explosif","img":"bgrenade_empty"},{"categorie":"Arme","nom":"Tronçonneuse incomplète","img":"chainsaw_part"},{"categorie":"Arme","nom":"Batteur incomplet","img":"mixergun_part"},{"categorie":"Autre","nom":"Rustine","img":"rustine"},{"categorie":"Arme","nom":"Tondeuse démontée","img":"lawn_part"},null,{"categorie":"Ressource_rare","nom":"Tube de cuivre","img":"tube"},{"categorie":"Sacs","nom":"Caddie bancal","img":"cart_part"},null,null,{"categorie":"Sacs","nom":"Ceinture à poches","img":"pocket_belt"},{"categorie":"Pharmacie","nom":"Twinoïde 500mg","img":"drug_hero"},{"categorie":"Autre_encombrant","nom":"Boîte en métal","img":"chest"},{"categorie":"Autre_encombrant","nom":"Gros coffre en métal","img":"chest_xl"},{"categorie":"Autre_encombrant","nom":"Caisse de matériel","img":"chest_tools"},{"categorie":"Amenagement","nom":"Lampe de chevet allumée","img":"lamp_on"},{"categorie":"Amenagement","nom":"Petite Chaîne HiFi allumée","img":"music"},{"categorie":"Pharmacie","nom":"Produits pharmaceutiques","img":"pharma"},{"categorie":"Camping","nom":"Fragments de tôle","img":"plate_raw"},{"categorie":"Provision","nom":"« Debout-les-Morts »","img":"rhum"},{"categorie":"Provision","nom":"Café brûlant","img":"coffee"},{"categorie":"Provision","nom":"Cafetière","img":"coffee_machine"},{"categorie":"Autre","nom":"Cafetière incomplète","img":"coffee_machine_part"},{"categorie":"Ressource_rare","nom":"Composant électronique","img":"electro"},{"categorie":"Autre","nom":"Affaires d'un citoyen","img":"chest_citizen"},{"categorie":"Pharmacie","nom":"Hydratone 100mg","img":"drug_water"},{"categorie":"Amenagement","nom":"Radio K7 éteint","img":"radio_off"},{"categorie":"Amenagement","nom":"Radio K7","img":"radio_on"},{"categorie":"Pharmacie","nom":"Cyanure","img":"cyanure"},{"categorie":"Objet_Defense","nom":"Vieille porte","img":"door"},{"categorie":"Provision","nom":"Légume suspect","img":"vegetable"},{"categorie":"Autre","nom":"Kit de bricolage abimé","img":"repair_kit_part"},{"categorie":"Autre","nom":"Kit de bricolage","img":"repair_kit"},{"categorie":"Arme","nom":"Pistolet à Eau (vide)","img":"watergun_empty"},{"categorie":"Arme","nom":"Aqua-Splash (3 charges)","img":"watergun_opt_3"},{"categorie":"Arme","nom":"Aqua-Splash (2 charges)","img":"watergun_opt_2"},{"categorie":"Arme","nom":"Aqua-Splash (1 charge)","img":"watergun_opt_1"},{"categorie":"Arme","nom":"Batteur électrique (éteint)","img":"mixergun_empty"},{"categorie":"Arme","nom":"Tronçonneuse (éteinte)","img":"chainsaw_empty"},{"categorie":"Arme","nom":"Lance-Pile 1-PDTG (vide)","img":"pilegun_empty"},{"categorie":"Arme","nom":"Taser d'auto-défense (éteint)","img":"taser_empty"},{"categorie":"Autre","nom":"Sport-Elec (éteint)","img":"sport_elec_empty"},{"categorie":"Autre","nom":"Sport-Elec (chargé)","img":"sport_elec"},null,{"categorie":"Arme","nom":"Devastator (vide)","img":"big_pgun_empty"},{"categorie":"Arme","nom":"Devastator (chargé)","img":"big_pgun"},{"categorie":"Arme","nom":"Devastator incomplet","img":"big_pgun_part"},{"categorie":"Autre","nom":"Balise « Radius »","img":"tagger"},{"categorie":"Autre","nom":"Fusée éclairante","img":"flare"},{"categorie":"Arme","nom":"Pompe à Jerrycan (prête)","img":"jerrygun"},{"categorie":"Arme","nom":"Chaise Ektörp-Gluten","img":"chair_basic"},{"categorie":"Amenagement","nom":"Revolver (vide)","img":"gun"},{"categorie":"Amenagement","nom":"Fusil d'assaut (vide)","img":"machine_gun"},null,{"categorie":"Autre","nom":"Détonateur compact","img":"deto"},{"categorie":"Objet_Defense","nom":"Sac de Ciment","img":"concrete"},{"categorie":"Objet_Defense","nom":"Pavés de béton informes","img":"concrete_wall"},{"categorie":"Pharmacie","nom":"Médicament sans étiquette","img":"drug_random"},{"categorie":"Pharmacie","nom":"Paracétoïde 7g","img":"disinfect"},{"categorie":"Autre","nom":"Désherbant Ness-Quick","img":"digger"},{"categorie":"Provision","nom":"Caisse de nourriture","img":"chest_food"},{"categorie":"Provision","nom":"Doggy-bag","img":"food_bag"},{"categorie":"Provision","nom":"Paquet de chips molles","img":"food_bar1"},{"categorie":"Provision","nom":"Napolitains moisis","img":"food_bar2"},{"categorie":"Provision","nom":"Chewing-gums séchés","img":"food_bar3"},{"categorie":"Provision","nom":"Petits Beurres rances","img":"food_biscuit"},{"categorie":"Provision","nom":"Ailerons de poulet entamés","img":"food_chick"},{"categorie":"Provision","nom":"Pim's périmé","img":"food_pims"},{"categorie":"Provision","nom":"Biscuit fade","img":"food_tarte"},{"categorie":"Provision","nom":"Jambon-beurre moisi","img":"food_sandw"},{"categorie":"Provision","nom":"Nouilles chinoises","img":"food_noodles"},{"categorie":"Autre","nom":"Epices fortes","img":"spices"},{"categorie":"Provision","nom":"Nouilles chinoises épicées","img":"food_noodles_hot"},{"categorie":"Autre","nom":"Jeu de cartes incomplet","img":"cards"},{"categorie":"Autre","nom":"Boîte de jeu","img":"game_box"},{"categorie":"Arme","nom":"Aqua-Splash (démonté)","img":"watergun_opt_part"},{"categorie":"Pharmacie","nom":"Petit manche vibrant (déchargé)","img":"vibr_empty"},null,null,{"categorie":"Provision","nom":"Os charnu","img":"bone_meat"},{"categorie":"Arme","nom":"Os humain fêlé","img":"bone"},{"categorie":"Ressource","nom":"Poutre rafistolée","img":"wood_beam"},{"categorie":"Ressource","nom":"Structures métalliques","img":"metal_beam"},{"categorie":"Ressource","nom":"Débris métalliques","img":"metal_bad"},{"categorie":"Ressource","nom":"Souche de bois pourrie","img":"wood_bad"},{"categorie":"Ressource","nom":"Scie à métaux","img":"saw_tool"},{"categorie":"Amenagement","nom":"Buche en bon état","img":"wood_log"},{"categorie":"Transfo","nom":"Appareil électronique en panne","img":"electro_box"},{"categorie":"Transfo","nom":"Meuble en kit","img":"deco_box"},{"categorie":"Ressource_rare","nom":"Scie à métaux abimée","img":"saw_tool_part"},{"categorie":"Transfo","nom":"Mécanisme","img":"mecanism"},{"categorie":"Objet_Defense","nom":"Tréteau","img":"trestle"},{"categorie":"Objet_Defense","nom":"Table Järpen","img":"table"},{"categorie":"Ressource","nom":"Micropur effervescent","img":"water_cleaner"},{"categorie":"Provision","nom":"Melon d'intestin","img":"vegetable_tasty"},{"categorie":"Autre","nom":"Poudre-Comète brute","img":"powder"},{"categorie":"Arme","nom":"Bombe Pulvérine","img":"flash"},{"categorie":"Autre","nom":"Teddy n'Ours","img":"teddy"},null,null,{"categorie":"Autre","nom":"Morceau de caisse","img":"wood_plate_part"},{"categorie":"Objet_Defense","nom":"Plaque de bois solide","img":"wood_plate"},{"categorie":"Amenagement","nom":"Liasse de billets","img":"money"},{"categorie":"Autre","nom":"Outils en vrac","img":"repair_kit_part_raw"},{"categorie":"Autre","nom":"Radius Mark II déchargée","img":"radius_mk2_part"},{"categorie":"Autre","nom":"Radius Mark II","img":"radius_mk2"},{"categorie":"Autre","nom":"Brico'Facile","img":"repair_one"},{"categorie":"Autre","nom":"Moteur incomplet","img":"engine_part"},{"categorie":"Amenagement","nom":"Vieille machine à laver","img":"machine_1"},{"categorie":"Amenagement","nom":"Four cancérigène","img":"machine_2"},{"categorie":"Amenagement","nom":"Réfrigérateur d'étudiant","img":"machine_3"},{"categorie":"Autre","nom":"Une lettre sans adresse","img":"rp_letter"},{"categorie":"Autre","nom":"Feuille raccornie","img":"rp_scroll"},{"categorie":"Autre","nom":"Manuel d'instructions","img":"rp_manual"},{"categorie":"Autre","nom":"Une étiquette","img":"rp_scroll"},{"categorie":"Autre","nom":"Carnet illisible","img":"rp_book2"},{"categorie":"Autre","nom":"Album photo","img":"rp_book"},{"categorie":"Autre","nom":"Pile de feuilles","img":"rp_sheets"},{"categorie":"Autre","nom":"Grosse chaîne rouillée","img":"chain"},{"categorie":"Provision","nom":"Plat fait-maison douteux","img":"dish"},{"categorie":"Provision","nom":"Bon plat fait-maison","img":"dish_tasty"},{"categorie":"Amenagement","nom":"Cantine en fer","img":"home_box_xl"},{"categorie":"Amenagement","nom":"Cartons","img":"home_box"},{"categorie":"Amenagement","nom":"Barricades à clouer","img":"home_def"},{"categorie":"Autre","nom":"Une enveloppe","img":"book_gen_letter"},{"categorie":"Autre","nom":"Un colis","img":"book_gen_box"},{"categorie":"Amenagement","nom":"Morceau de grillage","img":"fence"},{"categorie":"Arme","nom":"Pistolet à Eau (3 charges)","img":"watergun_3"},{"categorie":"Arme","nom":"Pistolet à Eau (2 charges)","img":"watergun_2"},{"categorie":"Arme","nom":"Pistolet à Eau (1 charge)","img":"watergun_1"},{"categorie":"Arme","nom":"Aqua-Splash (5 charges)","img":"watergun_opt_5"},{"categorie":"Arme","nom":"Aqua-Splash (4 charges)","img":"watergun_opt_4"},{"categorie":"Autre","nom":"Paquet de cigarettes entamé","img":"cigs"},{"categorie":"Autre","nom":"Calibrateur PDTT Mark II","img":"pilegun_upkit"},{"categorie":"Arme","nom":"Lance-pile Mark II (vide)","img":"pilegun_up_empty"},{"categorie":"Arme","nom":"Lance-pile Mark II (chargé)","img":"pilegun_up"},{"categorie":"Inutile","nom":"Pile broyée","img":"pile_broken"},{"categorie":"Ressource","nom":"Carton de matériaux","img":"rsc_pack_3"},{"categorie":"Ressource","nom":"Carton de matériaux","img":"rsc_pack_2"},{"categorie":"Ressource","nom":"Carton de matériaux","img":"rsc_pack_1"},{"categorie":"Objet_Defense","nom":"Portière de voiture","img":"car_door"},{"categorie":"Objet_Defense","nom":"Portière de voiture incomplète","img":"car_door_part"},{"categorie":"Autre","nom":"Fiole de poison","img":"poison"},{"categorie":"Autre","nom":"Produit corrosif","img":"poison_part"},{"categorie":"Provision","nom":"Ration d'eau","img":"water"},{"categorie":"Pharmacie","nom":"Stéroïdes Anabolisants","img":"drug"},{"categorie":"Provision","nom":"Boîte de Conserve ouverte","img":"can_open"},{"categorie":"Provision","nom":"Réserves d'un citoyen avisé","img":"chest_hero"},{"categorie":"Autre","nom":"Gros colis postal","img":"postal_box_xl"},{"categorie":"Autre","nom":"Colis postal","img":"postal_box"},null,{"categorie":"Provision","nom":"Boîte-déjeuner","img":"food_armag"},{"categorie":"Provision","nom":"Poignée de bonbons","img":"food_candies"},{"categorie":"Objet_Defense","nom":"Morceau de contreplaqué","img":"out_def"},null,{"categorie":"Objet_Defense","nom":"Torche","img":"torch"},{"categorie":"Arme","nom":"Torche consumée","img":"torch_off"},{"categorie":"Provision","nom":"Chamallows séchés","img":"chama"},{"categorie":"Provision","nom":"Chamallows calcinés","img":"chama_tasty"},{"categorie":"Autre","nom":"Caisse surprise","img":"chest_christmas_3"},{"categorie":"Autre","nom":"Caisse surprise","img":"chest_christmas_2"},{"categorie":"Autre","nom":"Caisse surprise","img":"chest_christmas_1"},{"categorie":"Autre","nom":"Un bout de papier","img":"rp_scroll"},{"categorie":"Autre","nom":"Un bonbon de Noël","img":"christmas_candy"},{"categorie":"Amenagement","nom":"Unité centrale","img":"pc"},{"categorie":"Plan","nom":"Coffre-fort","img":"safe"},{"categorie":"Autre","nom":"Une encyclopédie","img":"rp_twin"},{"categorie":"Provision","nom":"Bonbonne d'eau (vide)","img":"water_can_empty"},{"categorie":"Provision","nom":"Bonbonne d'eau (1 ration)","img":"water_can_1"},{"categorie":"Provision","nom":"Bonbonne d'eau (2 rations)","img":"water_can_2"},{"categorie":"Provision","nom":"Bonbonne d'eau (3 rations)","img":"water_can_3"},null,{"categorie":"Pharmacie","nom":"Betapropine 5mg périmée","img":"beta_drug_bad"},{"categorie":"Autre_Banni","nom":"Suintement cervical noir","img":"april_drug"},{"categorie":"Autre_Banni","nom":"Charognardes","img":"fruit_sub_part"},{"categorie":"Autre_Banni","nom":"Boule de pâte visqueuse","img":"fruit_part"},null,null,null,{"categorie":"Autre_Banni","nom":"Lambeau de chair","img":"flesh_part"},{"categorie":"Arme","nom":"Bombe macabre","img":"flesh"},{"categorie":"Autre_Banni","nom":"Substance épaisse","img":"pharma_part"},{"categorie":"Provision","nom":"Purée de charognardes","img":"fruit"},{"categorie":"Provision","nom":"Purée de charognardes","img":"fruit"},{"categorie":"Provision","nom":"Légume suspect","img":"vegetable"},{"categorie":"Autre","nom":"Eau croupie","img":"water_cup_part"},{"categorie":"Provision","nom":"Eau croupie purifiée","img":"water_cup"},{"categorie":"Autre_Banni","nom":"Note d'un citoyen banni","img":"banned_note"},null,null,null,null,{"categorie":"Autre","nom":"Pansement ensanglanté","img":"infect_poison_part"},null,{"categorie":"Provision","nom":"Ration d'eau","img":"water"},{"categorie":"Pharmacie","nom":"Stéroïdes Anabolisants","img":"drug"},{"categorie":"Provision","nom":"Boîte de Conserve ouverte","img":"can_open"},null,null,{"categorie":"Amenagement","nom":"Teddy n'Ours maudit","img":"teddy"},null,null,null,{"categorie":"Provision","nom":"Steak de sciure","img":"woodsteak"},{"categorie":"Autre","nom":"Veste rouge usée","img":"christmas_suit_1"},{"categorie":"Autre","nom":"Pantalon rouge déchiré","img":"christmas_suit_2"},{"categorie":"Autre","nom":"Bonnet rouge malodorant","img":"christmas_suit_3"},{"categorie":"Autre","nom":"Costume malodorant d'une autre époque","img":"christmas_suit_full"},{"categorie":"Arme","nom":"Téléphone portable","img":"iphone"},{"categorie":"Camping","nom":"Pelures de peau","img":"smelly_meat"},{"categorie":"Autre_Banni","nom":"Débris méconnaissables","img":"broken"},null,null,{"categorie":"Amenagement","nom":"MagLite Pif'Gadget (éteinte)","img":"maglite_off"},{"categorie":"Amenagement","nom":"MagLite Pif'Gadget (1 charge)","img":"maglite_1"},{"categorie":"Amenagement","nom":"MagLite Pif'Gadget (2 charges)","img":"maglite_2"},{"categorie":"Autre","nom":"Poudre Super-Fuzz","img":"firework_powder"},{"categorie":"Autre","nom":"Tube de lancement Floush","img":"firework_tube"},{"categorie":"Autre","nom":"Caisse de feux d'artifice","img":"firework_box"},{"categorie":"Autre","nom":"Cadavre d'un voyageur","img":"cadaver"},{"categorie":"Autre","nom":"Cadavre rongé","img":"cadaver_remains"},{"categorie":"Autre","nom":"Fumigène « Senteur Sapin »","img":"smoke_bomb"},{"categorie":"Autre","nom":"Citrouille molle","img":"pumpkin_raw"},{"categorie":"Amenagement","nom":"Citrouille molle sculptée","img":"pumpkin_off"},{"categorie":"Objet_Defense","nom":"Citrouille allumée","img":"pumpkin_on"},{"categorie":"Autre","nom":"Boules de sable","img":"sand_ball"},{"categorie":"Provision","nom":"Jus de mirabelle suspect","img":"omg_this_will_kill_you"},{"categorie":"Plan","nom":"Plan de chantier (commun)","img":"bplan_c"},{"categorie":"Plan","nom":"Plan de chantier (inhabituel)","img":"bplan_u"},{"categorie":"Plan","nom":"Plan de chantier (rare)","img":"bplan_r"},{"categorie":"Plan","nom":"Plan de chantier (très rare !)","img":"bplan_e"},{"categorie":"Plan","nom":"Coffre d'architecte","img":"bplan_box"},{"categorie":"Plan","nom":"Coffre d'architecte scellé","img":"bplan_box_e"},{"categorie":"Provision","nom":"Oeuf","img":"egg"},{"categorie":"Provision","nom":"Pomme","img":"apple"},{"categorie":"Arme","nom":"Pamplemousse explosif","img":"boomfruit"},{"categorie":"Plan","nom":"Sacoche usée","img":"bplan_drop"},null,null,null,null,null,null,{"categorie":"Ruine","nom":"Clé magnétique","img":"magneticKey"},{"categorie":"Ruine","nom":"Clé à percussion","img":"bumpKey"},{"categorie":"Ruine","nom":"Décapsuleur","img":"classicKey"},{"categorie":"Ruine","nom":"Empreinte de clé magnétique","img":"prints"},{"categorie":"Ruine","nom":"Empreinte de clé à percussion","img":"prints"},{"categorie":"Ruine","nom":"Empreinte de décapsuleur","img":"prints"},{"categorie":"Autre","nom":"Sérum pour Goule","img":"vagoul"},{"categorie":"Plan","nom":"Plan de chantier (inhabituel)","img":"bplan_u"},{"categorie":"Plan","nom":"Plan de chantier (rare)","img":"bplan_r"},{"categorie":"Plan","nom":"Plan de chantier (très rare !)","img":"bplan_e"},{"categorie":"Plan","nom":"Plan de chantier (inhabituel)","img":"bplan_u"},{"categorie":"Plan","nom":"Plan de chantier (rare)","img":"bplan_r"},{"categorie":"Plan","nom":"Plan de chantier (très rare !)","img":"bplan_e"},{"categorie":"Plan","nom":"Plan de chantier (inhabituel)","img":"bplan_u"},{"categorie":"Plan","nom":"Plan de chantier (rare)","img":"bplan_r"},{"categorie":"Plan","nom":"Plan de chantier (très rare !)","img":"bplan_e"},null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"categorie":"Chaman","nom":"Âme errante","img":"soul_blue"},{"categorie":"Chaman","nom":"Âme forte","img":"soul_red"},{"categorie":"Chaman","nom":"Âme faible","img":"soul_blue"}];
}

// Analyse la page, lance les modules correspondants
var analyser_page = function() {

	unsafeWindow.sab_analysed = true;
	var reglages = unsafeWindow.sab_options.charger_reglages();
	
	unsafeWindow.sab_cache.set_domaine("metacoa");
	if (reglages.meta_actif && unsafeWindow.sab_cache.get("redirect")) {
		unsafeWindow.sab_cache.set("redirect",false);
		unsafeWindow.sab_metacoa.creer_onglet();
		unsafeWindow.sab_metacoa.charger_onglet();
	} else {
		if ((reglages.mwl_actif) && ($sab('a.tid_user:not(.sab_tid_analysed)').length > 0))
			unsafeWindow.sab_MWL.analyser_tid();
		
		// if ((reglages.mwl_actif) && ($sab("div.maps table.table tr td.list ul li a strong").length > 0))
		if ((reglages.mwl_actif) && unsafeWindow.location.href.match(/ghost\/maps[;?]/))
			unsafeWindow.sab_MWL.lanch_analyse_ville();
		
		if ($sab("#generic_section > div.cityHome").length > 0)
			unsafeWindow.sab_resume_ville.creer_boutons();
			
		if (unsafeWindow.location.href.match(/city\/buildings;/))
			unsafeWindow.sab_chantiers.creer_boutons();
		
		if (unsafeWindow.location.href.match(/city\/co[;?]/))
			unsafeWindow.sab_annuaire.sauvegarder_ordre_citoyens();
		
		if (unsafeWindow.location.href.match(/city\/seeClint[;?]/))
			unsafeWindow.sab_annuaire.ajouter_boutons();
		
		if (unsafeWindow.location.href.match(/ghost\/options;/) && $sab("#allowExtern").length > 0)
			unsafeWindow.sab_options.creer_options();
		
		if (reglages.meta_actif) {
			if (unsafeWindow.location.href.match(/ghost\/user\?uid=[0-9]+;/))
				unsafeWindow.sab_metacoa.completer_ame();
		
			if (unsafeWindow.location.href.match(/ghost\/maps[;?]/))
				unsafeWindow.sab_metacoa.lister_jumps();
			else if (unsafeWindow.location.href.match(/ghost\//) && $sab("#ghost_pages ul.tabs").length > 0)
				unsafeWindow.sab_metacoa.creer_onglet();
		}
		
		if ((reglages.affichage_outside) && ($sab("#generic_section div.right ul.outInv").length > 0))
			unsafeWindow.sab_outside.creer_menu();
			
		if ($sab("#logs .logs").length > 0)
			unsafeWindow.sab_logs.creer_liste_items();
		
		if (unsafeWindow.sab_xml_hordes.est_autorise() && !unsafeWindow.sab_xml_hordes.est_a_jour()) {
		var callback = reglages.log_alertes ? unsafeWindow.sab_logs.afficher_alertes : function() {};
		unsafeWindow.sab_xml_hordes.charger_XML(callback);
	}
	}
	unsafeWindow.sab_serveur.send_set();
}

// première analyse. Le ondata ne se déclenche pas encore, on fait un pseudo Interval
var premiere_analyse = function () {
	// console.log("première analyse");
	if ((($sab("#generic_section").children().length == 0) && (unsafeWindow.sab_analysed == false) && ($sab("a.tid_user:not(.sab_tid_analysed").length == 0) && ($sab("a[href^='#ghost/user']").length == 0) && ($sab(".options").length == 0)) || unsafeWindow.sab_serveur.datas.loading_a_faire) {
		unsafeWindow.clearTimeout(unsafeWindow.sab_timerAnalyse);
		unsafeWindow.sab_timerAnalyse = window.setTimeout(premiere_analyse, 500);
	} else {
		if (unsafeWindow.sab_analysed == false) analyser_page();
	}
}

unsafeWindow.sab_analysed = false; // variable témoignant de l'état d'analyse de la page. Utile uniquement pour la première analyse.

unsafeWindow.sab_version = {
	infos : {
		num_chrome : "1.3.3.2",
		num_GM : "1.3.3.2",
		url_verif : "version.php",
		// url_maj_chrome	:	"https://chrome.google.com/webstore/detail/guizmus-hordes-script/ikjdppcbgfmjadncmhhkgmddgmgihafg",
		url_maj_chrome	:	"chrome://chrome/extensions/",
		url_maj_GM	:	"http://guizmus.fr/",
		espacement_verif : 3*60*1000
		// espacement_verif : 3*1000
	},
	verifier : function () {
		if (!unsafeWindow.sab_analysed) {
			window.setTimeout(unsafeWindow.sab_version.verifier, 500);
		} else {
			unsafeWindow.sab_cache.set_domaine("sab");
			var maj = unsafeWindow.sab_cache.get("last_v_check");
			var date = (new Date()).getTime();
			if ((maj == null) || (date > (new Date(maj)).getTime() + unsafeWindow.sab_version.infos.espacement_verif)) {
				unsafeWindow.sab_serveur.executer({
					type: 'POST',
					url : unsafeWindow.sab_serveur.datas.url_fixe+unsafeWindow.sab_version.infos.url_verif,
					data : {
						"current" : unsafeWindow.sab_version.infos["num_"+(unsafeWindow.chrome ? "chrome" : "GM")],
						"v" : unsafeWindow.chrome ? "chrome" : "GM"
					},
					success : function (ret) {
						var donnees = ret.version;
						if (donnees) {
							unsafeWindow.sab_cache.set_domaine("sab");
							unsafeWindow.sab_version.infos.num_verified = donnees;
							unsafeWindow.sab_cache.set("last_v_found",donnees);
							unsafeWindow.sab_cache.set("last_v_check",(new Date()).getTime());
							var a_valider = true;
						}
						var donnees = ret.avertissement;
						if (donnees) {
							unsafeWindow.sab_cache.set_domaine("sab");
							unsafeWindow.sab_version.infos.avertissement = donnees;
							unsafeWindow.sab_cache.set_long_term("avertissement_version",donnees);
						} else
							unsafeWindow.sab_cache.set_long_term("avertissement_version",false);
						if (a_valider)
							unsafeWindow.sab_version.valider_num_version();
					},
				});
			} else {
				unsafeWindow.sab_cache.set_domaine("sab");
				unsafeWindow.sab_version.infos.num_verified = unsafeWindow.sab_cache.get("last_v_found");
			}
			unsafeWindow.sab_version.valider_num_version();
		}
	},
	valider_num_version : function (num_version) {
		unsafeWindow.sab_cache.set_domaine("sab");
		var avertissement = unsafeWindow.sab_cache.get_long_term("avertissement_version");
		if ((typeof(this.infos.num_verified) != "undefined") && (this.infos.num_verified != null) && (this.infos.num_verified != this.infos["num_"+(unsafeWindow.chrome ? "chrome" : "GM")]) && ($sab("#sab_maj_version").length == 0))
			var img_maj = $sab("<img>")
				.attr({
					"id" : "sab_maj_version",
					"src" : "http://mush.twinoid.com/img/icons/ui/more.png",
					"onmouseout" : "js.HordeTip.hide(event)",
					"onmouseover" : "js.HordeTip.showHelp(this,\"MAJ de Guizmus'Script disponible<br/><i>Version <b>"+this.infos.num_verified+"</b></i><p style='color:white;' >"+(avertissement ? avertissement : "")+"</p>\");",
					onclick : "sab_version.mise_a_jour(this)"
				}).css({"position":"absolute","margin-top":"-185px","margin-left":"-5px"});
			// $sab('#clock').before("<img id='sab_maj_version' src='http://mush.twinoid.com/img/icons/ui/more.png' style='position:absolute;margin-top:-185px;margin-left:-5px' onmouseout='js.HordeTip.hide(event)' onmouseover='js.HordeTip.showHelp(this,\"MAJ de Guizmus&apos;Script disponible<br/><i>Version <b>"+this.infos.num_verified+"</b></i>"+(avertissement ? $sab('<span>').html("<p><i style=color:white;'>"+avertissement+"</i></p>").html() : "")+"\");' onclick='sab_version.mise_a_jour(this)'/>");
			$sab('#clock').before(img_maj);
	
	},
	mise_a_jour : function (bouton) {
		// window.open(this.infos["url_maj_"+(unsafeWindow.chrome ? "chrome" : "GM")]+"?v="+unsafeWindow.sab_version.infos.num_verified,"_top");
		// window.open(this.infos["url_maj_"+(unsafeWindow.chrome ? "chrome" : "GM")],"_top");
		window.open(unsafeWindow.sab_serveur.datas.url_fixe,"_blank");
	}
}

unsafeWindow.sab_timerAnalyse = false;
unsafeWindow.sab_timerServeur = false;

// hook pour le forum. plus gourmand, le chargement des pages du forum n'ayant été réussi à hooker.
// main du programme
unsafeWindow.sab_main = function() {
	// console.log("execution main");
	if (/\/tid\/forum/.test(unsafeWindow.location.href)) {
		var reglages = unsafeWindow.sab_options.charger_reglages();
		window.setInterval(function () {if ((reglages.mwl_actif) && ($sab('a.tid_user:not(.sab_tid_analysed)').length > 0)) unsafeWindow.sab_MWL.analyser_tid();},1000);
		unsafeWindow.sab_analysed = true;
	} else {
		unsafeWindow.sab_cache.set_domaine("reglages");
		var sk_actuel = unsafeWindow.location.href.match(/\?sk=([0-9a-z]+)/);
		sk_actuel = sk_actuel ? sk_actuel[1] : false;
		if (typeof(sk_actuel)!="undefined") {
			if ( (null == unsafeWindow.sab_cache.get("clef_serveur")) || (unsafeWindow.sab_cache.get("sk_loaded") != sk_actuel) ) {
				// unsafeWindow.sab_serveur.datas.loading_a_faire = true;
				unsafeWindow.sab_serveur.datas.loading_a_faire = true;
				unsafeWindow.sab_serveur.execution_identifee(unsafeWindow.sab_serveur.load_session(unsafeWindow.sab_main));
			}
		}
	// hook de la fonction d'analyse de la page après le chargement. Ne fonctionne pas sur le forum
	// crédit au remplacement de XMLHTTPRequest : https://gist.github.com/3183154
	// permet le hook sous chrome
		if (!unsafeWindow.sab_main.hooked) {
			var send = window.XMLHttpRequest.prototype.send,
				onReadyStateChange;
			function sendReplacement(data) {
				if(this.onreadystatechange) {
					this._onreadystatechange = this.onreadystatechange;
				}
				this.onreadystatechange = onReadyStateChangeReplacement;
				return send.apply(this, arguments);
			}
			function onReadyStateChangeReplacement() {
				if(this._onreadystatechange) {
					var temp = this._onreadystatechange.apply(this, arguments);
					if (this.readyState == 4) {
						unsafeWindow.clearTimeout(unsafeWindow.sab_timerAnalyse);
						unsafeWindow.sab_analysed = false;
						unsafeWindow.sab_timerAnalyse = window.setTimeout(premiere_analyse, 500);
						// analyser_page();
					}
					return temp;
				}
			}
			window.XMLHttpRequest.prototype.send = sendReplacement;
			unsafeWindow.sab_main.hooked = true;
		}
		unsafeWindow.sab_version.verifier();
		unsafeWindow.clearTimeout(unsafeWindow.sab_timerAnalyse);
		unsafeWindow.sab_timerAnalyse = window.setTimeout(premiere_analyse, 500);
		unsafeWindow.sab_timerServeur = window.setTimeout(unsafeWindow.sab_serveur.send_set, 10000);
	}
}// fin main

unsafeWindow.sab_cache.set_domaine("reglages");
var last_loading = unsafeWindow.sab_cache.get("last_loading");
if (typeof(last_loading) != "number") last_loading = 0;
var time_now = (new Date()).getTime();
unsafeWindow.sab_cache.set("last_loading",time_now);
if (time_now - last_loading > 20*60*1000) {
// if (time_now - last_loading > 3*1000) {
	unsafeWindow.sab_serveur.datas.loading_a_faire = true;
	unsafeWindow.sab_serveur.execution_identifee(unsafeWindow.sab_serveur.load_session(unsafeWindow.sab_main));
} else unsafeWindow.sab_main();

}); // fin onload

}) // fin load_and_execute
}; // fin compatibilité chrome @include