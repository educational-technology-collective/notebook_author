FROM python:3.12-alpine

RUN apk update && \
    apk add nano

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

COPY ./requirements.txt /app/backend/
RUN pip install -r requirements.txt

COPY . /app/backend/

EXPOSE 9102

CMD ["python", "manage.py", "runserver", "0.0.0.0:9102"]