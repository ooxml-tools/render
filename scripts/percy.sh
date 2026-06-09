#/usr/bin/env bash 
set -e

./node_modules/.bin/tsx ./bin/ooxml-render.ts render ./scripts/test-files/simple.docx

pnpx percy snapshot ./docx-files
# find ./docx-files -name '*.html' -print0 | 
#     while IFS= read -r -d '' filepath; do 
#         pnpx percy snapshot "$filepath"
#     done