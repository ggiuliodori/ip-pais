project=experienciaescuchaactiva
app_name=ip-service
app_version=1.0

build:
	@docker build --no-cache --tag $(project)/$(app_name):$(app_version) --tag $(project)/$(app_name):latest .