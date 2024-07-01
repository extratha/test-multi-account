#!/bin/sh

echo "Replacing environment variables..."

find /app/.next/server/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_BASE_API_URL#$NEXT_PUBLIC_BASE_API_URL#g"
find /app/.next/server/pages \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_BASE_API_URL#$NEXT_PUBLIC_BASE_API_URL#g"
find /app/.next/server/app \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_BASE_API_URL#$NEXT_PUBLIC_BASE_API_URL#g"
find /app/.next/static/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_BASE_API_URL#$NEXT_PUBLIC_BASE_API_URL#g"
find /app/.next/required-server-files.json \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_BASE_API_URL#$NEXT_PUBLIC_BASE_API_URL#g"
find /app/server.js \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_BASE_API_URL#$NEXT_PUBLIC_BASE_API_URL#g"

# Start Firebase
find /app/.next/server/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_API_KEY#$NEXT_PUBLIC_FIREBASE_API_KEY#g"
find /app/.next/server/pages \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_API_KEY#$NEXT_PUBLIC_FIREBASE_API_KEY#g"
find /app/.next/server/app \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_API_KEY#$NEXT_PUBLIC_FIREBASE_API_KEY#g"
find /app/.next/static/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_API_KEY#$NEXT_PUBLIC_FIREBASE_API_KEY#g"
find /app/.next/required-server-files.json \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_API_KEY#$NEXT_PUBLIC_FIREBASE_API_KEY#g"
find /app/server.js \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_API_KEY#$NEXT_PUBLIC_FIREBASE_API_KEY#g"

find /app/.next/server/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#g"
find /app/.next/server/pages \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#g"
find /app/.next/server/app \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#g"
find /app/.next/static/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#g"
find /app/.next/required-server-files.json \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#g"
find /app/server.js \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN#g"

find /app/.next/server/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_PROJECT_ID#$NEXT_PUBLIC_FIREBASE_PROJECT_ID#g"
find /app/.next/server/pages \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_PROJECT_ID#$NEXT_PUBLIC_FIREBASE_PROJECT_ID#g"
find /app/.next/server/app \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_PROJECT_ID#$NEXT_PUBLIC_FIREBASE_PROJECT_ID#g"
find /app/.next/static/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_PROJECT_ID#$NEXT_PUBLIC_FIREBASE_PROJECT_ID#g"
find /app/.next/required-server-files.json \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_PROJECT_ID#$NEXT_PUBLIC_FIREBASE_PROJECT_ID#g"
find /app/server.js \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_PROJECT_ID#$NEXT_PUBLIC_FIREBASE_PROJECT_ID#g"

find /app/.next/server/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#g"
find /app/.next/server/pages \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#g"
find /app/.next/server/app \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#g"
find /app/.next/static/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#g"
find /app/.next/required-server-files.json \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#g"
find /app/server.js \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET#g"

find /app/.next/server/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#g"
find /app/.next/server/pages \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#g"
find /app/.next/server/app \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#g"
find /app/.next/static/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#g"
find /app/.next/required-server-files.json \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#g"
find /app/server.js \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID#g"

find /app/.next/server/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_APP_ID#$NEXT_PUBLIC_FIREBASE_APP_ID#g"
find /app/.next/server/pages \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_APP_ID#$NEXT_PUBLIC_FIREBASE_APP_ID#g"
find /app/.next/server/app \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_APP_ID#$NEXT_PUBLIC_FIREBASE_APP_ID#g"
find /app/.next/static/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_APP_ID#$NEXT_PUBLIC_FIREBASE_APP_ID#g"
find /app/.next/required-server-files.json \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_APP_ID#$NEXT_PUBLIC_FIREBASE_APP_ID#g"
find /app/server.js \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_APP_ID#$NEXT_PUBLIC_FIREBASE_APP_ID#g"

find /app/.next/server/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#g"
find /app/.next/server/pages \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#g"
find /app/.next/server/app \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#g"
find /app/.next/static/chunks \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#g"
find /app/.next/required-server-files.json \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#g"
find /app/server.js \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MOCK_NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID#g"
# End Firebase

echo "Environment variables replaced."

exec "$@"
