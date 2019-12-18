#!/usr/bin/env bash
server="root@112.126.68.102"
npm run build:dep
scp -r dist/* ${server}:/home/ai_assist/ai_admin/public/
