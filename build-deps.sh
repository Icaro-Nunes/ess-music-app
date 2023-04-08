#!/bin/bash

cd music-app-models/
npm install
npm run tsc

cd ../database-abstraction-layer/
npm install
npm run tsc

cd ../database-json-implementation/
npm install
npm run tsc