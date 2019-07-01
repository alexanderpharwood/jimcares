# Jimcares
**J**avaScript **I**n-**M**emory **CA**ching **RE**source **S**ingleton

Jimcares is a singleton for JavaScript in-memory caching. It is used to store complex data in memory, or large (ish) api results which only need fetching once. It allows for querying the properties within large data structures, as well as more simple read/write functionality.


## API

Initialise Jim.
Jim.init({object} options)

Jim.has({string} path)

Jim.remember({mixed} value, {string} path, {string} expires_at)

Jim.get({string} path)

Jim.root({string} path)

Jim.writeToLS()

Jim.trash({string} path)

Jim.forget({string} path)

Jim.toJson()

Jim.size()

Jim.count()

Jim.equals({string} path, {mixed} value)

Jim.clear()

Jim.destroy()
