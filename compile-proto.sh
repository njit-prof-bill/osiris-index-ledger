#!/bin/bash

cd "$(dirname "$0")"

# https://stackoverflow.com/a/77131901

# Initialize variables for input and output directories
PROTO_ROOT_DIR=./proto/
OUTPUT_DIR=./generated/

# Parse command-line arguments for input and output directories
while getopts "i:o:" opt; do
	case $opt in
	i) PROTO_ROOT_DIR="$OPTARG" ;;
	o) OUTPUT_DIR="$OPTARG" ;;
	*)
		echo "Invalid option: -$OPTARG" >&2
		exit 1
		;;
	esac
done

# Validate that directories have been provided
if [ -z "$PROTO_ROOT_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
	echo "Usage: $0 -i <input_directory> -o <output_directory>"
	exit 1
fi

# Check if the output directory exists, if not create it
if [ ! -d "$OUTPUT_DIR" ]; then
	echo "Output directory $OUTPUT_DIR does not exist. Creating..."
	mkdir -p "$OUTPUT_DIR"
fi

# Function to compile proto files
compile_proto_files() {
	for PROTO_FILE in "$1"*.proto; do
		if [ -f "$PROTO_FILE" ]; then
			echo "Compiling $PROTO_FILE..."
			protoc --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --ts_out=grpc_js:$OUTPUT_DIR -I $PROTO_ROOT_DIR $PROTO_FILE
			# have to add buffer import to make deno happy
			output_file=${OUTPUT_DIR}/$(basename ${PROTO_FILE} .proto).ts
			sed -i -e "1i // deno-lint-ignore-file no-namespace no-explicit-any\nimport { Buffer } from \"node:buffer\";" ${output_file}
		fi
	done

	for SUB_DIR in "$1"/*/; do
		if [ -d "$SUB_DIR" ]; then
			compile_proto_files "$SUB_DIR"
		fi
	done
}

# Start the script
echo "Starting proto compilation..."
compile_proto_files "$PROTO_ROOT_DIR"
echo "Proto compilation complete."
