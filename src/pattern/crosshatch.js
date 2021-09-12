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
     * @param {string} className - individual line class
     * @param {string} id - pattern id
     */
    generate(artboard, id, className="hatch") {

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

        // generate shapes
        this.generateShapes(className);

    }

    /**
     * Generate an SVG line shapes.
     * @param {string} className - overarching class for line regardless of direction.
     */
    generateShapes(className) {

        // update self
        this.className = `${className}-top-to-bottom`;
        this.startingPoint = "top";

        // generate coordinate for hatch
        let topToBottom = [this.data];

        // generate line
        this.hatch(topToBottom);

        // update self
        this.className = `${className}-bottom-to-top`;
        this.startingPoint = "bottom";

        // generate coordinate for hatch
        let bottomToTop = [this.data];

        // generate line
        this.hatch(bottomToTop);

    }

};

export { CrosshatchPattern };
export default CrosshatchPattern;
