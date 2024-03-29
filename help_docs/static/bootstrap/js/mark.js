/*!***************************************************
 * mark.js v8.6.0
 * https://github.com/julmot/mark.js
 * Copyright (c) 2014–2017, Julian Motz
 * Released under the MIT license https://git.io/vwTVl
 *****************************************************/
"use strict";

function _classCallCheck(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
}

var _extends = Object.assign || function (a) {
    for (var b = 1; b < arguments.length; b++) {
        var c = arguments[b];
        for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
    }
    return a
}, _createClass = function () {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }

    return function (b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) {
    return typeof a
} : function (a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
};
!function (a, b, c) {
    "function" == typeof define && define.amd ? define(["jquery"], function (d) {
        return a(b, c, d)
    }) : "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = a(b, c, require("jquery")) : a(b, c, jQuery)
}(function (a, b, c) {
    var d = function () {
        function c(b) {
            _classCallCheck(this, c), this.ctx = b, this.ie = !1;
            var d = a.navigator.userAgent;
            (d.indexOf("MSIE") > -1 || d.indexOf("Trident") > -1) && (this.ie = !0)
        }

        return _createClass(c, [{
            key: "log", value: function a(b) {
                var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "debug", a = this.opt.log;
                this.opt.debug && "object" === ("undefined" == typeof a ? "undefined" : _typeof(a)) && "function" == typeof a[c] && a[c]("mark.js: " + b)
            }
        }, {
            key: "escapeStr", value: function (a) {
                return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            }
        }, {
            key: "createRegExp", value: function (a) {
                return a = this.escapeStr(a), Object.keys(this.opt.synonyms).length && (a = this.createSynonymsRegExp(a)), this.opt.ignoreJoiners && (a = this.setupIgnoreJoinersRegExp(a)), this.opt.diacritics && (a = this.createDiacriticsRegExp(a)), a = this.createMergedBlanksRegExp(a), this.opt.ignoreJoiners && (a = this.createIgnoreJoinersRegExp(a)), a = this.createAccuracyRegExp(a)
            }
        }, {
            key: "createSynonymsRegExp", value: function (a) {
                var b = this.opt.synonyms, c = this.opt.caseSensitive ? "" : "i";
                for (var d in b) if (b.hasOwnProperty(d)) {
                    var e = b[d], f = this.escapeStr(d), g = this.escapeStr(e);
                    a = a.replace(new RegExp("(" + f + "|" + g + ")", "gm" + c), "(" + f + "|" + g + ")")
                }
                return a
            }
        }, {
            key: "setupIgnoreJoinersRegExp", value: function (a) {
                return a.replace(/[^(|)\\]/g, function (a, b, c) {
                    var d = c.charAt(b + 1);
                    return /[(|)\\]/.test(d) || "" === d ? a : a + "\0"
                })
            }
        }, {
            key: "createIgnoreJoinersRegExp", value: function (a) {
                return a.split("\0").join("[\\u00ad|\\u200b|\\u200c|\\u200d]?")
            }
        }, {
            key: "createDiacriticsRegExp", value: function (a) {
                var b = this.opt.caseSensitive ? "" : "i",
                    c = this.opt.caseSensitive ? ["aàáâãäåāąă", "AÀÁÂÃÄÅĀĄĂ", "cçćč", "CÇĆČ", "dđď", "DĐĎ", "eèéêëěēę", "EÈÉÊËĚĒĘ", "iìíîïī", "IÌÍÎÏĪ", "lł", "LŁ", "nñňń", "NÑŇŃ", "oòóôõöøō", "OÒÓÔÕÖØŌ", "rř", "RŘ", "sšśș", "SŠŚȘ", "tťț", "TŤȚ", "uùúûüůū", "UÙÚÛÜŮŪ", "yÿý", "YŸÝ", "zžżź", "ZŽŻŹ"] : ["aÀÁÂÃÄÅàáâãäåĀāąĄăĂ", "cÇçćĆčČ", "dđĐďĎ", "eÈÉÊËèéêëěĚĒēęĘ", "iÌÍÎÏìíîïĪī", "lłŁ", "nÑñňŇńŃ", "oÒÓÔÕÖØòóôõöøŌō", "rřŘ", "sŠšśŚșȘ", "tťŤțȚ", "uÙÚÛÜùúûüůŮŪū", "yŸÿýÝ", "zŽžżŻźŹ"],
                    d = [];
                return a.split("").forEach(function (e) {
                    c.every(function (c) {
                        if (c.indexOf(e) !== -1) {
                            if (d.indexOf(c) > -1) return !1;
                            a = a.replace(new RegExp("[" + c + "]", "gm" + b), "[" + c + "]"), d.push(c)
                        }
                        return !0
                    })
                }), a
            }
        }, {
            key: "createMergedBlanksRegExp", value: function (a) {
                return a.replace(/[\s]+/gim, "[\\s]+")
            }
        }, {
            key: "createAccuracyRegExp", value: function (a) {
                var b = this, c = this.opt.accuracy, d = "string" == typeof c ? c : c.value,
                    e = "string" == typeof c ? [] : c.limiters, f = "";
                switch (e.forEach(function (a) {
                    f += "|" + b.escapeStr(a)
                }), d) {
                    case"partially":
                    default:
                        return "()(" + a + ")";
                    case"complementary":
                        return "()([^\\s" + f + "]*" + a + "[^\\s" + f + "]*)";
                    case"exactly":
                        return "(^|\\s" + f + ")(" + a + ")(?=$|\\s" + f + ")"
                }
            }
        }, {
            key: "getSeparatedKeywords", value: function (a) {
                var b = this, c = [];
                return a.forEach(function (a) {
                    b.opt.separateWordSearch ? a.split(" ").forEach(function (a) {
                        a.trim() && c.indexOf(a) === -1 && c.push(a)
                    }) : a.trim() && c.indexOf(a) === -1 && c.push(a)
                }), {
                    keywords: c.sort(function (a, b) {
                        return b.length - a.length
                    }), length: c.length
                }
            }
        }, {
            key: "getTextNodes", value: function (a) {
                var b = this, c = "", d = [];
                this.iterator.forEachNode(NodeFilter.SHOW_TEXT, function (a) {
                    d.push({start: c.length, end: (c += a.textContent).length, node: a})
                }, function (a) {
                    return b.matchesExclude(a.parentNode, !0) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
                }, function () {
                    a({value: c, nodes: d})
                })
            }
        }, {
            key: "matchesExclude", value: function (a, b) {
                var c = this.opt.exclude.concat(["script", "style", "title", "head", "html"]);
                return b && (c = c.concat(["*[data-markjs='true']"])), e.matches(a, c)
            }
        }, {
            key: "wrapRangeInTextNode", value: function (a, c, d) {
                var e = this.opt.element ? this.opt.element : "mark", f = a.splitText(c), g = f.splitText(d - c),
                    h = b.createElement(e);
                return h.setAttribute("data-markjs", "true"), this.opt.className && h.setAttribute("class", this.opt.className), h.textContent = f.textContent, f.parentNode.replaceChild(h, f), g
            }
        }, {
            key: "wrapRangeInMappedTextNode", value: function (a, b, c, d, e) {
                var f = this;
                a.nodes.every(function (g, h) {
                    var i = a.nodes[h + 1];
                    if ("undefined" == typeof i || i.start > b) {
                        var j = function () {
                            var i = b - g.start, j = (c > g.end ? g.end : c) - g.start;
                            if (d(g.node)) {
                                g.node = f.wrapRangeInTextNode(g.node, i, j);
                                var k = a.value.substr(0, g.start), l = a.value.substr(j + g.start);
                                if (a.value = k + l, a.nodes.forEach(function (b, c) {
                                    c >= h && (a.nodes[c].start > 0 && c !== h && (a.nodes[c].start -= j), a.nodes[c].end -= j)
                                }), c -= j, e(g.node.previousSibling, g.start), !(c > g.end)) return {v: !1};
                                b = g.end
                            }
                        }();
                        if ("object" === ("undefined" == typeof j ? "undefined" : _typeof(j))) return j.v
                    }
                    return !0
                })
            }
        }, {
            key: "wrapMatches", value: function (a, b, c, d, e) {
                var f = this, g = 0 === b ? 0 : b + 1;
                this.getTextNodes(function (b) {
                    b.nodes.forEach(function (b) {
                        b = b.node;
                        for (var e = void 0; null !== (e = a.exec(b.textContent)) && "" !== e[g];) if (c(e[g], b)) {
                            var h = e.index;
                            if (0 !== g) for (var i = 1; i < g; i++) h += e[i].length;
                            b = f.wrapRangeInTextNode(b, h, h + e[g].length), d(b.previousSibling), a.lastIndex = 0
                        }
                    }), e()
                })
            }
        }, {
            key: "wrapMatchesAcrossElements", value: function (a, b, c, d, e) {
                var f = this, g = 0 === b ? 0 : b + 1;
                this.getTextNodes(function (b) {
                    for (var h = void 0; null !== (h = a.exec(b.value)) && "" !== h[g];) {
                        var i = h.index;
                        if (0 !== g) for (var j = 1; j < g; j++) i += h[j].length;
                        var k = i + h[g].length;
                        f.wrapRangeInMappedTextNode(b, i, k, function (a) {
                            return c(h[g], a)
                        }, function (b, c) {
                            a.lastIndex = c, d(b)
                        })
                    }
                    e()
                })
            }
        }, {
            key: "unwrapMatches", value: function (a) {
                for (var c = a.parentNode, d = b.createDocumentFragment(); a.firstChild;) d.appendChild(a.removeChild(a.firstChild));
                c.replaceChild(d, a), this.ie ? this.normalizeTextNode(c) : c.normalize()
            }
        }, {
            key: "normalizeTextNode", value: function (a) {
                if (a) {
                    if (3 === a.nodeType) for (; a.nextSibling && 3 === a.nextSibling.nodeType;) a.nodeValue += a.nextSibling.nodeValue, a.parentNode.removeChild(a.nextSibling); else this.normalizeTextNode(a.firstChild);
                    this.normalizeTextNode(a.nextSibling)
                }
            }
        }, {
            key: "markRegExp", value: function (a, b) {
                var c = this;
                this.opt = b, this.log('Searching with expression "' + a + '"');
                var d = 0, e = "wrapMatches", f = function (a) {
                    d++, c.opt.each(a)
                };
                this.opt.acrossElements && (e = "wrapMatchesAcrossElements"), this[e](a, this.opt.ignoreGroups, function (a, b) {
                    return c.opt.filter(b, a, d)
                }, f, function () {
                    0 === d && c.opt.noMatch(a), c.opt.done(d)
                })
            }
        }, {
            key: "mark", value: function (a, b) {
                var c = this;
                this.opt = b;
                var d = 0, e = "wrapMatches", f = this.getSeparatedKeywords("string" == typeof a ? [a] : a),
                    g = f.keywords, h = f.length, i = this.opt.caseSensitive ? "" : "i", j = function a(b) {
                        var f = new RegExp(c.createRegExp(b), "gm" + i), j = 0;
                        c.log('Searching with expression "' + f + '"'), c[e](f, 1, function (a, e) {
                            return c.opt.filter(e, b, d, j)
                        }, function (a) {
                            j++, d++, c.opt.each(a)
                        }, function () {
                            0 === j && c.opt.noMatch(b), g[h - 1] === b ? c.opt.done(d) : a(g[g.indexOf(b) + 1])
                        })
                    };
                this.opt.acrossElements && (e = "wrapMatchesAcrossElements"), 0 === h ? this.opt.done(d) : j(g[0])
            }
        }, {
            key: "unmark", value: function (a) {
                var b = this;
                this.opt = a;
                var c = this.opt.element ? this.opt.element : "*";
                c += "[data-markjs]", this.opt.className && (c += "." + this.opt.className), this.log('Removal selector "' + c + '"'), this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT, function (a) {
                    b.unwrapMatches(a)
                }, function (a) {
                    var d = e.matches(a, c), f = b.matchesExclude(a, !1);
                    return !d || f ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
                }, this.opt.done)
            }
        }, {
            key: "opt", set: function (b) {
                this._opt = _extends({}, {
                    element: "",
                    className: "",
                    exclude: [],
                    iframes: !1,
                    separateWordSearch: !0,
                    diacritics: !0,
                    synonyms: {},
                    accuracy: "partially",
                    acrossElements: !1,
                    caseSensitive: !1,
                    ignoreJoiners: !1,
                    ignoreGroups: 0,
                    each: function () {
                    },
                    noMatch: function () {
                    },
                    filter: function () {
                        return !0
                    },
                    done: function () {
                    },
                    debug: !1,
                    log: a.console
                }, b)
            }, get: function () {
                return this._opt
            }
        }, {
            key: "iterator", get: function () {
                return this._iterator || (this._iterator = new e(this.ctx, this.opt.iframes, this.opt.exclude)), this._iterator
            }
        }]), c
    }(), e = function () {
        function a(b) {
            var c = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            _classCallCheck(this, a), this.ctx = b, this.iframes = c, this.exclude = d
        }

        return _createClass(a, [{
            key: "getContexts", value: function () {
                var a = void 0, c = [];
                return a = "undefined" != typeof this.ctx && this.ctx ? NodeList.prototype.isPrototypeOf(this.ctx) ? Array.prototype.slice.call(this.ctx) : Array.isArray(this.ctx) ? this.ctx : "string" == typeof this.ctx ? Array.prototype.slice.call(b.querySelectorAll(this.ctx)) : [this.ctx] : [], a.forEach(function (a) {
                    var b = c.filter(function (b) {
                        return b.contains(a)
                    }).length > 0;
                    c.indexOf(a) !== -1 || b || c.push(a)
                }), c
            }
        }, {
            key: "getIframeContents", value: function (a, b) {
                var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function () {
                }, d = void 0;
                try {
                    var e = a.contentWindow;
                    if (d = e.document, !e || !d) throw new Error("iframe inaccessible")
                } catch (a) {
                    c()
                }
                d && b(d)
            }
        }, {
            key: "onIframeReady", value: function (a, b, c) {
                var d = this;
                try {
                    !function () {
                        var e = a.contentWindow, f = "about:blank", g = "complete", h = function () {
                            var b = a.getAttribute("src").trim(), c = e.location.href;
                            return c === f && b !== f && b
                        }, i = function () {
                            var e = function e() {
                                try {
                                    h() || (a.removeEventListener("load", e), d.getIframeContents(a, b, c))
                                } catch (a) {
                                    c()
                                }
                            };
                            a.addEventListener("load", e)
                        };
                        e.document.readyState === g ? h() ? i() : d.getIframeContents(a, b, c) : i()
                    }()
                } catch (a) {
                    c()
                }
            }
        }, {
            key: "waitForIframes", value: function (a, b) {
                var c = this, d = 0;
                this.forEachIframe(a, function () {
                    return !0
                }, function (a) {
                    d++, c.waitForIframes(a.querySelector("html"), function () {
                        --d || b()
                    })
                }, function (a) {
                    a || b()
                })
            }
        }, {
            key: "forEachIframe", value: function (b, c, d) {
                var e = this, f = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function () {
                }, g = b.querySelectorAll("iframe"), h = g.length, i = 0;
                g = Array.prototype.slice.call(g);
                var j = function () {
                    --h <= 0 && f(i)
                };
                h || j(), g.forEach(function (b) {
                    a.matches(b, e.exclude) ? j() : e.onIframeReady(b, function (a) {
                        c(b) && (i++, d(a)), j()
                    }, j)
                })
            }
        }, {
            key: "createIterator", value: function (a, c, d) {
                return b.createNodeIterator(a, c, d, !1)
            }
        }, {
            key: "createInstanceOnIframe", value: function (b) {
                return new a(b.querySelector("html"), this.iframes)
            }
        }, {
            key: "compareNodeIframe", value: function (a, b, c) {
                var d = a.compareDocumentPosition(c), e = Node.DOCUMENT_POSITION_PRECEDING;
                if (d & e) {
                    if (null === b) return !0;
                    var f = b.compareDocumentPosition(c), g = Node.DOCUMENT_POSITION_FOLLOWING;
                    if (f & g) return !0
                }
                return !1
            }
        }, {
            key: "getIteratorNode", value: function (a) {
                var b = a.previousNode(), c = void 0;
                return c = null === b ? a.nextNode() : a.nextNode() && a.nextNode(), {prevNode: b, node: c}
            }
        }, {
            key: "checkIframeFilter", value: function (a, b, c, d) {
                var e = !1, f = !1;
                return d.forEach(function (a, b) {
                    a.val === c && (e = b, f = a.handled)
                }), this.compareNodeIframe(a, b, c) ? (e !== !1 || f ? e === !1 || f || (d[e].handled = !0) : d.push({
                    val: c,
                    handled: !0
                }), !0) : (e === !1 && d.push({val: c, handled: !1}), !1)
            }
        }, {
            key: "handleOpenIframes", value: function (a, b, c, d) {
                var e = this;
                a.forEach(function (a) {
                    a.handled || e.getIframeContents(a.val, function (a) {
                        e.createInstanceOnIframe(a).forEachNode(b, c, d)
                    })
                })
            }
        }, {
            key: "iterateThroughNodes", value: function (a, b, c, d, e) {
                for (var f = this, g = this.createIterator(b, a, d), h = [], i = [], j = void 0, k = void 0, l = function () {
                    var a = f.getIteratorNode(g);
                    return k = a.prevNode, j = a.node
                }; l();) this.iframes && this.forEachIframe(b, function (a) {
                    return f.checkIframeFilter(j, k, a, h)
                }, function (b) {
                    f.createInstanceOnIframe(b).forEachNode(a, c, d)
                }), i.push(j);
                i.forEach(function (a) {
                    c(a)
                }), this.iframes && this.handleOpenIframes(h, a, c, d), e()
            }
        }, {
            key: "forEachNode", value: function (a, b, c) {
                var d = this, e = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function () {
                }, f = this.getContexts(), g = f.length;
                g || e(), f.forEach(function (f) {
                    var h = function () {
                        d.iterateThroughNodes(a, f, b, c, function () {
                            --g <= 0 && e()
                        })
                    };
                    d.iframes ? d.waitForIframes(f, h) : h()
                })
            }
        }], [{
            key: "matches", value: function (a, b) {
                var c = "string" == typeof b ? [b] : b,
                    d = a.matches || a.matchesSelector || a.msMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.webkitMatchesSelector;
                if (d) {
                    var e = !1;
                    return c.every(function (b) {
                        return !d.call(a, b) || (e = !0, !1)
                    }), e
                }
                return !1
            }
        }]), a
    }();
    return c.fn.mark = function (a, b) {
        return new d(this.get()).mark(a, b), this
    }, c.fn.markRegExp = function (a, b) {
        return new d(this.get()).markRegExp(a, b), this
    }, c.fn.unmark = function (a) {
        return new d(this.get()).unmark(a), this
    }, c
}, window, document);