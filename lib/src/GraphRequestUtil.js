"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * To hold list of OData query params
 */
exports.oDataQueryNames = ["$select", "$expand", "$orderby", "$filter", "$top", "$skip", "$skipToken", "$count"];
/**
 * To construct the URL by appending the segments with "/"
 * @param {string[]} urlSegments - The array of strings
 * @returns The constructed URL string
 */
exports.urlJoin = function (urlSegments) {
    var removePostSlash = function (s) { return s.replace(/\/+$/, ''); }, removePreSlash = function (s) { return s.replace(/^\/+/, ''); }, joiner = function (pre, cur) { return [removePostSlash(pre), removePreSlash(cur)].join('/'); }, parts = Array.prototype.slice.call(urlSegments);
    return parts.reduce(joiner);
};
/**
 * Serializes the content
 * @param {any} content - The content value that needs to be serialized
 * @returns The serialized content
 *
 * Note:
 * This conversion is required due to the following reasons:
 * Body parameter of Request method of isomorphic-fetch only accepts Blob, ArrayBuffer, FormData, TypedArrays string.
 * Node.js platform does not support Blob, FormData. Javascript File object inherits from Blob so it is also not supported in node. Therefore content of type Blob, File, FormData will only come from browsers.
 * Parallel to ArrayBuffer in javascript, node provides Buffer interface. Node's Buffer is able to send the arbitrary binary data to the server successfully for both Browser and Node platform. Whereas sending binary data via ArrayBuffer or TypedArrays was only possible using Browser. To support both Node and Browser, `serializeContent` converts TypedArrays or ArrayBuffer to `Node Buffer`.
 * If the data received is in JSON format, `serializeContent` converts the JSON to string.
 */
exports.serializeContent = function (content) {
    var className = content.constructor.name;
    if (className === 'Buffer'
        || className === 'Blob'
        || className === 'File'
        || className === 'FormData'
        || typeof content === 'string') {
        return content;
    }
    if (className === 'ArrayBuffer') {
        content = Buffer.from(content);
    }
    else if (className === 'Int8Array' || className === 'Int16Array' || className === 'Int32Array' || className === 'Uint8Array' || className === 'Uint16Array' || className === 'Uint32Array' || className === 'Uint8ClampedArray' || className === 'Float32Array' || className === 'Float64Array' || className === 'DataView') {
        content = Buffer.from(content.buffer);
    }
    else {
        try {
            content = JSON.stringify(content);
        }
        catch (error) {
            throw new Error("Unable to stringify the content");
        }
    }
    return content;
};
//# sourceMappingURL=GraphRequestUtil.js.map