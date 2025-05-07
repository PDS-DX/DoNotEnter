FROM python:3.12.3-bookworm
LABEL authors="preston sparks"

WORKDIR /app

RUN pip install pipenv

COPY Pipfile ./
COPY Pipfile.lock ./

RUN pipenv install --deploy --system

# COPY . .

COPY entry.sh /entry.sh
RUN chmod +x /entry.sh

ENTRYPOINT ["/entry.sh"]