import { HatchPattern } from "./index.js";
import { select } from "d3-selection";

import { configurationDimension } from "../configuration.js";

/**
 * CrosshatchPattern is an svg crosshatch pattern.
 * @param {integer} unit - grid unit
 */
class CrosshatchPattern extends HatchPattern {
    constructor(unit=configurationDimension.unit) {
        // initialize inheritance
        super(unit);
    }

    /**
     * Generate an SVG crosshatch tessellation.
     * @param {domNode} artboard - svg dom element
     * @param {string} id - pattern id
     */
    generate(artboard, id) {

        // add pattern element
        this.pattern = select(artboard)
            .append("pattern")
            .attr("id", id)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this.unit)
            .attr("height", this.unit)
            .attr("patternUnits", "userSpaceOnUse");

        // background
        this.pattern.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this.unit)
            .attr("height", this.unit);

        // update self
        this.startingPoint = "top";

        // generate line
        this.hatch(this.data);

        // update self
        this.startingPoint = "bottom";

        // generate line
        this.hatch(this.data);

    }

};

export { CrosshatchPattern };
export default CrosshatchPattern;
