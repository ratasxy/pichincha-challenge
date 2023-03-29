FROM python:3.8-alpine

COPY ./app/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt
COPY ./app /app

EXPOSE 5000
ENTRYPOINT [ "python" ]
CMD ["main.py" ]