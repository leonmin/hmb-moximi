#!/usr/bin/env bash
server="root@39.105.14.82"
npm run build:prod
scp -r dist/*  ${server}:/home/ai_assist/ai_admin/public/
