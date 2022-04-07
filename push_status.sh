#!/bin/sh
# Push the status to the dev server running on localhost
# by running `npm run dev`

curl -vv -X PUT http://localhost:3000/api/data -H "Content-Type: application/json" -H "Authorization: token DEADKEY1" --data @example-status.json
