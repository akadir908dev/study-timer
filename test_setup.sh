# Check if we can run tests
npm i
npm run dev &
sleep 2
curl http://localhost:1420
kill $(jobs -p)
