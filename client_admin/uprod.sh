#!/usr/bin/env bash
#server="root@39.105.14.82"
server="root@39.106.95.146"
npm run build:prod
scp -r dist/*  ${server}:/home/ai_assist/ai_admin/public/
