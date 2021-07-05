# antwon.dj/client

## Development setup

1. Confirm environment dependencies

    Please confirm the following minimum versions in your development environment:
    - `node`: "15.6.0"
    - `npm`: "7.4.0"

    Earlier minor verions _may_ work but are untested.

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
    npm install -g @aws-amplify/cli@5.1.0
    ```

5. Configure AWS Amplify locally (if not done already; otherwise confirm details)

    Roughly follow this offical guide https://docs.amplify.aws/cli/start/install#option-2-follow-the-instructions.

    Opt for the default username. Ensure the accessKeyId and secretAccessKey are setup for your local profile.

6. Install npm dependencies

   ```sh
   npm i
   ```

7. Start a local development server

    ```sh
    npm run dev
    ```

8. Code or have fun?

    The possibilities are _almost_ endless.
