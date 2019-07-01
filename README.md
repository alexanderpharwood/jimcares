# Jimcares

**J**avaScript **I**n-**M**emory **CA**ching **RE**source **S**ingleton

![npm](https://img.shields.io/npm/v/jimcares.svg)
[![Build Status](https://travis-ci.org/alexanderpharwood/jimcares.svg?branch=master)](https://travis-ci.org/alexanderpharwood/jimcares)
![npm bundle size](https://img.shields.io/bundlephobia/min/jimcares.svg)
![npm](https://img.shields.io/npm/dm/jimcares.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/alexanderpharwood/jimcares.svg)
![GitHub issues](https://img.shields.io/github/issues/alexanderpharwood/jimcares.svg)  

Jimcares is a singleton for JavaScript in-memory caching. It is used to store complex data in memory, or large api responses which only need fetching once. It allows for querying the properties within large data structures, as well as more simple read/write functionality.


## API

#### Jim.init()
Initialise Jim. The default expiration will be 24 hours if this property is not specified. Setting a custom queryNotation will allow you to query nested objects. The default is a slash. See [Querying Objects](#querying_objects) for more information.  
**Parameter** {object} options  
**Returns** void  
**Throws** TypeError  
```
let options = {
	defaultExpiration: "4 hours",
	queryNotation: "."
}
Jim.init(options);
```

#### Jim.remember()
Tell Jim to remember a value. You can override the default expiration for a given root.
**Parameter** {string} path  
**Parameter** {mixed} value  
**Parameter** {string} expiration  
**Returns** boolean  
**Throws** TypeError  
```
Jim.remember('example', {example: true}, '10 minutes');
```

#### Jim.has()  
Check if Jim has a value at the given path.  
**Parameter** {string} path  
**Returns** boolean  
**Throws** TypeError  
```
Jim.has('example') === true;
```

#### Jim.get()  
Get the value at the given path.  
**Parameter** {string} path  
**Returns** mixed  
**Throws** TypeError  
```
Jim.get('example');
```

#### Jim.root()  
Get the root at the given path, including: value, created_at, updated_at, deleted_at, expires_at.  
**Parameter** {string} path  
**Returns** object  
**Throws** TypeError  
```
Jim.root('example');
```

#### Jim.trash()  
Soft-delete the root at the given path. This sets the deleted_at property to the value of a current timestamp.  
**Parameter** {string} path  
**Returns** void  
**Throws** TypeError  
```
Jim.trash('example');
```

#### Jim.isTrashed()  
Check if the root at the given path has been soft-deleted. Note: this method will return false if the path is undefined.  
**Parameter** {string} path  
**Returns** boolean  
**Throws** TypeError  
```
Jim.isTrashed('example') === true;
```

#### Jim.forget()  
Forget the root at the given path permanently.  
**Parameter** {string} path  
**Returns** void  
**Throws** TypeError  
```
Jim.forget('example');
```

#### Jim.flush()  
Flush the cache of all its roots.  
**Returns** void  
```
Jim.flush();
```

#### Jim.equals()  
Check if a given value of a path matches the given comparison.  
**Parameter** {string} path  
**Parameter** {mixed} comparison  
**Returns** boolean  
**Throws** TypeError  
```
Jim.equals('example', 'Does not match') === false;
```

#### Jim.writeToLS()  
Writes the entire cache to local storage. This can be used for later retrieval.  
**Returns** void  
**Throws** Error if the client does not support local storage  
```
Jim.writeToLS();
```

#### Jim.toJson()  
Get the entire cache as a JSON string.  
**Returns** string  
```
Jim.toJson();
```

#### Jim.destroy()  
Removes __jimcares from the window entirely. Note: The Jim singleton will still be present, so you can run the init() method again at any time.  
**Returns** void  
```
Jim.destroy();
```

## In Progress 
Note: the below methods are currently available but are being refactored into a stats method, and will soon be deprecated.  

Get an approximate size of the entire cache in bytes.  
Jim.size()

Count the number of roots in the cache.  
Jim.count()

<a name="querying_objects"></a>
## Querying objects with Jim.get()  
You can use certain notations to get nested properties of objects. For example:

```
let data = {
	"foo": {
		"bar": "val" 
	}
};

Jim.remember('example', data);
Jim.get('example/foo/bar') === "val"
```

Note: slash notation is the default. You can specify an alternative via the init method.
