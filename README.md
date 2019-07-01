# Jimcares
**J**avaScript **I**n-**M**emory **CA**ching **RE**source **S**ingleton

Jimcares is a singleton for JavaScript in-memory caching. It is used to store complex data in memory, or large (ish) api results which only need fetching once. It allows for querying the properties within large data structures, as well as more simple read/write functionality.


## API

Initialise Jim.  
Jim.init({object} options)

Check if Jim has the given path.  
Jim.has({string} path)

Remember a given value in cache, at the given path.  
Jim.remember({string} path, {mixed} value, {string} expires_at)

Get the value at the given path.  
Jim.get({string} path)

Get the root of the given path.  
Jim.root({string} path)

Write the entire cache to local storage.  
Jim.writeToLS()

Sort delete the given path.  
Jim.trash({string} path)

Permanently forget thee given path.  
Jim.forget({string} path)

Get the entire cache as a Json string.
Jim.toJson()

Get an approximate size of the entire cache in bytes.
Jim.size()

Count the number of roots in the cache.
Jim.count()

Check if a given value of a path matches another value.  
Jim.equals({string} path, {mixed} value)

Clear all roots from the cache.  
Jim.clear()

Remove jimcares from the window entirely.  
Jim.destroy()
