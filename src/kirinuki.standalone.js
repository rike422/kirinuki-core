// @flow
import { traversal } from "./traversal";
import { context as browserContext } from "./env/browser";

export default traversal(browserContext);
