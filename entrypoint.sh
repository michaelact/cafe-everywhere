#!/bin/sh

set -e

BASEDIR=/usr/share/nginx/html

change_uri () {
    BASEDIR=$1
    OLD_URI=$2
    NEW_URI=$3

    if [ -n "$NEW_URI" ]; then
        # https://www.shellcheck.net/wiki/SC2038
        find "$BASEDIR" -type f -iname "*" -exec sed -i 's|'"$OLD_URI"'|'"$NEW_URI"'|g' {} \;
    fi
}

change_uri "$BASEDIR" "http://localhost:9999" "$API_URL"
change_uri "$BASEDIR" "API_KEY_NOT_SET" "$API_KEY"

exec nginx -g "daemon off;"