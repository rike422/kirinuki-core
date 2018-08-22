// @flow

import { context as nodeContext } from "./env/node";
import { context as browserContext } from "./env/browser";
import { unfold } from "./unfold";
import { isPlural, isString } from "./util";
import { traversal } from "./traversal";

export const node = traversal(nodeContext);
export const browser = traversal(browserContext);
