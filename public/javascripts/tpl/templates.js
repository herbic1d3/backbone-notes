(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["footer/index.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"navbar navbar-default navbar-fixed-bottom\" role=\"navigation\">\n    <div class=\"container-fluid text-center\">\n          <div class=\"collapse navbar-collapse\">\n            <nav aria-label=\"Page navigation\">\n              <ul class=\"pagination\">\n                <li>\n                  <a href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "previousPage"), env.opts.autoescape);
output += "\" aria-label=\"Previous\">\n                    <span aria-hidden=\"true\">&laquo;</span>\n                  </a>\n                </li>\n                ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "pages");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("page", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                  ";
if(runtime.memberLookup((t_4),"num") == runtime.contextOrFrameLookup(context, frame, "page_numb")) {
output += "\n                    <li><a href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"url"), env.opts.autoescape);
output += "\" class=\"active\"> ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"num"), env.opts.autoescape);
output += "</a></li>\n                  ";
;
}
else {
output += "\n                    <li><a href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"url"), env.opts.autoescape);
output += "\"> ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"num"), env.opts.autoescape);
output += "</a></li>\n                  ";
;
}
output += "\n                ";
;
}
}
frame = frame.pop();
output += "\n                <li>\n                  <a href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "nextPage"), env.opts.autoescape);
output += "\" aria-label=\"Next\">\n                    <span aria-hidden=\"true\">&raquo;</span>\n                  </a>\n                </li>\n              </ul>\n            </nav>                \n        </div><!-- /.navbar-collapse -->\n    </div><!-- /.container-fluid -->\n</div><!-- /.navbar-default -->\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["item/index.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"container-fluid \" id=\"note-item-element\">\n    <hr>\n    <div class=\"panel panel-default note-item-group\">\n        <div class=\"panel-heading\">\n            <div class=\"input-group\">\n                ";
if(runtime.contextOrFrameLookup(context, frame, "single") == true) {
output += "\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"id") != 0) {
output += "\n                        <span class=\"input-group-btn\">\n                            <button id=\"note-btn-remove\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"id"), env.opts.autoescape);
output += "\" type=\"submit\" class=\"btn btn-default\" data-toggle=\"tooltip\" title=\"Remove note\">\n                                <span class=\"glyphicon glyphicon-remove\"></span>\n                            </button>\n                        </span>\n                    ";
;
}
output += "\n                <input id=\"note-title\" type=\"text\" class=\"form-control\" placeholder=\"Empty title ...\" value=";
output += runtime.suppressValue((lineno = 13, colno = 117, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"get"), "item[\"get\"]", context, ["title"])), env.opts.autoescape);
output += ">\n                ";
;
}
else {
output += "\n                <input id=\"note-title\" type=\"text\" class=\"form-control\" placeholder=\"Empty title ...\" value=";
output += runtime.suppressValue((lineno = 15, colno = 117, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"get"), "item[\"get\"]", context, ["title"])), env.opts.autoescape);
output += " readonly='true'>\n                ";
;
}
output += "\n                ";
if(runtime.contextOrFrameLookup(context, frame, "single") == true) {
output += "\n                <span class=\"input-group-btn\">\n                    <button id=\"note-btn-save\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"id"), env.opts.autoescape);
output += "\" type=\"submit\" class=\"btn btn-default\" data-toggle=\"tooltip\" title=\"Save note\">\n                        <span class=\"glyphicon glyphicon-save\"></span>\n                    </button>\n                </span>\n                ";
;
}
else {
output += "\n                <span class=\"input-group-btn\">\n                    <button id=\"note-btn-edit\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"id"), env.opts.autoescape);
output += "\" type=\"submit\" class=\"btn btn-default\" data-toggle=\"tooltip\" title=\"Edit note\">\n                        <span class=\"glyphicon glyphicon-edit\"></span>\n                    </button>\n                </span>\n                ";
;
}
output += "\n            </div><!-- /input-group -->\n        </div>\n        <div class=\"panel-body\" id=\"item-text\">\n            ";
if(runtime.contextOrFrameLookup(context, frame, "single") == true) {
output += "\n            <textarea id='note-text' class=\"form-control \" rows=\"5\" placeholder=\"Empty note\">";
output += runtime.suppressValue((lineno = 34, colno = 102, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"get"), "item[\"get\"]", context, ["note"])), env.opts.autoescape);
output += "</textarea>\n            ";
;
}
else {
output += "\n            <textarea id='note-text' class=\"form-control \" rows=\"5\" placeholder=\"Empty note\" readonly>";
output += runtime.suppressValue((lineno = 36, colno = 111, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"get"), "item[\"get\"]", context, ["note"])), env.opts.autoescape);
output += "</textarea>\n            ";
;
}
output += "\n        </div>\n    </div>\n</div><!-- /.container-fluid -->\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["list/index.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "list")),"models");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n    ";
env.getTemplate("item/index.html", false, "list/index.html", null, function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
t_5.render(context.getVariables(), frame, function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
output += t_6
output += "\n";
})});
}
}
frame = frame.pop();
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["main/index.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"note-layout-search\"></div>\n<div id=\"note-layout-list\"></div>\n<div id=\"note-layout-footer\"></div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["search/index.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"container-fluid \">\n        <div class=\"collapse navbar-collapse \">\n            <div class=\"input-group note-search-group\">\n                <span class=\"input-group-btn\">\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"page_view") == true) {
output += "\n                    <label class=\"btn btn-default\">\n                        <input type=\"radio\" name=\"options\" id=\"option_pages\" autocomplete=\"off\" data-toggle=\"tooltip\" title=\"View as pages\" checked> Pages\n                    </label>\n                    <label class=\"btn btn-default\">\n                       <input type=\"radio\" name=\"options\" id=\"option_list\" autocomplete=\"off\" data-toggle=\"tooltip\" title=\"View as endless list\" > List\n                    </label>\n                    ";
;
}
else {
output += "\n                    <label class=\"btn btn-default\">\n                        <input type=\"radio\" name=\"options\" id=\"option_pages\" autocomplete=\"off\" data-toggle=\"tooltip\" title=\"View as pages\"> Pages\n                    </label>\n                    <label class=\"btn btn-default\">\n                       <input type=\"radio\" name=\"options\" id=\"option_list\" autocomplete=\"off\" data-toggle=\"tooltip\" title=\"View as endless list\" checked> List\n                    </label>\n                    ";
;
}
output += "\n                </span>\n\n                <input type=\"text\" class=\"form-control input-search\" id=\"note-in-search\" placeholder=\"Search ...\" value=";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"search"), env.opts.autoescape);
output += ">\n                <span class=\"input-group-btn\">\n                    <button id=\"note-btn-add\" class=\"btn btn-default button-search-corr\" type=\"submit\" data-toggle=\"tooltip\" title=\"Add new note\">\n                        <span class=\"glyphicon glyphicon-plus\"></span>\n                    </button>\n                </span>\n            </div><!-- /.input-group -->\n        </div><!-- /.navbar-collapse -->\n    </div><!-- /.container-fluid -->\n</div><!-- /.navbar-default -->\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
