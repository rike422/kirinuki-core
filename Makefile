MAKEFLAGS = -j1

build-and-copy:
	npm run build
	cp -r lib demo/src/

develop:
	make build-and-copy
	cd demo; npm run develop

build:
	make build-and-copy
	cd demo; npm run build

doc-deploy:
	make build-and-copy
	cd demo; npm run deploy
