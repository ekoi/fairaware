#!/bin/bash

# Run npm in the background
cd $BASE_DIR/src/frontend
npm run build
npm run start &

cd $BASE_DIR
python src/main.py