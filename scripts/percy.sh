#/usr/bin/env bash 
./node_modules/.bin/tsx ./bin/ooxml-render.ts render ./scripts/test-files/simple.docx

npx percy snapshot ./docx-files
# find ./docx-files -name '*.html' -print0 | 
#     while IFS= read -r -d '' filepath; do 
#         npx percy snapshot "$filepath"
#     done