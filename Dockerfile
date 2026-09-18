FROM python:3.12-alpine
WORKDIR /app
COPY docs/ /app
CMD ["sh", "-c", "python -m http.server ${PORT:-8080}"]
