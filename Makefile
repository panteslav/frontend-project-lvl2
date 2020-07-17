install:
	npm install

build:
	npm run-script build

start:
	npx node bin/index.js

publish:
	npm publish ---dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
