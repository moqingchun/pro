module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1646374146962, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("@turf/helpers");
var invariant_1 = require("@turf/invariant");
var line_segment_1 = __importDefault(require("@turf/line-segment"));
var meta_1 = require("@turf/meta");
var geojson_rbush_1 = __importDefault(require("geojson-rbush"));
/**
 * Takes any LineString or Polygon GeoJSON and returns the intersecting point(s).
 *
 * @name lineIntersect
 * @param {GeoJSON} line1 any LineString or Polygon
 * @param {GeoJSON} line2 any LineString or Polygon
 * @returns {FeatureCollection<Point>} point(s) that intersect both
 * @example
 * var line1 = turf.lineString([[126, -11], [129, -21]]);
 * var line2 = turf.lineString([[123, -18], [131, -14]]);
 * var intersects = turf.lineIntersect(line1, line2);
 *
 * //addToMap
 * var addToMap = [line1, line2, intersects]
 */
function lineIntersect(line1, line2) {
    var unique = {};
    var results = [];
    // First, normalize geometries to features
    // Then, handle simple 2-vertex segments
    if (line1.type === "LineString") {
        line1 = helpers_1.feature(line1);
    }
    if (line2.type === "LineString") {
        line2 = helpers_1.feature(line2);
    }
    if (line1.type === "Feature" &&
        line2.type === "Feature" &&
        line1.geometry !== null &&
        line2.geometry !== null &&
        line1.geometry.type === "LineString" &&
        line2.geometry.type === "LineString" &&
        line1.geometry.coordinates.length === 2 &&
        line2.geometry.coordinates.length === 2) {
        var intersect = intersects(line1, line2);
        if (intersect) {
            results.push(intersect);
        }
        return helpers_1.featureCollection(results);
    }
    // Handles complex GeoJSON Geometries
    var tree = geojson_rbush_1.default();
    tree.load(line_segment_1.default(line2));
    meta_1.featureEach(line_segment_1.default(line1), function (segment) {
        meta_1.featureEach(tree.search(segment), function (match) {
            var intersect = intersects(segment, match);
            if (intersect) {
                // prevent duplicate points https://github.com/Turfjs/turf/issues/688
                var key = invariant_1.getCoords(intersect).join(",");
                if (!unique[key]) {
                    unique[key] = true;
                    results.push(intersect);
                }
            }
        });
    });
    return helpers_1.featureCollection(results);
}
/**
 * Find a point that intersects LineStrings with two coordinates each
 *
 * @private
 * @param {Feature<LineString>} line1 GeoJSON LineString (Must only contain 2 coordinates)
 * @param {Feature<LineString>} line2 GeoJSON LineString (Must only contain 2 coordinates)
 * @returns {Feature<Point>} intersecting GeoJSON Point
 */
function intersects(line1, line2) {
    var coords1 = invariant_1.getCoords(line1);
    var coords2 = invariant_1.getCoords(line2);
    if (coords1.length !== 2) {
        throw new Error("<intersects> line1 must only contain 2 coordinates");
    }
    if (coords2.length !== 2) {
        throw new Error("<intersects> line2 must only contain 2 coordinates");
    }
    var x1 = coords1[0][0];
    var y1 = coords1[0][1];
    var x2 = coords1[1][0];
    var y2 = coords1[1][1];
    var x3 = coords2[0][0];
    var y3 = coords2[0][1];
    var x4 = coords2[1][0];
    var y4 = coords2[1][1];
    var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    var numeA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
    var numeB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
    if (denom === 0) {
        if (numeA === 0 && numeB === 0) {
            return null;
        }
        return null;
    }
    var uA = numeA / denom;
    var uB = numeB / denom;
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        var x = x1 + uA * (x2 - x1);
        var y = y1 + uA * (y2 - y1);
        return helpers_1.point([x, y]);
    }
    return null;
}
exports.default = lineIntersect;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1646374146962);
})()
//miniprogram-npm-outsideDeps=["@turf/helpers","@turf/invariant","@turf/line-segment","@turf/meta","geojson-rbush"]
//# sourceMappingURL=index.js.map