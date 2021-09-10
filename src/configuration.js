import { name } from "../package.json";

const configuration = {
    name: name.replace("/", "-").slice(1)
};

const configurationDimension = {
    unit: process.env.DIMENSION_UNIT || null
}

export { configuration, configurationDimension };
export default configuration;
