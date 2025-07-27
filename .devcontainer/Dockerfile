FROM mcr.microsoft.com/devcontainers/go:1-1.24-bookworm AS dev

ENV DEBIAN_FRONTEND=noninteractive

RUN git config --global core.autocrlf input \
    && git config --global --add safe.directory /workspaces/go-react-template

RUN apt update && apt upgrade -y

RUN chown -R vscode:vscode /go

RUN go install github.com/air-verse/air@latest
