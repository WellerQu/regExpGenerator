"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
var Level;
(function (Level) {
    Level["fuzzy"] = "fuzzy";
    Level["normal"] = "normal";
    Level["exact"] = "exact";
})(Level || (Level = {}));
function isNumber(ch) {
    var code = ch.charCodeAt(0);
    return (code >= 0x30 && code <= 0x39);
}
function isWord(ch) {
    var code = ch.charCodeAt(0);
    return (code >= 0x41 && code <= 0x5A) || (code >= 0x61 && code <= 0x7A);
}
function isUnicode(ch) {
    var code = ch.charCodeAt(0);
    return code > 255;
}
function isRegExpMetaChar(ch) {
    return !!~'\\^$*+?{}.|[]'.indexOf(ch);
}
function punctuationCount(slice) {
    var characterCounter = new Map();
    slice.split('').forEach(function (ch) {
        var _a;
        if (isNumber(ch)) {
            return;
        }
        if (isWord(ch)) {
            return;
        }
        var count = (_a = characterCounter.get(ch)) !== null && _a !== void 0 ? _a : 0;
        characterCounter.set(ch, count + 1);
    });
    return characterCounter;
}
function characterCount(slice, ch) {
    return slice.split('').reduce(function (acc, item) {
        return item === ch ? acc + 1 : acc;
    }, 0);
}
function findMaxCountCharacter(map) {
    var e_1, _a;
    var iterator = map.entries();
    var max = 0;
    var key = '';
    try {
        for (var iterator_1 = __values(iterator), iterator_1_1 = iterator_1.next(); !iterator_1_1.done; iterator_1_1 = iterator_1.next()) {
            var item = iterator_1_1.value;
            if (item[1] >= max) {
                max = item[1];
                key = item[0];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return)) _a.call(iterator_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return [key, max];
}
function transformCharacter(value, level) {
    if (level === Level.exact) {
        return value;
    }
    var expr = value
        .split('')
        .map(function (ch) {
        if (isNumber(ch)) {
            return "\\d";
        }
        if (isWord(ch)) {
            return "\\w";
        }
        if (isRegExpMetaChar(ch)) {
            return "\\" + ch;
        }
        if (isUnicode(ch)) {
            return "[\\u4e00-\\u9fa5]";
        }
        return ch;
    })
        .join('');
    if (level === Level.normal) {
        return expr;
    }
    return expr
        .replace(/(\\w)+/g, "\\w+")
        .replace(/(\\d)+/g, "\\d+")
        .replace(/(\[\\u4e00-\\u9fa5\]){2,}/g, "[\\u4e00-\\u9fa5]+");
}
function generate(raw, samples, options) {
    var _a, _b;
    var opts = {
        level: (_a = options === null || options === void 0 ? void 0 : options.level) !== null && _a !== void 0 ? _a : 'fuzzy',
        separator: (_b = options === null || options === void 0 ? void 0 : options.separator) !== null && _b !== void 0 ? _b : ''
    };
    var emptyResult = {
        expr: '.*',
        matches: {}
    };
    if (samples.length === 0 || !raw || !raw.trim()) {
        return emptyResult;
    }
    var sortedSamples = samples
        .slice(0)
        .sort(function (a, b) { return a.startIndex - b.startIndex; });
    var result = {
        expr: '^',
        matches: sortedSamples.reduce(function (acc, item, index) {
            acc[item.name] = index + 1;
            return acc;
        }, {})
    };
    return sortedSamples.reduce(function (_a, item) {
        var _b = __read(_a, 2), endIndex = _b[0], result = _b[1];
        var nextStartIndex = item.startIndex;
        var slice = raw.slice(endIndex, nextStartIndex);
        var count = 0;
        var separator = '';
        if (!opts.separator) {
            var characterMap = punctuationCount(slice);
            var entry = findMaxCountCharacter(characterMap);
            separator = entry[0];
            count = entry[1];
        }
        else {
            separator = opts.separator;
            count = characterCount(slice, separator);
        }
        var chs = isRegExpMetaChar(separator) ? "\\" + separator : separator;
        var prevExpr = count === 0 ? '' : "(?:[^" + chs + "\\n]*" + chs + "){" + count + "}";
        var lastIndex = slice.lastIndexOf(separator);
        var middleExpr = lastIndex === slice.length - 1 ? '' : transformCharacter(slice.slice(lastIndex + 1), Level.fuzzy);
        var notGreed = middleExpr.endsWith('+') ? middleExpr + "?" : middleExpr;
        var targetExpr = "(" + transformCharacter(item.value, Level[opts.level]) + ")";
        result.expr += (prevExpr + notGreed + targetExpr);
        return [nextStartIndex + item.value.length, result];
    }, [0, result])[1];
}
exports.generate = generate;
//# sourceMappingURL=regExpGenerator.js.map