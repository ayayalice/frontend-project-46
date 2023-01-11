install:
	npm ci
lint:
	npx eslint .
tests:
	NODE_OPTIONS=--experimental-vm-modules npx jest