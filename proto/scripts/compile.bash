#!/bin/bash

TS_PROTO_PLUGIN_DIR="$(pwd)/node_modules/.bin/protoc-gen-ts_proto"
TS_PROTO_OUT_DIR="src"
PROTO_FILES="proto/*.proto"

TS_ARGS=(
  'nestJs=true'
  'esModuleInterop=true'
  'returnObservable=false'
  'lowerCaseServiceMethods=true'
  'outputEncodeMethods=false'
  'outputJsonMethods=false'
  'outputClientImpl=false'
  'snakeToCamel=true'
  'longs=Number'
)

npx protoc \
  --experimental_allow_proto3_optional \
  --plugin=$TS_PROTO_PLUGIN_DIR \
  --ts_proto_out=$TS_PROTO_OUT_DIR \
  --ts_proto_opt="$(
    IFS=,
    echo "${TS_ARGS[*]}"
  )" \
  -I=$PWD \
  $PROTO_FILES
