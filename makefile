install:
	npm ci
publish:
	npm publish --dry-run
link:
	sudo npm link
lint:
	npx eslint --fix .
tests:
	NODE_OPTIONS=--experimental-vm-modules npx jest
tests-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage