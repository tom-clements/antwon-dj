# syntax=docker/dockerfile:1.3.1

FROM antwon-dj/python-env:1.0.0

WORKDIR /backend

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt
