.PHONY: help build up down test lint migrate rotate-credentials audit-principals

help:
	@echo "Service Principal Lifecycle - Management Commands"
	@echo "------------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "rotate-credentials : Run automated credential rotation"
	@echo "audit-principals   : Run identity risk audit"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

rotate-credentials:
	docker-compose exec api python scripts/rotate/run.py

audit-principals:
	docker-compose exec api python scripts/audit/analyze.py
