"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var arithmetic = require("../src/operations/op_list/arithmetic");
var basicMath = require("../src/operations/op_list/basic_math");
var control = require("../src/operations/op_list/control");
var convolution = require("../src/operations/op_list/convolution");
var creation = require("../src/operations/op_list/creation");
var dynamic = require("../src/operations/op_list/dynamic");
var evaluation = require("../src/operations/op_list/evaluation");
var graph = require("../src/operations/op_list/graph");
var image = require("../src/operations/op_list/image");
var logical = require("../src/operations/op_list/logical");
var matrices = require("../src/operations/op_list/matrices");
var normalization = require("../src/operations/op_list/normalization");
var reduction = require("../src/operations/op_list/reduction");
var sliceJoin = require("../src/operations/op_list/slice_join");
var transformation = require("../src/operations/op_list/transformation");
var JSON_DIR = './tfjs-core.json';
var DOC_DIR = '../docs/';
var ops = [
    arithmetic, basicMath, control, convolution, creation, dynamic, evaluation,
    logical, image, graph, matrices, normalization, reduction, sliceJoin,
    transformation
];
function genDoc() {
    return __awaiter(this, void 0, void 0, function () {
        var json, coreApis, output;
        return __generator(this, function (_a) {
            json = JSON.parse(fs.readFileSync(JSON_DIR, 'utf8'));
            coreApis = json.docs.headings.reduce(function (list, h) {
                return h.subheadings ? list.concat(h.subheadings.reduce(function (sublist, sub) {
                    return sublist.concat(sub.symbols);
                }, [])) :
                    list;
            }, []);
            output = [];
            output.push('# Supported Tensorflow Ops\n\n');
            generateTable('Operations', 'Arithmetic', arithmetic.json, output, coreApis);
            generateTable('Operations', 'Basic math', basicMath.json, output, coreApis);
            generateTable('Operations', 'Control Flow', control.json, output, coreApis);
            generateTable('Operations', 'Convolution', convolution.json, output, coreApis);
            generateTable('Tensors', 'Creation', creation.json, output, coreApis);
            generateTable('Operations', 'Dynamic', dynamic.json, output, coreApis);
            generateTable('Operations', 'Evaluation', evaluation.json, output, coreApis);
            generateTable('Tensorflow', 'Graph', graph.json, output, coreApis);
            generateTable('Operations', 'Logical', logical.json, output, coreApis);
            generateTable('Operations', 'Matrices', matrices.json, output, coreApis);
            generateTable('Operations', 'Normalization', normalization.json, output, coreApis);
            generateTable('Operations', 'Images', image.json, output, coreApis);
            generateTable('Operations', 'Reduction', reduction.json, output, coreApis);
            generateTable('Tensors', 'Slicing and Joining', sliceJoin.json, output, coreApis);
            generateTable('Operations', 'Spectral', [], output, coreApis);
            generateTable('Tensors', 'Transformations', transformation.json, output, coreApis);
            console.log(process.cwd());
            fs.writeFileSync(DOC_DIR + 'supported_ops.md', output.join(''));
            console.log("Supported Ops written to " + (DOC_DIR + 'supported_ops.md') + "\n" +
                ("Found " + ops.reduce(function (sum, cat) { return sum += cat.json.length; }, 0) + " ops\n"));
            return [2];
        });
    });
}
function findCoreOps(heading, subHeading, coreApis) {
    return coreApis.filter(function (op) { return op.docInfo.heading === heading &&
        op.docInfo.subheading === subHeading; });
}
function generateTable(heading, subHeading, ops, output, coreApis) {
    var coreOps = findCoreOps(heading, subHeading, coreApis);
    output.push("## " + heading + " - " + subHeading + "\n\n");
    output.push('|Tensorflow Op Name|Tensorflow.js Op Name|\n');
    output.push('|---|---|\n');
    ops.sort(function (a, b) { return a.tfOpName.localeCompare(b.tfOpName); }).forEach(function (element) {
        output.push("|" + element.tfOpName + "|" + element.dlOpName + "|\n");
    });
    coreOps
        .sort(function (a, b) { return a.symbolName.localeCompare(b.symbolName); })
        .forEach(function (element) {
        if (!ops.find(function (op) { return op.dlOpName === element.symbolName; })) {
            output.push("|Not mapped|" + element.symbolName + "|\n");
        }
    });
    output.push('\n');
}
genDoc();
//# sourceMappingURL=gen_doc.js.map