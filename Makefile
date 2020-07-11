install:
	npm install

start:
	npx node bin/index.js

publish:
	npm publish ---dry-run

lint:
	npx eslint .
