SHELL           := /usr/bin/zsh

publish :
	pnpm build
	rsync -auz --info=progress2 dist tilrr:tilrr.bvraghav.com
