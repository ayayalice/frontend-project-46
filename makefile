install:
	npm ci
lint:
	npx eslint --fix .
tests:
	NODE_OPTIONS=--experimental-vm-modules npx jest
tests-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage