import test from "ava";

import { configuration } from "../src/configuration.js";

test("init", t => {

    // INIT TEST //
    t.true(typeof(configuration) === "object");

});
