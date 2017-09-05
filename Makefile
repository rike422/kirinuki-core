MAKEFLAGS = -j1

build-and-copy:
	npm run build
	cp -r lib demo/

serve:
	make build-and-copy
	cd demo; npm run serve

build:
	make build-and-copy
	cd demo; npm run build

doc-deploy:
	make build-and-copy
	cd demo; npm run deploy