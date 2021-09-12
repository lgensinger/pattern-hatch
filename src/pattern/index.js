import { select } from "d3-selection";

import { configurationDimension } from "../configuration.js";

/**
 * HatchPattern is an svg hatch pattern.
 * @param {integer} unit - grid unit
 */
class HatchPattern {
    constructor(unit=configurationDimension.unit) {

        // update self
        this.className = null;
        this.pattern = null;
        this.startingPoint = null;
        this.unit = unit;

        // if unit is undefined use a swatch size of 1 font size unit

        if (!unit) {

            // using font size as the base unit of measure make responsiveness easier to manage across devices
            this.unit = typeof window === "undefined" ? 16 : parseFloat(getComputedStyle(document.body).fontSize);

        }

    }

    /**
     * Generate coordinate data for tessellation lines.
     * @returns An array of 2 value array where 0 == [x1, y1], 1 == [x2,y2].
     */
    get data() {

        let coords = null;

        // check direction
        if (this.startingPoint == "bottom") {

            // coords
            coords = [[0, this.unit], [this.unit, 0]];

        // default to top starting point
        } else {

            // coods
            coords = [[0, 0], [this.unit, this.unit]];

        }

        return coords;

    }

    /**
     * Generate line in pattern.
     * @param {array} data - line coordinates where 0 == [x1, y1], 1 == [x2,y2]
     */
    hatch(data) {

        // line
        this.pattern
            .selectAll(`.${this.className}`)
            .data(data)
            .enter()
            .append("line")
            .attr("class", this.className)
            .attr("x1", d => d[0][0])
            .attr("y1", d => d[0][1])
            .attr("x2", d => d[1][0])
            .attr("y2", d => d[1][1]);

    }

    /**
     * Generate an SVG hatch tessellation.
     * @param {domNode} artboard - svg dom element
     * @param {string} className - individual line class
     * @param {string} id - pattern id
     * @param {enum} startingPoint - bottom | top
     */
    generate(artboard, id, startingPoint="top", className="hatch") {

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
        this.className = className;
        this.startingPoint = startingPoint;

        // generate line
        this.hatch([this.data]);

    }

};

export { HatchPattern };
export default HatchPattern;
