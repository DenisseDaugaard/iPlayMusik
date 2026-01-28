
// app/api/lib/mapWithLimit.js
export default async function mapWithLimit(items, limit, mapper) {
  const results = new Array(items.length);
  const executing = [];

  for (let i = 0; i < items.length; i++) {
    // Create the promise for this item
    const task = Promise.resolve().then(() => mapper(items[i], i));

    // Store its result in the correct index
    const wrapped = task.then((res) => {
      results[i] = res;
      return res;
    });

    // Track it so we can limit concurrency
    executing.push(wrapped);

    // When it finishes, remove it from the executing list
    wrapped.finally(() => {
      const idx = executing.indexOf(wrapped);
      if (idx >= 0) executing.splice(idx, 1);
    });

    // If we're at the limit, wait for the first one to finish
    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }

  // Wait for remaining tasks
  await Promise.all(executing);

  return results;
}
