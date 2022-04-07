#!/bin/sh
# Push the status to the dev server running on localhost
# by running `npm run dev`

curl -vv -X PUT http://localhost:3000/api/data -H "Authorization: token DEADKEY"
