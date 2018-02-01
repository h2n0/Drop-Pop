#!/usr/bin/env bash
uglifyjs -c sequences=true,conditionals=true,booleans=true -m --output drops.min.js drops.js && uglifyjs -c sequences=true,conditionals=true,booleans=true -m --output pops.min.js pops.js

if [ $? == 0 ]; then
  echo "Compressed fine"
else
  echo "Error in compression"
  exit 1
fi

D=`ls -l drops.* | awk '{print $5}'`
O=$(echo $D | awk '{print $1}')
S=$(echo $D | awk '{print $2}')
DR=$(echo "100 - ($S / $O) * 100" | node -p)
DF=$(echo "($S / 1000)" | node -p)
P=`ls -l pops.* | awk '{print $5}'`
O=$(echo $P | awk '{print $1}')
S=$(echo $P | awk '{print $2}')
PR=$(echo "100 - ($S / $O) * 100" | node -p)
PF=$(echo "($S / 1000)" | node -p)

echo "${DR:0:5}% change in Drop files - ${DF:0:3}KB"
echo "${PR:0:5}% change in Pop files - ${PF:0:3}KB"
exit 0
