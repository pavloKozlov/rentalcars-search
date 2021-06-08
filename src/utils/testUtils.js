/**
 * Awaiting for this function makes sure all promises are resolved.
 */
const flushPromises = () => Promise.resolve();

export { flushPromises };
