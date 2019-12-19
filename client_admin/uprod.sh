#!/usr/bin/env bash
server="root@39.105.14.82"
npm run build:prod
scp -r dist/*  ${server}:/home/ai_assist/ai_admin/public/


scp -r /Users/saplmm/Desktop/qrcode_for_gh_ca1418f4d13f_344.jpg  root@39.105.14.82:/home/ai_assist/ai_client/h5/
