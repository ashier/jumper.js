CSS = lib/templates/default.css
LESS = lib/templates/default.less
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#


build:
	@echo "\n${HR}"
	@./node_modules/.bin/recess --compile --compress ${LESS} > ${CSS}
	@echo "Compiling LESS with Recess...               ${CHECK} Done"
	@echo "\n${HR}"
	@echo "LESS successfully compiled at ${DATE}."
	@echo "${HR}\n"
