black --check -l 120 .
flake8 --max-line-length 120
mypy app.py
pytest --mypy