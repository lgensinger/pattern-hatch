import test from "ava";

import { configuration, configurationDimension } from "../src/configuration.js";
import { HatchPattern } from "../src/index.js";

/******************** EMPTY VARIABLES ********************/

// initialize
let hp = new HatchPattern();

// TEST INIT //
test("init", t => {

    t.true(hp.startingPoint != null);

});

// TEST get DATA //
test("get_data", t => {

    t.true(typeof(hp.data) == "object");
    t.true(hp.data.length == 2);
    t.true(hp.data[0].length == 2);
    t.true(hp.data[1].length == 2);

});

// TEST GENERATE //
test("generate", t => {

    // clear document
    document.body.innerHTML = "";

    // generate an svg artboard
    let tag = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tag.setAttributeNS(null, "id", "artboard");
    tag.setAttributeNS(null, "width", 100);
    tag.setAttributeNS(null, "height", 100);
    document.body.appendChild(tag);

    // get generated element
    let artboard = document.querySelector("#artboard");

    // generate pattern inside artboard
    hp.generate(artboard, "test");

    // get generated pattern
    let pattern = document.querySelector("#test");

    t.true(pattern !== undefined);
    t.true(pattern.nodeName == "pattern");

});

/******************** DECLARED PARAMS ********************/

let unit = 25;
let startingPoint = "bottom";

// initialize
let hpp = new HatchPattern(unit);

// TEST INIT //
test("init_params", t => {

    t.true(hpp.startingPoint != null);
    t.true(hpp.unit == unit);

});

// TEST get DATA //
test("get_data_params", t => {

    t.true(typeof(hpp.data) == "object");
    t.true(hpp.data.length == 2);
    t.true(hpp.data[0].length == 2);
    t.true(hpp.data[1].length == 2);

});

// TEST GENERATE //
test("generate_params", t => {

    // clear document
    document.body.innerHTML = "";

    // generate an svg artboard
    let tag = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tag.setAttributeNS(null, "id", "artboard");
    tag.setAttributeNS(null, "width", 100);
    tag.setAttributeNS(null, "height", 100);
    document.body.appendChild(tag);

    // get generated element
    let artboard = document.querySelector("#artboard");

    // generate pattern inside artboard
    hp.generate(artboard, "test");

    // get generated pattern
    let pattern = document.querySelector("#test");

    t.true(pattern !== undefined);
    t.true(pattern.nodeName == "pattern");

});
