SHELL           := /usr/bin/zsh

publish :
	NO_COLOR=1 npm run build -- --clearScreen false
	rsync -auz --info=progress2 dist tilrr:tilrr.bvraghav.com
