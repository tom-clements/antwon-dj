# antwon-dj

## Local development

### Getting started

It is strongly recommended to follow the steps below using `docker` and `docker-compose`
to facilitate local development - this ensures the environment can be source controlled,
is vendor agnostic, and predictable. Whilst in theory, the full suite of services can
be started locally by installing the relevant environment dependencies listed in the
[backend](./backend/README.md)
and [client](./client/README.md) services, nothing is guaranteed.

Steps are all relative to the root of the repository.

All helper scripts assume `bash` or
a `bash`-like substitute for the terminal shell.
On Windows, Git for Windows or WSL2 are recommended but the underlying commands are probably
compatible with PowerShell and or any other CLI.

- Install `docker` and `docker-compose`
  - Follow <https://docs.docker.com/get-docker/> for your OS/env of choice

- Symlink your `~/.aws/config` to `.aws.config` at the root of the repository so that
  the API has access to AWS

  ```sh
  ln -s ~/.aws/config .aws.config
  ```

  or on Windows or if this is problematic you can copy

  ```sh
  cp ~/.aws/config .aws.config
  ```

  > **NOTE** the naming of `.aws.config` is important and of course
  > **DO NO COMMIT TO THE REPOSITORY!**. It should be gitignored.
  >
  > Follow <https://aws.github.io/chalice/quickstart.html#credentials> and
  > <https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html>
  > for setting up your default profile.

- Build all base image dependencies

  ```sh
  ./docker/builds/build.sh
  ```

- Start all services (with `docker-compose` with:

  ```sh
  ./dev.sh
  ```

  **Note** any arguments to above are forwarded to `docker-compose`.
  For example, `./dev.sh -d` starts the services detached from the current terminal
  and `./dev.sh --build` re-builds the local development environment - the latter is important
  if changing development or environment dependencies. You can also selectively start
  services by specifying a space delimited list (see the compose file).

### Managing docker containers and images

Docker for Windows (or the upcoming beta Linux release) is a good graphical manager for Docker but
the license preclude commercial use under certain circumstances. There is an exclusion for small
businesses and might be fine for us now; but as an alternative, I recommend
[`lazydocker`](https://github.com/jesseduffield/lazydocker) - a no-nonsense (and faster) terminal
UI written in Go.

### Running package manger and other CLI commands

There are essentially three options here.

1. Shell into the container and run `yarn` / `pip` as required

   ```sh
   ./shell.sh client
   ```

   or

   ```sh
   ./shell.sh backend
   ```

2. Use VS Code to remote into the container and use its terminal

3. Pass the command options inline to the `shell.sh` helper.
   See the next few sub-sections. **This is not recommended** for
   repeated operations (e.g., repeated testing) due to the overhead of
   spinning up the container and downgraded performance. In these cases,
   prefer keeping a shell open as per 1 or 2.

#### Tests

```sh
./shell.sh backend pytest --mypy
```

and/or

```sh
./shell.sh client yarn test
```

#### Linting

```sh
./shell.sh backend black -l 120 .
```

and/or

```sh
./shell.sh client yarn lint
```

or

```sh
./shell.sh client yarn lint:fix
```

to fix trivial issues.

#### Storybook

```sh
./shell.sh -p 3001:3001 client yarn storybook
```

This is useful for developing and showcasing client components independently.
