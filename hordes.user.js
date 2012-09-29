// ==UserScript==
// @name        Guizmus' Horde script
// @namespace   horde
// @include     http://www.hordes.fr/*
// @include     www.hordes.fr/*
// @include     hordes.fr/*
// @version     1.0.0
// @grant		none
// ==/UserScript==

// compatibilité chrome : @include
if(location.href.match('hordes.fr')) {

// compatibilité chrome jQuery
if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	if (typeof(unsafeWindow) == "undefined")
		var unsafeWindow = window;
	var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
} else {
	var loadAndExecute = function(url,f) {
		return f();
	}
}
loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
if (typeof(unsafeWindow) == "undefined")
	var unsafeWindow = window;

// modification de l'ajax jquery pour accepter le crossdomaine
jQuery.ajax = (function(_ajax){
   
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from {html} where url="{URL}"';
   
    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }
   
    return function(o) {
        var url = o.url;
		
		if (isExternal(url) && /get/i.test(o.type) && !/json/i.test(o.dataType)) {
			o.url = YQL;
			o.dataType = 'json';
		   
			o.data = {
				q: query.replace(
					'{URL}',
					url + (o.data ?
						(/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
					: '')
				).replace(
					'{html}',
					o.ext ? o.ext : 'html'
				),
				format: o.format || 'xml'
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
   
})(jQuery.ajax);

// selector econtains pour jQuery. permet un matching strict sans prise en compte de la case.
$.expr[":"].econtains = function(obj, index, meta, stack){
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

})(jQuery);

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
})(jQuery, document);

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
return'"'+string+'"';};})(jQuery);

// cache, actuellement en cookies
unsafeWindow.sab_cache = {
	domaine : "sab_",
	set_domaine : function (domaine) {
		this.domaine = "sab_"+domaine+"_";
	},
	get : function (key) {
		return ($.cookie(this.domaine+key) == null) ? null : $.parseJSON($.cookie(this.domaine+key));
	},
	set : function (key,value) {
		$.cookie(this.domaine+key,$.toJSON(value),{ path: '/' });
	},
	set_long_term : function (key,value,date) {
		$.cookie(this.domaine+key,$.toJSON(value),{ path: '/', expires : date });
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
				$.each(this.noms_a_analyser,function(x,c) {
					jQuery.ajax({
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
				jQuery.ajax({
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
		var datas = unsafeWindow.sab_cache.get(nom);
		var rating = $("<span style='position:relative' class='sab_rating'>"+(datas.plaintes==""?"":datas.plaintes+"<img onmouseout='js.HordeTip.hide(event)' onmouseover='js.HordeTip.showHelp(this,\"Cliquez pour avoir le détail des plaintes\");' src='http://data.hordes.fr/gfx/icons/item_soul_blue.gif' alt='plaintes' style='cursor:pointer' onclick='sab_MWL.detail_plaintes(\""+nom+"\")' title='plaintes'/> ")+(datas.recomms==""?"":datas.recomms+"<img src='http://www.hordes.fr/gfx/forum/smiley/h_blink.gif' alt='recos.' title='recos.'/>")+"</span>");
		$.each($("a.tid_user"),function(x,a) {
			var sanitize = $(a).contents().first().text().trim().toLowerCase();
			if ((sanitize == datas.name) && ($(".sab_rating",$(a).parent()).length == 0))
				$(a).after(rating);
		});
	},
	sanitize_name : function (name) {
		var sanitize = $(name).contents().first().text().trim().toLowerCase();
		return sanitize;
	},
	analyser_tid : function () {
		unsafeWindow.sab_cache.set_domaine("tida");
		this.noms_a_analyser = Array();
		$.each($("a.tid_user:not(.sab_tid_analysed)"),function (x,a) {
			$(a).addClass("sab_tid_analysed");
			var nom = unsafeWindow.sab_MWL.sanitize_name(a);
			if (unsafeWindow.sab_cache.get(nom))
				unsafeWindow.sab_MWL.display_rating(nom);
			else
				unsafeWindow.sab_MWL.ajouter_nom(nom);
		});
		this.callback = function (res) {
			unsafeWindow.sab_cache.set_domaine("tida");
			var citizens = $.xml2json(jQuery.parseXML(res.responseText));
			$.each(citizens.citizen ? citizens.citizen : Array(),function(x,c){
				unsafeWindow.sab_cache.set(c.name,{name : c.name, plaintes : c.plaintes, recomms : c.recomms});
				unsafeWindow.sab_MWL.display_rating(c.name);
			});
		};
		this.query("");
	},
	analyse_a_effectuer : false,
	analyser_ville : function () {
		if (!this.analyse_a_effectuer) return false;
		
		if ($("div.maps table.table tr td.list ul li a strong").length  == 0) {
			window.setTimeout(this.analyser_ville, 200);
			return false;
		}
		this.analyse_a_effectuer = false;
		var MWL = this;
		MWL.init();
		$.each($("div.maps table.table tr td.list ul li"),function(a,el){
			el = $(el);
			var e = $("a strong",el);
			var nom_minuscule = MWL.sanitize_name(e);
			if (!el.is("#MWL_"+nom_minuscule)) {
				MWL.ajouter_nom(nom_minuscule);
				el.attr("id","MWL_"+nom_minuscule);
			}
		});
		var tableau = $("<table>").css({
			"border-collapse" : "collapse",
			"cellpadding" : "0px",
			"margin" : "auto",
		});
		
		tableau.append($("<tr>").append($("<td colspan=2></td>").append($("div.maps table.table tr td.list a.hide")),$("<td>Plaintes</td><td>Recos.</td></tr>")));
			
		var lu = $("div.maps table.table tr td.list ul");
		lu.parent().attr("onmouseout","js.HordeTip.hide(event)");
		$.each($("li a",lu),function(x,c){
			var name = MWL.sanitize_name(c);
			if ($("#MWL_"+name).length > 0) {
				var li = $("#MWL_"+name);
				var nv_ligne = $("<tr>");
				nv_ligne.append($("<td>").append($("img",li)));
				nv_ligne.append($("<td>").append($("a",li).attr("id","MWL_"+name)));
				nv_ligne.append($("<td colspan=2>En cours...</td>"));
				tableau.append(nv_ligne);
			}
		});
		lu.parent().append(tableau);
		if ($("li a",lu).length == 0)
			lu[0].parentNode.removeChild(lu[0]);
		
		MWL.callback = function (i) {
			var citizens = $.xml2json(jQuery.parseXML(i.responseText));
			$.each(citizens.citizen,function(x,c){
				if ($("#MWL_"+c.name).length > 0) {
					var a = $("#MWL_"+c.name);
					a.parent().next().remove();
					c.plaintes = parseInt(c.plaintes == "" ? 0 : c.plaintes);
					a.parent().parent().append($("<td>"+(c.plaintes > 0 ? c.plaintes+" <img style='cursor:pointer;display:inline-block;float:right' onclick='sab_MWL.detail_plaintes(\""+a.text().trim()+"\")' src='/gfx/icons/item_soul_"+(c.plaintes>=10 ? "red" : "blue")+".gif'/>" : "")+"</td>"));
					c.recomms = parseInt(c.recomms == "" ? 0 : c.recomms);
					a.parent().parent().append($("<td>"+( c.recomms > 0 ? c.recomms+" <img src='http://data.twinoid.com/img/smile/square/"+(c.recomms>=10 ? "happy" : "smile")+".png'/>" : "")+"</td>"));
					// a.parent().parent().append($("<td>"+((c.recomms >= 10) ? "<strong>"+c.recomms+"</strong>" : c.recomms)+"</td>"));
				}
			});
		};
		MWL.query();
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
		this.api_key = unsafeWindow.sab_cache.get('api_key');
		return (typeof(this.api_key) == "string")
	},
	maj_key : function () {
		var date = new Date();
		date.setTime(date.getTime() + (15 * 24 * 60 * 60 * 1000));
		if ($("#allowExternScript").length == 1)
			if ($("#allowExternScript").attr("checked") === "checked") {
				this.api_key = $("div.key input.field[name='ek']").attr("value");
				unsafeWindow.sab_cache.set_domaine("reglages");
				unsafeWindow.sab_cache.set_long_term("api_key",this.api_key,date);
			} else {
				this.api_key = null;
				unsafeWindow.sab_cache.set_domaine("reglages");
				unsafeWindow.sab_cache.set("api_key",null);
			}
	},
	creer_bouton_autorisation_api : function () {
		if ($("#allowExternScript").length == 0) {
			unsafeWindow.sab_cache.set_domaine("reglages");
			var case_cochee = unsafeWindow.sab_cache.get('api_key');
			$("#allowExtern").parent().after("<div class='row'><label>Autoriser le script à utiliser la clef</label><input type='checkbox' name='allowExternScript' id='allowExternScript' value="+(case_cochee === null ? 0 : 1)+" "+(case_cochee === null ? "" :"checked=checked")+" "+($("#allowExtern").prop("checked") ? "" : "disabled ")+"onclick='sab_xml_hordes.maj_key()'>");
		}
	},
	charger_XML : function (callback) {
		var date = new Date();
		date.setTime(date.getTime() + (5 * 60 * 1000));
		$.ajax({
			url : "xml?k="+unsafeWindow.sab_xml_hordes.api_key,
			success : function (res) {
				var datas = $.xml2json(res);
				unsafeWindow.sab_cache.set_domaine("banque");
				unsafeWindow.sab_cache.set("iconurl",datas.headers.iconurl,date);
				var items = new Array();
				$.each(datas.data.bank.item, function (x,item) {
					items.push(item.id+":"+item.count);
				});
				unsafeWindow.sab_cache.set_long_term("contenu",items.join(";"),date);
				callback();
			}
		});
	}
}

// Page vue d'ensemble de la ville
unsafeWindow.sab_resume_ville = {
	creer_boutons : function () {
		var bouton_1 = $(" <a class='inlineButton sab_temp' onclick='sab_resume_ville.preparer_form_analyse_atk(this);'>Analyser l'attaque</span>");
		$("#generic_section div.cityHome ul.ul:has(img[src='/gfx/icons/small_human.gif']) li").last().append(bouton_1);
		$(bouton_1).parent().parent().append("<li><a class='inlineButton' onclick='sab_resume_ville.maj_bbh();'>MàJ BBH</span></li>");
		// var bouton_1 = $(" <a class='inlineButton sab_temp' onclick='sab_resume_ville.preparer_form_analyse_atk(this);'>Analyser l'attaque</span>");
		// $("#generic_section > div.cityHome a.button").prev().children().last().append(bouton_1);
		// $(bouton_1).parent().parent().append("<li><a class='inlineButton' onclick='unsafeWindow.sab_resume_ville.maj_bbh();'>MàJ BBH</span></li>");
		
	},
	// analyse de l'attaque
	// pull les données d'un programme python développé par ma part
	// http://pythonanywhere.com/ (serveur python libre, hébergement d'une webapp gratuit)
	preparer_form_analyse_atk : function (button) {
		var ul = $(button).parent().parent();
		var defense = $("ul.statusSummary li.left strong span").contents()[0].textContent.trim();
		var attaque = $("ul.statusSummary li.mid strong").contents()[0].textContent.trim().split(" ");
		var citoyens = $("img[src='/gfx/icons/small_human.gif']").prev().text().trim();
		$(".sab_temp").remove();
		ul.after("<h2>Analyse de l'attaque</h2><ul class='ul'><li>Défense prévue : <input name='sab_def' class='sab_data' type='text' onsubmit='return false' value='"+defense+"'/></li><li>Attaque min : <input name='sab_atk_min' class='sab_data' type='text' onsubmit='return false' value='"+attaque[0]+"'/></li><li>Attaque maxi : <input name='sab_atk_max' class='sab_data' type='text' onsubmit='return false' value='"+attaque[attaque.length-1]+"'/></li><li>Citoyens dormant en ville : <input type='text' name='sab_citoyen' class='sab_data' onsubmit='return false' value='"+citoyens+"'/></li><li><a class='sab_temp inlineButton' onclick='sab_resume_ville.executer_analyse(); return false'>Lancer l'analyse</a></li></ul>");
	},
	executer_analyse : function () {
		var datas = Array();
		$(".sab_data").each(function(x,a){
			datas[$(a).attr("name")] = $(a).attr("value");
		})
		$.ajax({
			type: 'GET',
			url : "http://guizmus.pythonanywhere.com/stats/"+datas['sab_atk_min']+"/"+datas['sab_atk_max']+"/"+datas['sab_def']+"/"+datas['sab_citoyen'],
			success : function (res) {
				$(".sab_resume_ville").parent().remove();
				$(".sab_temp").parent().after("<li><div class='sab_resume_ville' style='background-color:black;color:white;border: 1px solid white;padding:10px;'>"+res.responseText+"</div></li>");
			},
			ext : 'html'
		});
	},
	maj_bbh : function (){
		var a = $("<iframe src='http://bbh.fred26.fr/'></iframe>");
		$(a).css({
			display:"none"
		})
		$(a).attr("onload","$(this).remove()");
		$("body").append(a);
	}
}

// Page chantiers
unsafeWindow.sab_chantiers = {
	creer_boutons : function () {
		$("#generic_section div.bvote ul.tabs").prev().html("Chantiers <input type='checkbox' checked disabled/>disponibles <input name='sab_chantiers_indispos' type='checkbox' onchange='sab_chantiers.afficher_indisponibles(this)' onmouseout='js.HordeTip.hide(event)' onmouseover='js.HordeTip.showHelp(this,\"Attention! opération lourde, bloque la page quelques instants.\");'/>indisponibles");
	},
	afficher_indisponibles : function (afficher) {
		if ($(afficher).prop('checked')) {
			if ($(".sab_chantier_non_dispo").length > 0) {
				$(".sab_chantier_non_dispo").css({display:''});
			} else {
				this.construire_indisponibles();
			}
		} else {
			$(".sab_chantier_non_dispo").css({display:'none'});
		}
	},
	construire_indisponibles : function () {
		if (typeof(this.infos_chantiers) == "undefined") {
			this.load_chantiers();
		}
		$.each(this.infos_chantiers, function (x, chantier) {
			if (typeof(chantier) != "undefined")
				unsafeWindow.sab_chantiers.construire_ligne(chantier.id);
		});
	},
	construire_ligne : function (chantier) {
		chantier = this.infos_chantiers[chantier];
		if (typeof(chantier) == "undefined")
			return false;
		var est_construit = this.tr_chantier_est_construit(chantier);
		if (est_construit) {
			return est_construit;
		}
		
		var el = this.construire_tr_chantier(chantier);
		this.infos_chantiers[chantier.id].element = el;
		$(this.construire_ligne(chantier.parent)).after(el);
		return el;
	},
	tr_chantier_est_construit : function (chantier) {
		return chantier.element || $(".sab_taged_chantier_"+chantier.id)[0] || $("#generic_section div.bvote tr.building:has(strong:econtains('"+chantier.name+"'))")[0];
	},
	infos_chantier : function (chantier) {
		var id_chantier = chantier.id;
		return (!this.infos_chantiers[id_chantier].categorie) ? this.remonter_parents(this.infos_chantiers[id_chantier]) : this.infos_chantiers[id_chantier];
	},
	construire_tr_chantier : function (chantier) {
		var datas = this.infos_chantier(chantier);
		var sortie = $("<tr>").addClass("building").addClass("sab_chantier_non_dispo").addClass("sab_taged_chantier_"+datas.id);
		
		sortie.append($("<td class='btype btype_"+datas.categorie+"'>&nbsp;</td>"));
		
		var td = $("<td>").attr("class","important").css("color","black");
		for (var i = 0; i < datas.nb_parents; i++)
			td.append($('<img src="/gfx/icons/small_parent.gif" alt="">'));
		td.append($('<img src="/gfx/icons/'+datas.img+'.gif" alt="icon" title="">'));
		td.append($("<strong> "+datas.name+"</strong>"));
		if (datas.temporaire == "1")
			td.append($(' <img src="http://data.hordes.fr/gfx/icons/small_warning.gif">'));
		if ((datas.plan) && (parseInt(datas.plan) > 0))  {
			td.append($('<img style="float:right" src="gfx/icons/item_'+unsafeWindow.detail_items_bbh[datas.plan].img+'.gif">'));
		}
		sortie.append(td);
		
		sortie.append($('<td class="important def">'+(parseInt(datas.def) > 0 ? datas.def+' <img src="/gfx/icons/small_def.gif" alt="icon" title="">' : '')+'</td>'));

		td = $("<td>").addClass("rsc");
		var list_requis = $("<div>").addClass("list");
		list_requis.append($('<div class="rscItem"><img src="/gfx/loc/fr/small_pa.gif" alt=""> '+datas.ap+'</div>'));
		$.each(datas.items,function (x,item) {
			list_requis.append($('<div class="rscItem"><img src="gfx/icons/item_'+unsafeWindow.detail_items_bbh[item.id].img+'.gif" alt=""> '+item.count+'</div>'));
		});
		td.append(list_requis);
		sortie.append(td);
		sortie.append($('<td class="act">&nbsp;</td>'));
		return sortie;
	},
	// private, transforme la BDD chantier en un array, index = id_chantier
	load_chantiers : function () {
		this.infos_chantiers = new Array();
		var chantier;
		while (chantier = unsafeWindow.detail_chantiers.pop()) {
			this.infos_chantiers[parseInt(chantier.id)] = chantier;
			$("#generic_section div.bvote tr.building:has(strong:econtains('"+chantier.name+"'))").addClass("sab_taged_chantier_"+chantier.id);
		}
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

// Page outremonde
unsafeWindow.sab_outside = {
	creer_menu : function () {
		if (($("#generic_section div.right:has(ul.outInv)").length > 0) && ($("#sab_outside_menu").length == 0)) {
			$("#generic_section div.right:has('ul.outInv')").after($('<div class="clear"></div><ul id="sab_outside_menu" class="tabs" style="margin-bottom:0;"><li style="border-radius:5px;padding-left:3px;padding-right:3px;">Et en ville, que se passe il?</li><li><a href="'+window.location.hash+'" style="cursor:pointer" onclick="sab_outside.charger_contenu(\'charger_banque\')">Banque</span></li><li><a href="'+window.location.hash+'" style="cursor:pointer" onclick="sab_outside.charger_contenu(\'charger_attaque\')">Défense/attaque</span></li></ul><div id="sab_outside_content"></div>'));
			$("#sab_outside_content").css({ 
				"padding" : "5px",
				"margin-bottom" : "7px",
				"text-align" : "justify",
				"background-color" : "#9A8652",
				"-moz-border-radius" : "10px"
			});
		}
		// $("#sab_outside_menu").append(bouton);
	},
	charger_contenu : function (fonction) {
		$("#sab_outside_content").html(this[fonction]());
	},
	charger_banque : function () {
		var retour = $("<ul class='tools shortTools nada cityInv stocks' id='sab_banque' style='margin-bottom:0'><li class='clear'></li></ul>");
		unsafeWindow.sab_cache.set_domaine("banque");
		var contenu_banque = unsafeWindow.sab_cache.get("contenu");
		if (unsafeWindow.sab_xml_hordes.est_autorise()) {
			if (contenu_banque == null) {
				unsafeWindow.sab_xml_hordes.charger_XML(function() {
					unsafeWindow.sab_outside.afficher_contenu_banque(null);
				});
				return retour;
			}
		} else {
			return $("<span>Pour afficher le contenu de la banque, veuillez activer le script dans les réglages.</span>");
		}
		return this.afficher_contenu_banque(retour);
	},
	afficher_contenu_banque : function (hook) {
		if (hook == null)
			hook = $("#sab_banque");
		unsafeWindow.sab_cache.set_domaine("banque");
		var contenu_banque = unsafeWindow.sab_cache.get("contenu");
		var iconurl = unsafeWindow.sab_cache.get("iconurl");
		var items = contenu_banque.split(";")
		$.each(items, function (x,item) {
			var item_datas = item.split(":");
			var details_item = unsafeWindow.detail_items_bbh[item_datas[0]];
			var nouvel_objet = $("<li>").attr("class","multi");
			nouvel_objet.append($("<a>").attr("onmouseout", "js.HordeTip.hide(event)").attr("onmouseover","js.HordeTip.showTip(this,\""+details_item.nom+" <img src='"+iconurl+"item_"+details_item.img+".gif' alt='item'/>\",\""+item_datas[1]+" en banque\", event)").append($("<img alt='item' src='"+iconurl+"item_"+details_item.img+".gif'/> <span class='count'>"+item_datas[1]+"</span>")));
			// ordre : ressource / provision / 
			if ($("."+details_item.categorie,hook).length == 0) {
				if (details_item.categorie == "ressource") {
					hook.children().first().after($("<li class='clear'></li><li class='group "+details_item.categorie+"'>"+details_item.categorie+"</li><li class='clear'></li>"));
				} else {
					 hook.children().last().before($("<li class='clear'></li><li class='group "+details_item.categorie+"'>"+details_item.categorie+"</li><li class='clear'></li>"));
				}
			};
			$("."+details_item.categorie,hook).next().after(nouvel_objet);
		});
		return hook;
	},
	charger_attaque : function () {
		return $("<span>En cours d'implémentation...</span>");
	}
}

// Page gazette
unsafeWindow.sab_logs = {
	masquer_tous : function () {
		$("ul.logs .entry").css({display:'none'});
	},
	afficher_tous : function () {
		$("ul.logs .entry").css({display:''});
	},
	afficher_item : function (nom) {
		$("ul.logs .entry:has(.tool img[src*='item_"+nom+".gif'])").css({display:''});
	},
	afficher_categorie : function (categorie) {
		$("ul.logs .CL_"+categorie).css({display:''});
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
		$("ul.logs .entry:visible")
	},
	extraire_nom_item : function (img) {
		var reg_src_item = /\/item_(.*).gif/;
		return reg_src_item.exec($(img).attr("src"))[1]
	},
	creer_liste_items : function () {
		var liste_items = new Array();
		var items_vus = new Array();
		$.each($("ul.logs .entry .tool img"), function (x,img) {
			var nom = unsafeWindow.sab_logs.extraire_nom_item(img);
			if ($.inArray(nom,items_vus) < 0) {
				items_vus.push(nom);
				liste_items.push({
					nom : nom,
					img : $(img).clone(),
					nom_fr : $(img).parent().text().trim()
				});
			}
		});
		liste_items.sort(function(a, b) {
			return a.nom_fr.toUpperCase().localeCompare(b.nom_fr.toUpperCase());
		})
		
		var menu = $("<select>").attr("onchange","sab_logs.filtrer(this.value)");
		menu.append($("<option value=''>[ Voir tous ]</option>"));
		menu.append($("<option value='gestion_eau'>[ Gestion de l'eau ]</option>"));
		$.each(liste_items,function (x,o) {
			menu.append($("<option value='"+o.nom+"'></option>").append(o.img).append(o.nom_fr));
		});
		var sortie = $("<div class='crit'></div>").append("<label>Objets :</label>").append(menu);
		
		var hook = $(".crit").last();
		hook.after(sortie);
	},
	filtrer : function (item) {
		if (item == '')
			return this.afficher_tous();
		if (item == "gestion_eau")
			return this.afficher_eau();
		this.masquer_tous();
		this.afficher_item(item);
	}
}

// BDDs statiques
if (true) {
	unsafeWindow.detail_chantiers = [{"id":"1010","name":"Muraille","categorie":"wall1","parent":"0","def":"10","img":"small_wallimprove","temporaire":"0","plan":"0","ap":"30","items":[{"id":"59","count":"6"},{"id":"60","count":"4"}]},{"id":"1011","name":"Pompe","categorie":"pump","parent":"0","def":"0","img":"small_water","temporaire":"0","plan":"0","ap":"25","items":[{"id":"60","count":"8"},{"id":"84","count":"1"}]},{"id":"1012","name":"Renforts d'urgence","parent":"1074","def":"10","img":"item_wood_plate","temporaire":"1","plan":"0","ap":"30","items":[{"id":"59","count":"8"}]},{"id":"1013","name":"Champs piégés","parent":"1074","def":"15","img":"small_trap","temporaire":"1","plan":"305","ap":"12","items":[{"id":"59","count":"6"}]},{"id":"1014","name":"Guerilla","parent":"1074","def":"35","img":"small_trap","temporaire":"1","plan":"307","ap":"24","items":[{"id":"41","count":"2"},{"id":"59","count":"2"},{"id":"60","count":"1"}]},{"id":"1015","name":"Catapulte primitive","parent":"1050","def":"0","img":"item_courroie","temporaire":"0","plan":"305","ap":"40","items":[{"id":"59","count":"2"},{"id":"60","count":"1"},{"id":"159","count":"1"},{"id":"160","count":"1"}]},{"id":"1019","name":"Tas de détritus","parent":"1074","def":"5","img":"small_dig","temporaire":"1","plan":"0","ap":"10","items":[{"id":"59","count":"2"},{"id":"60","count":"2"}]},{"id":"1020","name":"Purificateur","parent":"1011","def":"0","img":"item_jerrycan","temporaire":"0","plan":"0","ap":"75","items":[{"id":"41","count":"1"},{"id":"59","count":"5"},{"id":"60","count":"6"},{"id":"84","count":"3"}]},{"id":"1021","name":"Boucherie","parent":"1033","def":"0","img":"item_meat","temporaire":"0","plan":"306","ap":"40","items":[{"id":"59","count":"9"},{"id":"60","count":"4"}]},{"id":"1022","name":"Mont pointu","parent":"1019","def":"60","img":"small_dig","temporaire":"1","plan":"305","ap":"40","items":[{"id":"60","count":"2"}]},{"id":"1023","name":"Grand fossé","parent":"1010","def":"10","img":"small_gather","temporaire":"0","plan":"0","ap":"80","items":[{"id":"59","count":"8"}]},{"id":"1024","name":"Muraille rasoir","parent":"1010","def":"50","img":"item_plate","temporaire":"0","plan":"306","ap":"40","items":[{"id":"41","count":"5"},{"id":"60","count":"15"}]},{"id":"1025","name":"Fixations de défenses","parent":"1033","def":"0","img":"item_meca_parts","temporaire":"0","plan":"307","ap":"50","items":[{"id":"41","count":"3"},{"id":"159","count":"7"},{"id":"160","count":"8"}]},{"id":"1026","name":"Potager","parent":"1011","def":"0","img":"item_vegetable_tasty","temporaire":"0","plan":"305","ap":"60","items":[{"id":"1","count":"10"},{"id":"95","count":"1"},{"id":"159","count":"10"}]},{"id":"1027","name":"Fosse à pieux","parent":"1023","def":"25","img":"small_spears","temporaire":"0","plan":"306","ap":"60","items":[{"id":"59","count":"20"}]},{"id":"1028","name":"Barbelés","parent":"1010","def":"5","img":"small_barbed","temporaire":"0","plan":"0","ap":"20","items":[{"id":"60","count":"2"}]},{"id":"1029","name":"Foreuse puits","parent":"1011","def":"0","img":"small_water","temporaire":"0","plan":"305","ap":"60","items":[{"id":"159","count":"7"},{"id":"160","count":"2"}]},{"id":"1030","name":"Projet Eden","parent":"1029","def":"0","img":"small_eden","temporaire":"0","plan":"307","ap":"65","items":[{"id":"73","count":"5"},{"id":"159","count":"5"},{"id":"160","count":"8"}]},{"id":"1031","name":"Remparts avancés","parent":"1010","def":"20","img":"small_wallimprove","temporaire":"0","plan":"305","ap":"40","items":[{"id":"41","count":"6"},{"id":"159","count":"9"},{"id":"160","count":"6"}]},{"id":"1032","name":"Champ mines eau","parent":"1020","def":"115","img":"item_bgrenade","temporaire":"1","plan":"306","ap":"40","items":[{"id":"1","count":"10"},{"id":"60","count":"3"},{"id":"73","count":"1"},{"id":"132","count":"1"}]},{"id":"1033","name":"Atelier","categorie":"command","parent":"0","def":"0","img":"small_refine","temporaire":"0","plan":"0","ap":"25","items":[{"id":"59","count":"10"},{"id":"60","count":"8"}]},{"id":"1034","name":"Piston verrou","parent":"1062","def":"15","img":"small_door_closed","temporaire":"0","plan":"305","ap":"24","items":[{"id":"41","count":"4"},{"id":"59","count":"10"},{"id":"84","count":"1"},{"id":"160","count":"3"}]},{"id":"1035","name":"Scanner","parent":"1050","def":"0","img":"item_tagger","temporaire":"0","plan":"306","ap":"20","items":[{"id":"2","count":"2"},{"id":"41","count":"1"},{"id":"101","count":"1"},{"id":"105","count":"2"}]},{"id":"1036","name":"Poutres renfort","parent":"1031","def":"25","img":"item_plate","temporaire":"0","plan":"305","ap":"55","items":[{"id":"41","count":"2"},{"id":"159","count":"1"},{"id":"160","count":"3"}]},{"id":"1037","name":"Muraille à pointes","parent":"1031","def":"45","img":"item_plate","temporaire":"0","plan":"306","ap":"35","items":[{"id":"59","count":"5"},{"id":"60","count":"20"},{"id":"134","count":"1"}]},{"id":"1039","name":"Vaporisateur","parent":"1060","def":"35","img":"small_waterspray","temporaire":"0","plan":"0","ap":"50","items":[{"id":"1","count":"10"},{"id":"41","count":"1"},{"id":"59","count":"10"},{"id":"160","count":"7"}]},{"id":"1040","name":"Sanibroyeur","parent":"1060","def":"50","img":"small_grinder","temporaire":"0","plan":"305","ap":"55","items":[{"id":"64","count":"2"},{"id":"84","count":"2"},{"id":"159","count":"2"},{"id":"160","count":"10"}]},{"id":"1041","name":"Douves","parent":"1023","def":"65","img":"small_waterhole","temporaire":"0","plan":"305","ap":"50","items":[{"id":"1","count":"20"}]},{"id":"1042","name":"Carte améliorée","parent":"1050","def":"0","img":"item_electro","temporaire":"0","plan":"306","ap":"15","items":[{"id":"2","count":"2"},{"id":"60","count":"1"},{"id":"101","count":"1"},{"id":"105","count":"2"}]},{"id":"1043","name":"Canon à briques","parent":"1046","def":"25","img":"small_canon","temporaire":"0","plan":"0","ap":"60","items":[{"id":"84","count":"1"},{"id":"101","count":"2"},{"id":"134","count":"3"},{"id":"159","count":"5"},{"id":"160","count":"5"}]},{"id":"1044","name":"Pièges à loups","parent":"1074","def":"20","img":"small_trap","temporaire":"1","plan":"0","ap":"20","items":[{"id":"60","count":"2"},{"id":"74","count":"3"}]},{"id":"1045","name":"Crémato cue","parent":"1021","def":"0","img":"item_hmeat","temporaire":"0","plan":"307","ap":"45","items":[{"id":"159","count":"8"},{"id":"160","count":"1"}]},{"id":"1046","name":"Monticules à canons","parent":"1033","def":"15","img":"small_dig","temporaire":"0","plan":"0","ap":"50","items":[{"id":"134","count":"1"},{"id":"159","count":"7"},{"id":"160","count":"1"}]},{"id":"1047","name":"Perforeuse","parent":"1046","def":"55","img":"small_canon","temporaire":"0","plan":"306","ap":"30","items":[{"id":"41","count":"4"},{"id":"84","count":"1"},{"id":"101","count":"1"},{"id":"160","count":"10"}]},{"id":"1048","name":"Lance-Grenailles","parent":"1046","def":"60","img":"small_canon","temporaire":"0","plan":"305","ap":"35","items":[{"id":"41","count":"5"},{"id":"64","count":"3"},{"id":"73","count":"3"},{"id":"159","count":"5"},{"id":"160","count":"1"}]},{"id":"1049","name":"Tourniquet","parent":"1046","def":"10","img":"item_wood_beam","temporaire":"0","plan":"306","ap":"15","items":[{"id":"159","count":"2"},{"id":"160","count":"1"}]},{"id":"1050","name":"Tour de guet","categorie":"tower","parent":"0","def":"5","img":"item_tagger","temporaire":"0","plan":"0","ap":"12","items":[{"id":"59","count":"3"},{"id":"60","count":"2"}]},{"id":"1051","name":"Fondations","categorie":"fondations","parent":"0","def":"0","img":"small_building","temporaire":"0","plan":"0","ap":"30","items":[{"id":"59","count":"10"},{"id":"60","count":"8"}]},{"id":"1052","name":"Grand déménagement","parent":"1051","def":"255","img":"small_moving","temporaire":"0","plan":"308","ap":"500","items":[{"id":"134","count":"3"},{"id":"159","count":"12"},{"id":"160","count":"5"}]},{"id":"1053","name":"Derrick","parent":"1051","def":"0","img":"small_derrick","temporaire":"0","plan":"306","ap":"70","items":[{"id":"159","count":"10"},{"id":"160","count":"15"}]},{"id":"1054","name":"Râpe à zombies","parent":"1010","def":"55","img":"small_grater","temporaire":"0","plan":"305","ap":"60","items":[{"id":"41","count":"3"},{"id":"60","count":"20"},{"id":"64","count":"3"}]},{"id":"1055","name":"Oubliettes","parent":"1010","def":"25","img":"small_gather","temporaire":"0","plan":"306","ap":"65","items":[{"id":"59","count":"15"}]},{"id":"1056","name":"Grogro mur","parent":"1031","def":"80","img":"item_plate","temporaire":"0","plan":"305","ap":"50","items":[{"id":"59","count":"10"},{"id":"134","count":"2"},{"id":"159","count":"15"},{"id":"160","count":"10"}]},{"id":"1057","name":"Fausse ville","parent":"1051","def":"200","img":"small_falsecity","temporaire":"0","plan":"307","ap":"300","items":[{"id":"41","count":"6"},{"id":"159","count":"20"},{"id":"160","count":"15"}]},{"id":"1058","name":"Barrières","parent":"1010","def":"15","img":"small_fence","temporaire":"0","plan":"0","ap":"50","items":[{"id":"41","count":"2"},{"id":"159","count":"5"}]},{"id":"1059","name":"Arroseurs auto","parent":"1060","def":"135","img":"small_sprinkler","temporaire":"0","plan":"307","ap":"50","items":[{"id":"1","count":"20"},{"id":"84","count":"1"},{"id":"159","count":"7"},{"id":"160","count":"15"}]},{"id":"1060","name":"Réseau hydraulique","parent":"1011","def":"0","img":"item_firework_tube","temporaire":"0","plan":"305","ap":"40","items":[{"id":"41","count":"3"},{"id":"60","count":"5"},{"id":"84","count":"2"},{"id":"160","count":"5"}]},{"id":"1061","name":"Robinetterie","parent":"1051","def":"0","img":"small_valve","temporaire":"0","plan":"307","ap":"130","items":[{"id":"39","count":"1"},{"id":"41","count":"2"},{"id":"60","count":"10"},{"id":"159","count":"6"},{"id":"160","count":"3"}]},{"id":"1062","name":"Portail","categorie":"doorLock","parent":"0","def":"0","img":"small_door_closed","temporaire":"0","plan":"0","ap":"16","items":[{"id":"60","count":"2"}]},{"id":"1064","name":"Planificateur","parent":"1050","def":"0","img":"item_tagger","temporaire":"0","plan":"305","ap":"20","items":[{"id":"81","count":"1"},{"id":"101","count":"1"}]},{"id":"1065","name":"Manufacture","parent":"1033","def":"0","img":"small_factory","temporaire":"0","plan":"0","ap":"40","items":[{"id":"159","count":"5"},{"id":"160","count":"5"},{"id":"170","count":"1"}]},{"id":"1066","name":"Appâts","parent":"1028","def":"50","img":"small_meatbarbed","temporaire":"1","plan":"306","ap":"10","items":[{"id":"157","count":"3"}]},{"id":"1067","name":"Scies hurlantes","parent":"1033","def":"45","img":"small_saw","temporaire":"0","plan":"306","ap":"65","items":[{"id":"41","count":"3"},{"id":"60","count":"5"},{"id":"81","count":"3"},{"id":"160","count":"2"}]},{"id":"1068","name":"Dynamitage","parent":"1074","def":"35","img":"small_tnt","temporaire":"1","plan":"305","ap":"20","items":[{"id":"73","count":"3"}]},{"id":"1069","name":"Blindage d'entrée","parent":"1062","def":"5","img":"item_plate","temporaire":"0","plan":"0","ap":"35","items":[{"id":"59","count":"3"}]},{"id":"1070","name":"Seconde couche","parent":"1031","def":"55","img":"item_plate","temporaire":"0","plan":"306","ap":"65","items":[{"id":"59","count":"35"},{"id":"160","count":"5"}]},{"id":"1071","name":"Muraille évolutive","parent":"1031","def":"55","img":"item_home_def","temporaire":"0","plan":"308","ap":"65","items":[{"id":"59","count":"5"},{"id":"60","count":"20"},{"id":"134","count":"1"}]},{"id":"1072","name":"Scrutateur","parent":"1050","def":"0","img":"small_gather","temporaire":"0","plan":"305","ap":"30","items":[{"id":"101","count":"1"},{"id":"159","count":"3"},{"id":"160","count":"1"},{"id":"170","count":"1"}]},{"id":"1073","name":"Aqua tourelles","parent":"1011","def":"10","img":"item_tube","temporaire":"0","plan":"306","ap":"60","items":[{"id":"1","count":"40"},{"id":"84","count":"1"},{"id":"160","count":"10"}]},{"id":"1074","name":"Dispositifs d'urgence","parent":"1050","def":"10","img":"status_terror","temporaire":"0","plan":"0","ap":"40","items":[{"id":"59","count":"5"},{"id":"60","count":"7"}]},{"id":"1075","name":"Registre chantier","parent":"1033","def":"0","img":"item_rp_book2","temporaire":"0","plan":"0","ap":"15","items":[{"id":"170","count":"1"}]},{"id":"1076","name":"Potence","parent":"1033","def":"0","img":"r_dhang","temporaire":"0","plan":"0","ap":"13","items":[{"id":"159","count":"1"},{"id":"196","count":"1"}]},{"id":"1077","name":"Catapulte calibrée","parent":"1015","def":"0","img":"item_courroie","temporaire":"0","plan":"306","ap":"30","items":[{"id":"40","count":"1"},{"id":"59","count":"2"},{"id":"60","count":"2"},{"id":"101","count":"2"}]},{"id":"1100","name":"Canon brutal","parent":"1046","def":"25","img":"small_canon","temporaire":"1","plan":"0","ap":"24","items":[{"id":"64","count":"2"},{"id":"160","count":"1"}]},{"id":"1101","name":"Architectoire","parent":"1075","def":"0","img":"small_refine","temporaire":"0","plan":"0","ap":"75","items":[{"id":"51","count":"1"},{"id":"69","count":"1"},{"id":"159","count":"10"}]},{"id":"1102","name":"Abattoir","parent":"1033","def":"35","img":"small_slaughterhouse","temporaire":"0","plan":"305","ap":"40","items":[{"id":"134","count":"2"},{"id":"160","count":"10"}]},{"id":"1103","name":"Supports défensifs","parent":"1033","def":"0","img":"item_shield","temporaire":"0","plan":"308","ap":"55","items":[{"id":"159","count":"5"},{"id":"160","count":"15"}]},{"id":"1104","name":"Cantine à bois","parent":"1033","def":"0","img":"small_cafet","temporaire":"1","plan":"306","ap":"6","items":[{"id":"1","count":"1"},{"id":"59","count":"2"},{"id":"95","count":"1"}]},{"id":"1105","name":"Cimetière cadenassé","parent":"1033","def":"0","img":"small_cemetery","temporaire":"0","plan":"305","ap":"36","items":[{"id":"41","count":"1"},{"id":"59","count":"10"}]},{"id":"1106","name":"Cercueils sur ressort","parent":"1105","def":"0","img":"small_coffin","temporaire":"0","plan":"308","ap":"100","items":[{"id":"40","count":"1"},{"id":"41","count":"2"},{"id":"59","count":"5"},{"id":"60","count":"15"}]},{"id":"1107","name":"Cantine centrale","parent":"1033","def":"0","img":"small_cafet","temporaire":"0","plan":"307","ap":"20","items":[{"id":"95","count":"1"},{"id":"159","count":"5"},{"id":"160","count":"1"},{"id":"170","count":"1"}]},{"id":"1108","name":"Laboratoire central","parent":"1033","def":"0","img":"item_acid","temporaire":"0","plan":"307","ap":"30","items":[{"id":"41","count":"3"},{"id":"95","count":"5"},{"id":"159","count":"3"},{"id":"160","count":"10"}]},{"id":"1109","name":"Poulailler","parent":"1033","def":"0","img":"small_chicken","temporaire":"0","plan":"307","ap":"40","items":[{"id":"42","count":"3"},{"id":"59","count":"5"},{"id":"84","count":"1"},{"id":"159","count":"5"}]},{"id":"1110","name":"Infirmerie","parent":"1033","def":"0","img":"small_infirmary","temporaire":"0","plan":"308","ap":"40","items":[{"id":"95","count":"6"},{"id":"136","count":"1"},{"id":"159","count":"5"},{"id":"160","count":"5"}]},{"id":"1111","name":"Stratégies citoyennes","parent":"1033","def":"0","img":"small_strategy","temporaire":"0","plan":"308","ap":"60","items":[{"id":"41","count":"3"},{"id":"159","count":"10"},{"id":"160","count":"5"}]},{"id":"1112","name":"Quartiers circulaires","parent":"1033","def":"0","img":"small_strategy","temporaire":"0","plan":"308","ap":"60","items":[{"id":"41","count":"3"},{"id":"159","count":"15"},{"id":"160","count":"15"}]},{"id":"1113","name":"Champs d'épouvantails","parent":"1051","def":"15","img":"small_scarecrow","temporaire":"0","plan":"0","ap":"35","items":[{"id":"59","count":"15"},{"id":"81","count":"2"}]},{"id":"1114","name":"Décharge publique","parent":"1051","def":"0","img":"small_trash","temporaire":"0","plan":"0","ap":"70","items":[{"id":"134","count":"5"},{"id":"159","count":"15"},{"id":"160","count":"15"}]},{"id":"1115","name":"Décharge humidifiée","parent":"1114","def":"75","img":"small_trash","temporaire":"0","plan":"308","ap":"120","items":[{"id":"1","count":"20"},{"id":"159","count":"15"},{"id":"160","count":"10"}]},{"id":"1116","name":"Décharge blindée","parent":"1114","def":"0","img":"small_trash","temporaire":"0","plan":"307","ap":"40","items":[{"id":"41","count":"3"},{"id":"60","count":"8"}]},{"id":"1117","name":"Décharge piégée","parent":"1114","def":"0","img":"small_trash","temporaire":"0","plan":"307","ap":"20","items":[{"id":"41","count":"1"},{"id":"60","count":"8"}]},{"id":"1118","name":"Appâts odorants","parent":"1114","def":"0","img":"small_trash","temporaire":"0","plan":"306","ap":"20","items":[{"id":"59","count":"15"}]},{"id":"1119","name":"Déchardes de bois","parent":"1114","def":"0","img":"small_trash","temporaire":"0","plan":"306","ap":"30","items":[{"id":"41","count":"1"},{"id":"59","count":"5"},{"id":"60","count":"5"}]},{"id":"1120","name":"Ferraillerie","parent":"1114","def":"0","img":"small_trash","temporaire":"0","plan":"306","ap":"30","items":[{"id":"59","count":"5"},{"id":"60","count":"5"}]},{"id":"1122","name":"Cage à viande","parent":"1051","def":"0","img":"small_fleshcage","temporaire":"0","plan":"306","ap":"40","items":[{"id":"41","count":"2"},{"id":"60","count":"8"},{"id":"128","count":"1"},{"id":"159","count":"1"}]},{"id":"1123","name":"Enclos","parent":"1114","def":"0","img":"small_howlingbait","temporaire":"0","plan":"306","ap":"30","items":[{"id":"159","count":"10"}]},{"id":"1124","name":"Phare","parent":"1051","def":"0","img":"small_lighthouse","temporaire":"0","plan":"306","ap":"30","items":[{"id":"101","count":"2"},{"id":"159","count":"5"},{"id":"160","count":"5"}]},{"id":"1125","name":"Habitations fortifiées","parent":"1051","def":"0","img":"small_city_up","temporaire":"0","plan":"307","ap":"50","items":[{"id":"134","count":"2"},{"id":"159","count":"15"},{"id":"160","count":"10"}]},{"id":"1126","name":"Feu de joie","parent":"1051","def":"30","img":"small_score","temporaire":"1","plan":"307","ap":"15","items":[{"id":"26","count":"1"},{"id":"59","count":"5"}]},{"id":"1127","name":"Dictature des héros","parent":"1051","def":"0","img":"small_court","temporaire":"0","plan":"307","ap":"12","items":[{"id":"59","count":"6"},{"id":"160","count":"5"},{"id":"170","count":"1"}]},{"id":"1128","name":"Bureau des esclavagistes","parent":"1051","def":"0","img":"small_slave","temporaire":"0","plan":"308","ap":"45","items":[{"id":"159","count":"10"},{"id":"160","count":"5"},{"id":"196","count":"2"}]},{"id":"1130","name":"Cinéma","parent":"1051","def":"0","img":"small_cinema","temporaire":"0","plan":"308","ap":"100","items":[{"id":"101","count":"3"},{"id":"159","count":"15"},{"id":"160","count":"5"},{"id":"186","count":"1"},{"id":"187","count":"1"}]},{"id":"1131","name":"Montgolfière","parent":"1051","def":"0","img":"small_balloon","temporaire":"0","plan":"308","ap":"100","items":[{"id":"41","count":"6"},{"id":"54","count":"4"},{"id":"159","count":"5"},{"id":"160","count":"5"}]},{"id":"1132","name":"Labyrinthe","parent":"1051","def":"85","img":"small_labyrinth","temporaire":"0","plan":"307","ap":"200","items":[{"id":"41","count":"2"},{"id":"59","count":"40"},{"id":"60","count":"10"},{"id":"134","count":"4"}]},{"id":"1133","name":"Dernière chance","parent":"1051","def":"55","img":"small_lastchance","temporaire":"0","plan":"307","ap":"150","items":[{"id":"41","count":"4"},{"id":"159","count":"15"},{"id":"160","count":"10"}]},{"id":"1134","name":"Roquettes","parent":"1051","def":"0","img":"small_rocket","temporaire":"1","plan":"308","ap":"50","items":[{"id":"1","count":"10"},{"id":"41","count":"1"},{"id":"60","count":"5"},{"id":"73","count":"1"},{"id":"132","count":"2"}]},{"id":"1135","name":"Feux d'artifices","parent":"1051","def":"0","img":"small_fireworks","temporaire":"0","plan":"308","ap":"50","items":[{"id":"41","count":"1"},{"id":"73","count":"4"},{"id":"132","count":"2"},{"id":"159","count":"3"},{"id":"160","count":"3"}]},{"id":"1136","name":"Autel de la rédemption","parent":"1051","def":"0","img":"small_redemption","temporaire":"0","plan":"307","ap":"24","items":[{"id":"43","count":"1"},{"id":"159","count":"3"},{"id":"160","count":"2"}]},{"id":"1137","name":"PMV géant","parent":"1051","def":"0","img":"small_pmvbig","temporaire":"0","plan":"308","ap":"300","items":[{"id":"41","count":"2"},{"id":"60","count":"30"}]},{"id":"1138","name":"Statue du Corbeau","parent":"1051","def":"0","img":"small_crow","temporaire":"0","plan":"308","ap":"300","items":[{"id":"74","count":"3"},{"id":"159","count":"35"}]},{"id":"1139","name":"Grande roue de Grostas","parent":"1051","def":"0","img":"small_wheel","temporaire":"0","plan":"308","ap":"300","items":[{"id":"1","count":"20"},{"id":"41","count":"5"},{"id":"134","count":"3"},{"id":"160","count":"5"}]},{"id":"1140","name":"Château de sable","parent":"1051","def":"0","img":"small_castle","temporaire":"0","plan":"308","ap":"300","items":[{"id":"1","count":"30"},{"id":"159","count":"15"},{"id":"160","count":"10"}]},{"id":"1141","name":"Percée","parent":"1011","def":"0","img":"item_tube","temporaire":"1","plan":"305","ap":"12","items":[{"id":"59","count":"2"},{"id":"60","count":"1"}]},{"id":"1142","name":"Pluvio-canons","parent":"1011","def":"80","img":"small_watercanon","temporaire":"0","plan":"306","ap":"40","items":[{"id":"1","count":"15"},{"id":"59","count":"5"},{"id":"60","count":"5"},{"id":"160","count":"5"}]},{"id":"1143","name":"Filtre","parent":"1020","def":"0","img":"item_jerrycan","temporaire":"0","plan":"307","ap":"50","items":[{"id":"60","count":"10"},{"id":"101","count":"2"},{"id":"204","count":"1"}]},{"id":"1144","name":"Pamplemousses explosifs","parent":"1026","def":"0","img":"item_bgrenade","temporaire":"0","plan":"306","ap":"30","items":[{"id":"1","count":"10"},{"id":"59","count":"5"},{"id":"73","count":"5"}]},{"id":"1145","name":"Fertilisation sauvage","parent":"1026","def":"0","img":"item_digger","temporaire":"0","plan":"307","ap":"30","items":[{"id":"1","count":"10"},{"id":"51","count":"2"},{"id":"60","count":"5"},{"id":"95","count":"8"}]},{"id":"1146","name":"Pommier de l'outre-monde","parent":"1011","def":"0","img":"small_appletree","temporaire":"0","plan":"308","ap":"30","items":[{"id":"1","count":"10"},{"id":"74","count":"2"},{"id":"95","count":"3"},{"id":"159","count":"1"}]},{"id":"1149","name":"Douches","parent":"1060","def":"0","img":"small_shower","temporaire":"0","plan":"306","ap":"25","items":[{"id":"1","count":"5"},{"id":"59","count":"4"},{"id":"60","count":"1"},{"id":"84","count":"1"}]},{"id":"1150","name":"Caniveaux","parent":"1011","def":"60","img":"small_shower","temporaire":"0","plan":"305","ap":"50","items":[{"id":"1","count":"15"},{"id":"59","count":"10"}]},{"id":"1151","name":"Rid'eau","parent":"1011","def":"35","img":"small_shower","temporaire":"0","plan":"307","ap":"20","items":[{"id":"1","count":"10"}]},{"id":"1152","name":"Roquette foreuse","parent":"1011","def":"0","img":"small_rocketperf","temporaire":"0","plan":"308","ap":"100","items":[{"id":"73","count":"1"},{"id":"84","count":"1"},{"id":"132","count":"1"},{"id":"159","count":"5"},{"id":"160","count":"5"}]},{"id":"1153","name":"Détecteur à eau","parent":"1011","def":"0","img":"small_waterdetect","temporaire":"0","plan":"308","ap":"130","items":[{"id":"101","count":"5"},{"id":"159","count":"5"},{"id":"160","count":"10"}]},{"id":"1155","name":"Conduite d'aération","parent":"1062","def":"20","img":"small_ventilation","temporaire":"0","plan":"307","ap":"24","items":[{"id":"41","count":"1"},{"id":"60","count":"8"}]},{"id":"1156","name":"Palissade","parent":"1010","def":"45","img":"small_fence","temporaire":"0","plan":"305","ap":"50","items":[{"id":"41","count":"2"},{"id":"59","count":"20"},{"id":"159","count":"5"}]},{"id":"1157","name":"Troisième couche","parent":"1070","def":"80","img":"item_plate","temporaire":"0","plan":"305","ap":"65","items":[{"id":"60","count":"30"},{"id":"64","count":"5"},{"id":"160","count":"5"}]},{"id":"1158","name":"Bétonnade","parent":"1031","def":"50","img":"small_wallimprove","temporaire":"0","plan":"307","ap":"60","items":[{"id":"134","count":"6"},{"id":"160","count":"2"}]},{"id":"1159","name":"Mur savonné","parent":"1010","def":"60","img":"small_wallimprove","temporaire":"0","plan":"306","ap":"40","items":[{"id":"1","count":"10"},{"id":"95","count":"6"},{"id":"134","count":"1"}]},{"id":"1160","name":"Pulvérisateur","parent":"1010","def":"0","img":"small_waterspray","temporaire":"0","plan":"306","ap":"50","items":[{"id":"41","count":"2"},{"id":"60","count":"10"},{"id":"84","count":"1"},{"id":"160","count":"2"}]},{"id":"1161","name":"Projection acide","parent":"1160","def":"35","img":"small_acidspray","temporaire":"1","plan":"0","ap":"30","items":[{"id":"1","count":"2"},{"id":"95","count":"5"}]},{"id":"1162","name":"Neurotoxine","parent":"1160","def":"110","img":"small_gazspray","temporaire":"1","plan":"306","ap":"40","items":[{"id":"1","count":"2"},{"id":"51","count":"3"},{"id":"95","count":"7"}]},{"id":"1163","name":"Cloison en bois","parent":"1010","def":"25","img":"item_plate","temporaire":"0","plan":"305","ap":"30","items":[{"id":"59","count":"15"},{"id":"60","count":"5"}]},{"id":"1164","name":"Cloison métallique","parent":"1010","def":"25","img":"item_plate","temporaire":"0","plan":"305","ap":"30","items":[{"id":"59","count":"5"},{"id":"60","count":"10"}]},{"id":"1165","name":"Cloison épaisse","parent":"1010","def":"30","img":"item_plate","temporaire":"0","plan":"306","ap":"30","items":[{"id":"59","count":"10"},{"id":"60","count":"10"}]},{"id":"1166","name":"Contre-plaqué","parent":"1010","def":"15","img":"item_plate","temporaire":"0","plan":"305","ap":"30","items":[{"id":"59","count":"5"},{"id":"60","count":"5"}]},{"id":"1167","name":"Bastion","parent":"1010","def":"45","img":"item_plate","temporaire":"0","plan":"306","ap":"30","items":[{"id":"59","count":"15"},{"id":"60","count":"15"}]},{"id":"1168","name":"Panique","parent":"1074","def":"30","img":"status_terror","temporaire":"1","plan":"0","ap":"25","items":[{"id":"1","count":"4"},{"id":"59","count":"5"},{"id":"60","count":"5"}]},{"id":"1169","name":"La Bamba","parent":"1074","def":"75","img":"small_bamba","temporaire":"1","plan":"307","ap":"50","items":[{"id":"59","count":"5"},{"id":"60","count":"5"},{"id":"105","count":"3"}]},{"id":"1170","name":"Tour des gardiens","parent":"1050","def":"15","img":"small_watchmen","temporaire":"0","plan":"306","ap":"24","items":[{"id":"41","count":"1"},{"id":"64","count":"1"},{"id":"159","count":"10"},{"id":"160","count":"2"}]},{"id":"1171","name":"Tour des éclaireurs","parent":"1050","def":"10","img":"small_watchmen","temporaire":"0","plan":"307","ap":"36","items":[{"id":"41","count":"1"},{"id":"159","count":"5"},{"id":"160","count":"1"}]},{"id":"1172","name":"Décharge organisée","parent":"1114","def":"0","img":"small_trashclean","temporaire":"0","plan":"307","ap":"30","items":[{"id":"41","count":"2"},{"id":"134","count":"1"},{"id":"159","count":"10"},{"id":"160","count":"6"},{"id":"169","count":"2"}]},{"id":"1173","name":"Réacteur soviétique","parent":"1051","def":"500","img":"small_arma","temporaire":"0","plan":"308","ap":"100","items":[{"id":"2","count":"10"},{"id":"39","count":"1"},{"id":"101","count":"4"},{"id":"134","count":"2"},{"id":"160","count":"15"}]},{"id":"1174","name":"Poupée Vaudou XXL","parent":"1074","def":"200","img":"small_vaudoudoll","temporaire":"1","plan":"0","ap":"40","items":[{"id":"1","count":"2"},{"id":"41","count":"3"},{"id":"60","count":"2"},{"id":"64","count":"8"},{"id":"352","count":"5"}]},{"id":"1175","name":"Guillotine à Bokor","parent":"1074","def":"300","img":"small_bokorsword","temporaire":"1","plan":"0","ap":"60","items":[{"id":"64","count":"9"},{"id":"159","count":"8"},{"id":"160","count":"7"},{"id":"352","count":"8"}]},{"id":"1176","name":"Mirage Spirituel","parent":"1074","def":"100","img":"small_spiritmirage","temporaire":"1","plan":"0","ap":"30","items":[{"id":"59","count":"6"},{"id":"64","count":"6"},{"id":"159","count":"6"},{"id":"352","count":"3"}]},{"id":"1177","name":"Pluie Bénite","parent":"1074","def":"200","img":"small_holyrain","temporaire":"1","plan":"0","ap":"40","items":[{"id":"1","count":"7"},{"id":"59","count":"8"},{"id":"159","count":"9"},{"id":"352","count":"5"}]}];
	unsafeWindow.detail_items_bbh = [null,{"categorie":"provision","nom":"Ration d'eau","img":"water"},{"categorie":"autre","nom":"Pile","img":"pile"},{"categorie":"provision","nom":"Boîte de Conserve","img":"can"},{"categorie":"provision","nom":"Boîte de Conserve ouverte","img":"can_open"},{"categorie":"arme","nom":"Lance-Pile 1-PDTG (chargé)","img":"pilegun"},null,{"categorie":"arme","nom":"Taser d'auto-défense","img":"taser"},{"categorie":"arme","nom":"Aqua-Splash (vide)","img":"watergun_opt_empty"},{"categorie":"arme","nom":"Batteur électrique (chargé)","img":"mixergun"},{"categorie":"arme","nom":"Tronçonneuse (chargée)","img":"chainsaw"},{"categorie":"arme","nom":"Tondeuse à gazon","img":"lawn"},null,{"categorie":"arme","nom":"Clé à Molette","img":"wrench"},{"categorie":"arme","nom":"Tournevis","img":"screw"},{"categorie":"arme","nom":"Grand Bâton Sec","img":"staff"},{"categorie":"arme","nom":"Couteau à dents","img":"knife"},{"categorie":"arme","nom":"Coupe-coupe","img":"cutcut"},{"categorie":"arme","nom":"Canif dérisoire","img":"small_knife"},{"categorie":"arme","nom":"Couteau Suisse","img":"swiss_knife"},{"categorie":"arme","nom":"Cutter","img":"cutter"},null,{"categorie":"sacs","nom":"Caddie","img":"cart"},{"categorie":"autre","nom":"Ouvre-boîte","img":"can_opener"},null,{"categorie":"sacs","nom":"Sac supplémentaire","img":"bag"},{"categorie":"autre","nom":"Boîte d'allumettes","img":"lights"},null,{"categorie":"pharmacie","nom":"Piqûre de calmant","img":"xanax"},{"categorie":"amenagement","nom":"Rocking Chair","img":"chair"},{"categorie":"autre","nom":"Livre poussiéreux","img":"rp_book"},{"categorie":"defense","nom":"Matelas","img":"bed"},{"categorie":"amenagement","nom":"Lampe de chevet éteinte","img":"lamp"},{"categorie":"amenagement","nom":"Tapis Persan","img":"carpet"},{"categorie":"amenagement","nom":"Petite chaîne HiFi en panne","img":"music_part"},{"categorie":"amenagement","nom":"Chaîne de Porte + cadenas","img":"lock"},{"categorie":"amenagement","nom":"Paillasson","img":"door_carpet"},null,{"categorie":"autre","nom":"Dés","img":"dice"},{"categorie":"autre","nom":"Moteur","img":"engine"},{"categorie":"autre","nom":"Courroie","img":"courroie"},{"categorie":"ressource","nom":"Poignée de vis et écrous","img":"meca_parts"},{"categorie":"arme","nom":"Poule","img":"pet_chick"},{"categorie":"arme","nom":"Cochon malodorant","img":"pet_pig"},{"categorie":"arme","nom":"Rat géant","img":"pet_rat"},{"categorie":"defense","nom":"Chien hargneux","img":"pet_dog"},{"categorie":"arme","nom":"Gros chat mignon","img":"pet_cat"},{"categorie":"arme","nom":"Serpent de 2 mètres","img":"pet_snake"},{"categorie":"pharmacie","nom":"Petit manche vibrant (chargé)","img":"vibr"},null,null,{"categorie":"pharmacie","nom":"Stéroïdes Anabolisants","img":"drug"},{"categorie":"provision","nom":"Steak appétissant","img":"meat"},{"categorie":"provision","nom":"Viande indéfinissable","img":"undef"},{"categorie":"autre","nom":"Toile de tente","img":"sheet"},null,{"categorie":"sacs","nom":"Sac super-pratique","img":"bagxl"},null,{"categorie":"autre","nom":"Jerrycan plein","img":"jerrycan"},{"categorie":"ressource","nom":"Planche tordue","img":"wood2"},{"categorie":"ressource","nom":"Ferraille","img":"metal"},null,{"categorie":"arme","nom":"Bombe à eau","img":"grenade"},null,{"categorie":"defense","nom":"Plaque de tôle","img":"plate"},{"categorie":"autre","nom":"Pompe à Jerrycan (démontée)","img":"jerrygun_part"},{"categorie":"pharmacie","nom":"Bandage rudimentaire","img":"bandage"},null,null,{"categorie":"provision","nom":"Vodka Marinostov","img":"vodka"},{"categorie":"arme","nom":"Pompe à Jerrycan (vide)","img":"jerrygun_off"},null,null,{"categorie":"autre","nom":"Explosifs bruts","img":"explo"},{"categorie":"provision","nom":"Viande Humaine","img":"hmeat"},null,{"categorie":"autre","nom":"Sac plastique","img":"grenade_empty"},{"categorie":"arme","nom":"Bombe à eau explosive","img":"bgrenade"},{"categorie":"autre","nom":"Sac plastique + explosif","img":"bgrenade_empty"},{"categorie":"autre","nom":"Tronçonneuse incomplète","img":"chainsaw_part"},{"categorie":"autre","nom":"Batteur incomplet","img":"mixergun_part"},{"categorie":"autre","nom":"Rustine","img":"rustine"},{"categorie":"autre","nom":"Tondeuse démontée","img":"lawn_part"},null,{"categorie":"ressource","nom":"Tube de cuivre","img":"tube"},{"categorie":"sacs","nom":"Caddie bancal","img":"cart_part"},null,null,{"categorie":"sacs","nom":"Ceinture à poches","img":"pocket_belt"},{"categorie":"provision","nom":"Twinoïde 500mg","img":"drug_hero"},{"categorie":"autre","nom":"Boîte en métal","img":"chest"},{"categorie":"autre","nom":"Gros coffre en métal","img":"chest_xl"},{"categorie":"autre","nom":"Caisse de matériel","img":"chest_tools"},{"categorie":"amenagement","nom":"Lampe de chevet allumée","img":"lamp_on"},{"categorie":"amenagement","nom":"Petite Chaîne HiFi allumée","img":"music"},{"categorie":"pharmacie","nom":"Produits pharmaceutiques","img":"pharma"},{"categorie":"autre","nom":"Fragments de tôle","img":"plate_raw"},{"categorie":"provision","nom":"« Debout-les-Morts »","img":"rhum"},{"categorie":"provision","nom":"Café brûlant","img":"coffee"},{"categorie":"amenagement","nom":"Cafetière","img":"coffee_machine"},{"categorie":"autre","nom":"Cafetière incomplète","img":"coffee_machine_part"},{"categorie":"ressource","nom":"Composant électronique","img":"electro"},{"categorie":"autre","nom":"Affaires d'un citoyen","img":"chest_citizen"},{"categorie":"pharmacie","nom":"Hydratone 100mg","img":"drug_water"},{"categorie":"amenagement","nom":"Radio K7 éteint","img":"radio_off"},{"categorie":"amenagement","nom":"Radio K7","img":"radio_on"},{"categorie":"autre","nom":"Cyanure","img":"cyanure"},{"categorie":"defense","nom":"Vieille porte","img":"door"},{"categorie":"provision","nom":"Légume suspect","img":"vegetable"},{"categorie":"autre","nom":"Kit de bricolage abimé","img":"repair_kit_part"},{"categorie":"autre","nom":"Kit de bricolage","img":"repair_kit"},{"categorie":"arme","nom":"Pistolet à Eau (vide)","img":"watergun_empty"},{"categorie":"arme","nom":"Aqua-Splash (3 charges)","img":"watergun_opt_3"},{"categorie":"arme","nom":"Aqua-Splash (2 charges)","img":"watergun_opt_2"},{"categorie":"arme","nom":"Aqua-Splash (1 charge)","img":"watergun_opt_1"},{"categorie":"arme","nom":"Batteur électrique (éteint)","img":"mixergun_empty"},{"categorie":"arme","nom":"Tronçonneuse (éteinte)","img":"chainsaw_empty"},{"categorie":"arme","nom":"Lance-Pile 1-PDTG (vide)","img":"pilegun_empty"},{"categorie":"arme","nom":"Taser d'auto-défense (éteint)","img":"taser_empty"},{"categorie":"autre","nom":"Sport-Elec (éteint)","img":"sport_elec_empty"},{"categorie":"autre","nom":"Sport-Elec (chargé)","img":"sport_elec"},null,{"categorie":"arme","nom":"Devastator (vide)","img":"big_pgun_empty"},{"categorie":"arme","nom":"Devastator (chargé)","img":"big_pgun"},{"categorie":"autre","nom":"Devastator incomplet","img":"big_pgun_part"},{"categorie":"autre","nom":"Balise « Radius »","img":"tagger"},{"categorie":"autre","nom":"Fusée éclairante","img":"flare"},{"categorie":"arme","nom":"Pompe à Jerrycan (prête)","img":"jerrygun"},{"categorie":"arme","nom":"Chaise Ektörp-Gluten","img":"chair_basic"},{"categorie":"amenagement","nom":"Revolver (vide)","img":"gun"},{"categorie":"amenagement","nom":"Fusil d'assaut (vide)","img":"machine_gun"},null,{"categorie":"autre","nom":"Détonateur compact","img":"deto"},{"categorie":"autre","nom":"Sac de Ciment","img":"concrete"},{"categorie":"defense","nom":"Pavés de béton informes","img":"concrete_wall"},{"categorie":"pharmacie","nom":"Médicament sans étiquette","img":"drug_random"},{"categorie":"pharmacie","nom":"Paracétoïde 7g","img":"disinfect"},{"categorie":"autre","nom":"Désherbant Ness-Quick","img":"digger"},{"categorie":"provision","nom":"Caisse de nourriture","img":"chest_food"},{"categorie":"provision","nom":"Doggy-bag","img":"food_bag"},{"categorie":"provision","nom":"Paquet de chips molles","img":"food_bar1"},{"categorie":"provision","nom":"Napolitains moisis","img":"food_bar2"},{"categorie":"provision","nom":"Chewing-gums séchés","img":"food_bar3"},{"categorie":"provision","nom":"Petits Beurres rances","img":"food_biscuit"},{"categorie":"provision","nom":"Ailerons de poulet entamés","img":"food_chick"},{"categorie":"provision","nom":"Pim's périmé","img":"food_pims"},{"categorie":"provision","nom":"Biscuit fade","img":"food_tarte"},{"categorie":"provision","nom":"Jambon-beurre moisi","img":"food_sandw"},{"categorie":"provision","nom":"Nouilles chinoises","img":"food_noodles"},{"categorie":"autre","nom":"Epices fortes","img":"spices"},{"categorie":"provision","nom":"Nouilles chinoises épicées","img":"food_noodles_hot"},{"categorie":"autre","nom":"Jeu de cartes incomplet","img":"cards"},{"categorie":"autre","nom":"Boîte de jeu","img":"game_box"},{"categorie":"autre","nom":"Aqua-Splash (démonté)","img":"watergun_opt_part"},{"categorie":"pharmacie","nom":"Petit manche vibrant (déchargé)","img":"vibr_empty"},null,null,{"categorie":"provision","nom":"Os charnu","img":"bone_meat"},{"categorie":"arme","nom":"Os humain fêlé","img":"bone"},{"categorie":"ressource","nom":"Poutre rafistolée","img":"wood_beam"},{"categorie":"ressource","nom":"Structures métalliques","img":"metal_beam"},{"categorie":"ressource","nom":"Débris métalliques","img":"metal_bad"},{"categorie":"ressource","nom":"Souche de bois pourrie","img":"wood_bad"},{"categorie":"ressource","nom":"Scie à métaux","img":"saw_tool"},{"categorie":"amenagement","nom":"Buche en bon état","img":"wood_log"},{"categorie":"autre","nom":"Appareil électronique en panne","img":"electro_box"},{"categorie":"autre","nom":"Meuble en kit","img":"deco_box"},{"categorie":"autre","nom":"Scie à métaux abimée","img":"saw_tool_part"},{"categorie":"autre","nom":"Mécanisme","img":"mecanism"},{"categorie":"defense","nom":"Tréteau","img":"trestle"},{"categorie":"defense","nom":"Table Järpen","img":"table"},{"categorie":"autre","nom":"Micropur effervescent","img":"water_cleaner"},{"categorie":"provision","nom":"Melon d'intestin","img":"vegetable_tasty"},{"categorie":"autre","nom":"Poudre-Comète brute","img":"powder"},{"categorie":"autre","nom":"Bombe Pulvérine","img":"flash"},{"categorie":"autre","nom":"Teddy n'Ours","img":"teddy"},null,null,{"categorie":"autre","nom":"Morceau de caisse","img":"wood_plate_part"},{"categorie":"defense","nom":"Plaque de bois solide","img":"wood_plate"},{"categorie":"amenagement","nom":"Liasse de billets","img":"money"},{"categorie":"autre","nom":"Outils en vrac","img":"repair_kit_part_raw"},{"categorie":"autre","nom":"Radius Mark II déchargée","img":"radius_mk2_part"},{"categorie":"autre","nom":"Radius Mark II","img":"radius_mk2"},{"categorie":"autre","nom":"Brico'Facile","img":"repair_one"},{"categorie":"autre","nom":"Moteur incomplet","img":"engine_part"},{"categorie":"arme","nom":"Vieille machine à laver","img":"machine_1"},{"categorie":"arme","nom":"Four cancérigène","img":"machine_2"},{"categorie":"arme","nom":"Réfrigérateur d'étudiant","img":"machine_3"},{"categorie":"autre","nom":"Une lettre sans adresse","img":"rp_letter"},{"categorie":"autre","nom":"Feuille raccornie","img":"rp_scroll"},{"categorie":"autre","nom":"Manuel d'instructions","img":"rp_manual"},{"categorie":"autre","nom":"Une étiquette","img":"rp_scroll"},{"categorie":"autre","nom":"Carnet illisible","img":"rp_book2"},{"categorie":"autre","nom":"Album photo","img":"rp_book"},{"categorie":"autre","nom":"Pile de feuilles","img":"rp_sheets"},{"categorie":"arme","nom":"Grosse chaîne rouillée","img":"chain"},{"categorie":"provision","nom":"Plat fait-maison douteux","img":"dish"},{"categorie":"provision","nom":"Bon plat fait-maison","img":"dish_tasty"},{"categorie":"amenagement","nom":"Cantine en fer","img":"home_box_xl"},{"categorie":"amenagement","nom":"Cartons","img":"home_box"},{"categorie":"amenagement","nom":"Barricades à clouer","img":"home_def"},{"categorie":"autre","nom":"Une enveloppe","img":"book_gen_letter"},{"categorie":"autre","nom":"Un colis","img":"book_gen_box"},{"categorie":"amenagement","nom":"Morceau de grillage","img":"fence"},{"categorie":"arme","nom":"Pistolet à Eau (3 charges)","img":"watergun_3"},{"categorie":"arme","nom":"Pistolet à Eau (2 charges)","img":"watergun_2"},{"categorie":"arme","nom":"Pistolet à Eau (1 charge)","img":"watergun_1"},{"categorie":"arme","nom":"Aqua-Splash (5 charges)","img":"watergun_opt_5"},{"categorie":"arme","nom":"Aqua-Splash (4 charges)","img":"watergun_opt_4"},{"categorie":"autre","nom":"Paquet de cigarettes entamé","img":"cigs"},{"categorie":"autre","nom":"Calibrateur PDTT Mark II","img":"pilegun_upkit"},{"categorie":"arme","nom":"Lance-pile Mark II (vide)","img":"pilegun_up_empty"},{"categorie":"arme","nom":"Lance-pile Mark II (chargé)","img":"pilegun_up"},{"categorie":"autre","nom":"Pile broyée","img":"pile_broken"},{"categorie":"autre","nom":"Carton de matériaux","img":"rsc_pack_3"},{"categorie":"autre","nom":"Carton de matériaux","img":"rsc_pack_2"},{"categorie":"autre","nom":"Carton de matériaux","img":"rsc_pack_1"},{"categorie":"defense","nom":"Portière de voiture","img":"car_door"},{"categorie":"autre","nom":"Portière de voiture incomplète","img":"car_door_part"},{"categorie":"autre","nom":"Fiole de poison","img":"poison"},{"categorie":"autre","nom":"Produit corrosif","img":"poison_part"},{"categorie":"provision","nom":"Ration d'eau","img":"water"},{"categorie":"pharmacie","nom":"Stéroïdes Anabolisants","img":"drug"},{"categorie":"provision","nom":"Boîte de Conserve ouverte","img":"can_open"},{"categorie":"provision","nom":"Réserves d'un citoyen avisé","img":"chest_hero"},{"categorie":"autre","nom":"Gros colis postal","img":"postal_box_xl"},{"categorie":"autre","nom":"Colis postal","img":"postal_box"},null,{"categorie":"provision","nom":"Boîte-déjeuner","img":"food_armag"},{"categorie":"provision","nom":"Poignée de bonbons","img":"food_candies"},{"categorie":"defense","nom":"Morceau de contreplaqué","img":"out_def"},null,{"categorie":"defense","nom":"Torche","img":"torch"},{"categorie":"arme","nom":"Torche consumée","img":"torch_off"},{"categorie":"provision","nom":"Chamallows séchés","img":"chama"},{"categorie":"provision","nom":"Chamallows calcinés","img":"chama_tasty"},{"categorie":"autre","nom":"Caisse surprise","img":"chest_christmas_3"},{"categorie":"autre","nom":"Caisse surprise","img":"chest_christmas_2"},{"categorie":"autre","nom":"Caisse surprise","img":"chest_christmas_1"},{"categorie":"autre","nom":"Un bout de papier","img":"rp_scroll"},{"categorie":"autre","nom":"Un bonbon de Noël","img":"christmas_candy"},{"categorie":"arme","nom":"Unité centrale","img":"pc"},{"categorie":"autre","nom":"Coffre-fort","img":"safe"},{"categorie":"autre","nom":"Une encyclopédie","img":"rp_twin"},{"categorie":"provision","nom":"Bonbonne d'eau (vide)","img":"water_can_empty"},{"categorie":"provision","nom":"Bonbonne d'eau (1 ration)","img":"water_can_1"},{"categorie":"provision","nom":"Bonbonne d'eau (2 rations)","img":"water_can_2"},{"categorie":"provision","nom":"Bonbonne d'eau (3 rations)","img":"water_can_3"},null,{"categorie":"autre","nom":"Betapropine 5mg périmée","img":"beta_drug_bad"},{"categorie":"autre","nom":"Suintement cervical noir","img":"april_drug"},{"categorie":"autre","nom":"Charognardes","img":"fruit_sub_part"},{"categorie":"autre","nom":"Boule de pâte visqueuse","img":"fruit_part"},null,null,null,{"categorie":"autre","nom":"Lambeau de chair","img":"flesh_part"},{"categorie":"autre","nom":"Bombe macabre","img":"flesh"},{"categorie":"autre","nom":"Substance épaisse","img":"pharma_part"},{"categorie":"provision","nom":"Purée de charognardes","img":"fruit"},{"categorie":"provision","nom":"Purée de charognardes","img":"fruit"},{"categorie":"provision","nom":"Légume suspect","img":"vegetable"},{"categorie":"autre","nom":"Eau croupie","img":"water_cup_part"},{"categorie":"provision","nom":"Eau croupie purifiée","img":"water_cup"},{"categorie":"autre","nom":"Note d'un citoyen banni","img":"banned_note"},null,null,null,null,{"categorie":"autre","nom":"Pansement ensanglanté","img":"infect_poison_part"},null,{"categorie":"provision","nom":"Ration d'eau","img":"water"},{"categorie":"pharmacie","nom":"Stéroïdes Anabolisants","img":"drug"},{"categorie":"provision","nom":"Boîte de Conserve ouverte","img":"can_open"},null,null,{"categorie":"amenagement","nom":"Teddy n'Ours maudit","img":"teddy"},null,null,null,{"categorie":"provision","nom":"Steak de sciure","img":"woodsteak"},{"categorie":"autre","nom":"Veste rouge usée","img":"christmas_suit_1"},{"categorie":"autre","nom":"Pantalon rouge déchiré","img":"christmas_suit_2"},{"categorie":"autre","nom":"Bonnet rouge malodorant","img":"christmas_suit_3"},{"categorie":"autre","nom":"Costume malodorant d'une autre époque","img":"christmas_suit_full"},{"categorie":"arme","nom":"Téléphone portable","img":"iphone"},{"categorie":"autre","nom":"Pelures de peau","img":"smelly_meat"},{"categorie":"autre","nom":"Débris méconnaissables","img":"broken"},null,null,{"categorie":"amenagement","nom":"MagLite Pif'Gadget (éteinte)","img":"maglite_off"},{"categorie":"amenagement","nom":"MagLite Pif'Gadget (1 charge)","img":"maglite_1"},{"categorie":"amenagement","nom":"MagLite Pif'Gadget (2 charges)","img":"maglite_2"},{"categorie":"autre","nom":"Poudre Super-Fuzz","img":"firework_powder"},{"categorie":"autre","nom":"Tube de lancement Floush","img":"firework_tube"},{"categorie":"autre","nom":"Caisse de feux d'artifice","img":"firework_box"},{"categorie":"provision","nom":"Cadavre d'un voyageur","img":"cadaver"},{"categorie":"autre","nom":"Cadavre rongé","img":"cadaver_remains"},{"categorie":"autre","nom":"Fumigène « Senteur Sapin »","img":"smoke_bomb"},{"categorie":"autre","nom":"Citrouille molle","img":"pumpkin_raw"},{"categorie":"amenagement","nom":"Citrouille molle sculptée","img":"pumpkin_off"},{"categorie":"defense","nom":"Citrouille allumée","img":"pumpkin_on"},{"categorie":"autre","nom":"Boules de sable","img":"sand_ball"},{"categorie":"provision","nom":"Jus de mirabelle suspect","img":"omg_this_will_kill_you"},{"categorie":"autre","nom":"Plan de chantier (commun)","img":"bplan_c"},{"categorie":"autre","nom":"Plan de chantier (inhabituel)","img":"bplan_u"},{"categorie":"autre","nom":"Plan de chantier (rare)","img":"bplan_r"},{"categorie":"autre","nom":"Plan de chantier (très rare !)","img":"bplan_e"},{"categorie":"autre","nom":"Coffre d'architecte","img":"bplan_box"},{"categorie":"autre","nom":"Coffre d'architecte scellé","img":"bplan_box_e"},{"categorie":"provision","nom":"Oeuf","img":"egg"},{"categorie":"provision","nom":"Pomme","img":"apple"},{"categorie":"arme","nom":"Pamplemousse explosif","img":"boomfruit"},{"categorie":"autre","nom":"Sacoche usée","img":"bplan_drop"},null,null,null,null,null,null,{"categorie":"autre","nom":"Clé magnétique","img":"magneticKey"},{"categorie":"autre","nom":"Clé à percussion","img":"bumpKey"},{"categorie":"autre","nom":"Décapsuleur","img":"classicKey"},{"categorie":"autre","nom":"Empreinte de clé magnétique","img":"prints"},{"categorie":"autre","nom":"Empreinte de clé à percussion","img":"prints"},{"categorie":"autre","nom":"Empreinte de décapsuleur","img":"prints"},{"categorie":"autre","nom":"Sérum pour Goule","img":"vagoul"},{"categorie":"autre","nom":"Plan de chantier (inhabituel)","img":"bplan_u"},{"categorie":"autre","nom":"Plan de chantier (rare)","img":"bplan_r"},{"categorie":"autre","nom":"Plan de chantier (très rare !)","img":"bplan_e"},{"categorie":"autre","nom":"Plan de chantier (inhabituel)","img":"bplan_u"},{"categorie":"autre","nom":"Plan de chantier (rare)","img":"bplan_r"},{"categorie":"autre","nom":"Plan de chantier (très rare !)","img":"bplan_e"},{"categorie":"autre","nom":"Plan de chantier (inhabituel)","img":"bplan_u"},{"categorie":"autre","nom":"Plan de chantier (rare)","img":"bplan_r"},{"categorie":"autre","nom":"Plan de chantier (très rare !)","img":"bplan_e"},null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"categorie":"autre","nom":"Âme errante","img":"soul_blue"},{"categorie":"autre","nom":"Âme forte","img":"soul_red"},{"categorie":"autre","nom":"Âme faible","img":"soul_blue"}];
}

// Analyse la page, lance les modules correspondants
var analyser_page = function() {
	unsafeWindow.sab_analysed = true;
	console.log("analyse page");
	if ($("div.maps table.table tr td.list ul li a strong").length > 0)
		unsafeWindow.sab_MWL.lanch_analyse_ville();
		
	if ($('a.tid_user:not(.sab_tid_analysed)').length > 0)
		unsafeWindow.sab_MWL.analyser_tid();
	
	if ($("#generic_section > div.cityHome").length > 0)
		unsafeWindow.sab_resume_ville.creer_boutons();
		
	if ($("#generic_section > div.bvote").length > 0)
		unsafeWindow.sab_chantiers.creer_boutons();
	
	if ($("#allowExtern").length > 0)
		unsafeWindow.sab_xml_hordes.creer_bouton_autorisation_api();
	
	if ($("#generic_section div.right ul.outInv").length > 0)
		unsafeWindow.sab_outside.creer_menu();
		
	if ($("ul.logs").length > 0)
		unsafeWindow.sab_logs.creer_liste_items();
}

// première analyse. Le ondata ne se déclenche pas encore, on fait un pseudo Interval
var premiere_analyse = function () {
	if (($("#generic_section").children().length == 0) && (unsafeWindow.sab_analysed == false) && ($("a.tid_user:not(.sab_tid_analysed").length == 0) && ($("a[href^='#ghost/user']") == 0)) {
		// console.log("report première analyse");
		window.setTimeout(premiere_analyse, 500);
	} else {
		if (unsafeWindow.sab_analysed == false) analyser_page();
	}
}
unsafeWindow.sab_analysed = false; // variable témoignant de l'état d'analyse de la page. Utile uniquement pour la première analyse.

// main
$(function () {
	// hook de la fonction d'analyse de la page après le chargement. Ne fonctionne pas sur le forum
	// crédit au remplacement de XMLHTTPRequest : https://gist.github.com/3183154
	// permet le hook sous chrome
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
			if (this.readyState == 4)
				analyser_page();
			return temp;
		}
	}
	window.XMLHttpRequest.prototype.send = sendReplacement;

	
	// hook pour le forum. plus gourmand, le chargement des pages du forum n'ayant été réussi à hooker.
	if (/\/tid\/forum/.test(window.location.href)) {
		window.setInterval(function () {if ($('a.tid_user:not(.sab_tid_analysed)').length > 0) unsafeWindow.sab_MWL.analyser_tid();},1000);
		unsafeWindow.sab_analysed = true;
	}

	window.setTimeout(premiere_analyse, 500);
});

})};