# antwon.dj/backend

The backend is built with the Chalice Python framework. Documentation can be found [here](https://aws.github.io/chalice/main.html).
Chalice is a wrapper around the Flask Python web framework and deploys and configures the python application onto AWS Services:

- AWS Lambdas
  - Serverless functions, info here:<https://aws.amazon.com/lambda/>

- AWS API Gateway
  - An API service handling traffic management and routing requests to AWS Lambdas, info here: <https://aws.amazon.com/api-gateway/>

- AWS CloudWatch
  - Logs from all AWS services, info here <https://aws.amazon.com/cloudwatch/>

- AWS X-Ray
  - Metrics on API endpoints and latency, info here <https://aws.amazon.com/xray/>

For the database:

- AWS RDS
  - Info here: <https://aws.amazon.com/rds/>
  - MySQL server hosted on RDS has been chosen due to the free tier offered by AWS.
  - For the python connection, [SQLAlchemy](https://www.sqlalchemy.org/) has been chosen as it offers a convenient API to access SQL databases.

Secrets:

- AWS Secret Manager
  - Secret store, info here: <https://aws.amazon.com/secrets-manager/>

## Development

### Quick reference

- Development server
  - `chalice local --stage local`
    - <http://localhost:8000/>
- Linting
  - `flake8 --max-line-length 120`
  - `mypy app.py`
  - `black -l 120 .`
- Testing
  - `pytest --mypy tests/`
- Upgrading
  - `pip install -U -r requirements.txt`
  - `pip check`: checks for conflicts
  - `pip freeze > requirements.txt`

### Initial setup

1. Clone this repository

    ```sh
    git clone git@github.com:tom-clements/antwon-dj.git
    ```

2. Change into the backend directory

    ```sh
    cd antwon-dj/backend
    ```

3. Create python environment

    Python version has to be supported by AWS lambdas: <https://docs.aws.amazon.com/lambda/latest/dg/lambda-python.html>.  

    Latest supported version as of 2022-02-18: `Python 3.9`

    Please use a python environment manager of choice, shown here is anaconda.  
    Installing anaconda from <https://www.anaconda.com/products/individual> will enable conda CLI.  

    ```sh
    conda create -n <venv_name> python=3.9
    conda activate <venv_name>
    conda install pip
    ```

4. Install python dependencies

    ```sh
    pip install black flake8 pytest pytest-mypy
    pip install -r requirements.txt
    ```

5. Configure AWS credentials

    Follow this official guide https://aws.github.io/chalice/quickstart.html.  
    Refer to the **Credentials** section.

    Ensure the access and secret keys are setup for your local profile.


6. Start a local development server

    ```sh
    chalice local --stage local
    ```

    The server should be accessible from <http://localhost:8000/> by default.

7. Code or have fun?

    The possibilities are _almost_ endless.

### Module overview

#### chalicelib/

This folder has a **protected name**, which is picked up by chalice and deployed onto AWS lambda.  
Inside here should contain all application code.

#### tests/

Containing all unit and integration tests for the application. Please run using:

```sh
pytest --mypy tests/
```

### .chalice/config.json

The configuration file for the chalice deployment.

### Secrets

Stored on AWS Secrets Manager

- **spotify_client**: Credentials to access spotify application
- **antwon-rds-credentials**: Credentials to access MySQL RDS database
- **antwon-backend**: Secret key to encode JWTs from backend

## Production

### Production endpoint

Endpoint is configured to: `https://api.djantwon.com/dev/`

### Logs

All logs from AWS services are available on <https://aws.amazon.com/cloudwatch/>.  
Navigate to `Log groups > /aws/lambda/backend<stage> > <latest log stream>`.
Each new deployment of a lambda will generate a new log stream.  

### Metrics

Metrics around latency of endpoints and requests are displayed on AWS X-Ray: <https://aws.amazon.com/xray/>.
