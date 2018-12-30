/* eslint-disable */
export default function removeProperty(element, property) {
    Object.defineProperty(element, property, {
        get: () => {
            return undefined;
        },
    });
}
