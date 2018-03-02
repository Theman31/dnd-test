# dnd-test

### What to do:
******

1. Build the db on localhost
  - _Global install generate-schema and build schemas_
    - `npm install -g generate-schema`

    - now you need a single json object out of each of the arrays, check test.json

    - run `generate-schema test.json -m`  the dash m is the flag for `mongoose` schema set

    - this will give you an object output and can be placed directly into your schema.

    - check Feature.js this is a schema for feature, don't deviate from the current setup it is there for a reason.

  - _Before the next step I tested a post route and a get route with hardcoded values, they are in here.  This assured me that all would work as planned._
  - _import all the datasets to localhost the same way you imported datasets to the cloudDb_
    - Find and replace all the url pathnames -> - `find . -name '*.json' -print0 | xargs -0 sed -i "" "s/http:\/\/www.dnd5eapi.co\//http:\/\/localhost:5000\//g"`

    - `mongoimport -h localhost:27017 -d dnd-test -c feature --file upload-5e-SRD-features.json --jsonArray` dnd-test was the name I chose

2. Export each collection in the database from localhost ->  `mongoexport --db dnd-test --collection feature --out feature.json`

  - run the command to update all the pathnames inside all `.bson` and `.json` files

    - update all your pathnames agian -> `find . -name '*.json' -print0 | xargs -0 sed -i "" "s/localhost:5000\//https:\/\/shrouded-stream-28894.herokuapp.com\//g"`

  - you may need to shell into your db and drop all the databases
    - Shell in -> `mongo ds251548.mlab.com:51548/heroku_snj3hp52 -u heroku_snj3hp52 -p 8jek722hat1819subntj0b00mk`

    - get collection names -> `let names = db.getCollectionNames()`

    - users do not have write privilege on system indexes loop through the rest -> `names.forEach((name)=> {if(name != "system.indexes")db[name].drop();});`

  - now import each to your database -> `mongoimport -h localhost:27017 -d dnd-test -c feature --file upload-5e-SRD-features.json`


### Document process for find and replace
*****
I googled -> `find and replace in all files in directory mac`

[like this](http://www.letmegooglethat.com/?q=find+and+replace+in+all+files+in+directory+mac)

[first link in results, third answer](https://stackoverflow.com/questions/9704020/recursive-search-and-replace-in-text-files-on-mac-and-linux#)

this one didn't work ->
`find . -type f -name 'test.json' -exec sed -i '' s/http:\/\/www.dnd5eapi.co\//http:\/\/localhost:5000\// {} +`

[didn't help](https://community.openhab.org/t/how-to-escape-colon-in-item-regex-transformation/378930)

I originally found this ->
`find . -name '*.txt' -print0 | xargs -0 sed -i "" "s/form/forms/g"`

[needed to double check I was doing this right](https://stackoverflow.com/questions/6076229/escaping-a-forward-slash-in-a-regular-expression)

And changed it to this ->
`find . -name 'test.json' -print0 | xargs -0 sed -i "" "s/http:\/\/www.dnd5eapi.co\//http:\/\/localhost:5000\//g"`

mongoimport -h localhost:27017 -d dnd-test -c feature --file upload-5e-SRD-features.json --jsonArray
