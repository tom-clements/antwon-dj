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
        - http://localhost:3000/
- Storybook
    - `yarn storybook`
        - http://localhost:6006/
    - `yarn storybook:build`
- Linting
  - `yarn lint`
  - `yarn lint:fix`
- Testing
  - TBC
- Upgrading
  - `yarn upgrade-interactive`

### Initial setup

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

    Roughly follow this official guide https://docs.amplify.aws/cli/start/install#option-2-follow-the-instructions.

    Opt for the default username. Ensure the accessKeyId and secretAccessKey are setup for
    your local profile.

6. Install npm dependencies

    ```sh
    yarn install
    ```

7. Setup local environment variables

    At the root of the client, add a file called `.env.local` and paste the following snippet.

    ```sh
    API_BASE_URL
    ```

    For each variable with a missing value, find the appropriate from Taylor and paste.
    These will be stored in a secret manager in the near future to aid setup.

8. Start a local development server

    ```sh
    yarn dev
    ```

    The server should be accessible from http://localhost:3000/ by default.

9. Code or have fun?

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

```
yarn upgrade-interactive
```
