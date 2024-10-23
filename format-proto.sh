#!/bin/bash

cd "$(dirname "$0")"

for i in $(find . -regex ".*\.\(proto\)$" -type f); do
	if [[ $i == ./node_modules/* || $i == ./dist/* ]]; then
		continue
	fi
	echo formatting "$i"
	clang-format -i "$i"
done
