.PHONY: test

test:
	NODE_OPTIONS=--experimental-vm-modules yarn run jest

test-watch:
	NODE_OPTIONS=--experimental-vm-modules yarn run jest --watch-all
