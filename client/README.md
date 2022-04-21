# antwon.dj/client

The client is built with the Next.js React web framework. This provides us with neat
cutting edge features out-of-the box such as hybrid static & server rendering, TypeScript
support, smart bundling, route pre-fetching, and more.

For UI and styling, we use the @mui and @emotion libraries, primarily leveraging the styled
component API.
In development, this components within this framework can be previewed and iterated upon
with Storybook.

State management and data access is built with Redux Toolkit and RTK Query.

## Development

### Quick reference

- Development server
  - `yarn dev`
    - <http://localhost:3000/>
- Storybook
  - `yarn storybook`
    - <http://localhost:6006/>
  - `yarn storybook:build`
- Linting
  - `yarn lint`
  - `yarn lint:fix`
- Testing
  - `yarn test`
- Upgrading
  - `yarn upgrade-interactive`

### Initial setup

#### Docker

#### Local

> Note: NO LONGER RECOMMENDED

This will roughly follow a combination of the [antwon/dj-node-env](../docker/builds/node-env/Dockerfile)
and [dev.Dockerfile](./dev.Dockerfile) image builds.
The notes here are left and updated here for documentation purposes.

> The Amplify CLI _might_ not be required anymore.

1. Confirm environment dependencies

    Please confirm the following minimum versions in your development environment:
    - `node`: 15.6.0
    - `yarn`: 1.x.x and upwards

    Earlier minor verions _may_ work but are untested.

    Yarn v3 is now configured as the default package manager on a project basis.
    However it is currently still recommended to have a v1 global install so that
    we can correctly defer to the more deterministic manager across environments.

    ```shell
    npm install -g yarn
    ```

2. Clone this repository

    ```sh
    git clone git@github.com:tom-clements/antwon-dj.git
    ```

3. Change into the client directory

    ```sh
    cd antwon-dj/client
    ```

4. Install AWS Amplify CLI globally (if not done already; otherwise confirm version)

    You might _(should)_ be thinking, why globally? Well, despite falling out of one of the
    most powerful entities on the planet, the CLI interface does not support local
    installation - see
    [aws-amplify/amplify-cli/issues/4043](https://github.com/aws-amplify/amplify-cli/issues/4043)
    which is open as of 05/07/2021. Alas, as versioning within the repository is not possible,
    ensure the same version is installed. At the time of writing this was 5.1.0.

    ```sh
    yarn global add @aws-amplify/cli@5.1.0
    ```

5. Configure AWS Amplify locally (if not done already; otherwise confirm details)

    Roughly follow this official guide <https://docs.amplify.aws/cli/start/install#option-2-follow-the-instructions>.

    Opt for the default username. Ensure the accessKeyId and secretAccessKey are setup for
    your local profile.

6. Install npm dependencies

    ```sh
    yarn install
    ```

7. Start a local development server

    ```sh
    yarn dev
    ```

    The server should be accessible from <http://localhost:3000/> by default.

8. Code or have fun?

    The possibilities are _almost_ endless.

### Upgrading dependencies

There's no hard and fast rules when it comes to updating packages. While minor versions bumps can
sometimes be blanket performed without issue, this is not always the case. Where multiple packages
have major changes, a good rule of thumb is to consider upgrades piece-wise by package and by
comparing upgrade and compatibility notes.
Sometimes an upgrade is simply not possible and the reasons why should be documented as such,
including any potential future resolution.

`yarn berry`, our package manager for the client, has a useful plugin pre-installed in the repo
for performing this task from the command-line:

```sh
yarn upgrade-interactive
```

### Pending project architecture

I'll preface this with yes, I've been flip-flopping over architectural and code organization lately.

I think I've settled on functional organization - a concept stemming from domain driven development.

What won it? This analogy.

Code is often segregated by their category - e.g., folder for components, pages, controllers,
services, etc.

Liken this to forks, knifes, and spoons.
If we applied this common categorical sorting, we would be storing our cutlery in separate drawers
by category: one for knifes, one for forks, and one for spoons.

What's their purpose or functional domain?
Cutlery for eating right? So the common operation here would be opening
3 separate drawers to fulfil the task of eating. That's a lot of effort.

The same _applies_ to controllers, components, services, etc. Why sort by category? If we are working on
functionality pertaining to a user, we'd be darting around _multiple_ different directories as we'd likely
be working on user code across multiple categories.

The tl;dr is, I will eventually move everything over to functional organization. _THIS DOES_ not mean
cross-cutting categories of concern or multiple responsibilities - you know the usual SOLID speal.
State should be de-coupled from components for example. Categorization per aggregate or functional
area is permitted and encouraged unless the aggregate is _simple_.

E.g., going forward, this will be the target structure over time - relative to `src/`

- common
  - components
  - hooks
  - model
  - styles
  - services
  - ...
- room
  - components
  - model
  - styles
  - services
- user
  - ...

There are two exceptions. The first will be `pages/`, as this is a `Next.js` concept and has a specific set of
hardcoded possible locations - I guess we'll just say, it is an `aggregate` or functional area.
The second will be `tests/` to ease environment configuration.
