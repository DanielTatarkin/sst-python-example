## Overview

Example of setting up [SST](https://sst.dev/) with both:

- Standard virtualenv-based Python Lambda function (with psycopg2 as a dependency)
- Poetry-based Python Lambda function (with psycopg2 as a dependency)

## Instructions

**NOTE:** The sample Python lambda code runs a `SELECT` statements using `POSTGRESQL_URL` environment variables using a
Postgres connection string `postgres://USERNAME:PASSWORD@HOSTNAME/DB_NAME`. Please feel free to modify the code to your
own needs

1. Clone this repo and create an `.env` file with the following:
    1. `POSTGRESQL_URL=postgres://USERNAME:PASSWORD@HOSTNAME/DB_NAME`
2. Run `pnpm install`
3. Test Virtualenv-based Lambda function (`basic-python`) locally:
    1. `cd packages/basic-python`
    2. `python -m venv .venv`
    3. `source ./.venv/bin/activate` (MacOS specific)
    4. `pip install -r requirements.txt`
    5. While `basic-python` virtual-env is active, you can debug the function using `pnpm sst dev`
        1. Debugging `poetry-python` function will ALSO work due to matching dependencies
4. Test Poetry-based Lambda function (`poetry-python`) locally:
    1. `cd packages/poetry-python`
    2. `poetry config virtualenvs.in-project true` so that the `.venv` folder will live in the same directory
    3. `poetry install`
    4. `source ./.venv/bin/activate` (MacOS specific)
    5. While `poetry-python` virtual-env is active, you can debug the function using `pnpm sst dev`
        1. Debugging `basic-python` function will ALSO work due to matching dependencies

**NOTE:** Running the above steps create local `.venv` directories with installed dependencies. These get included at
deploy time (`pnpm sst deploy --stage=prod`) increasing the total package size. If package
size is a concern, either:

1) create `.venv` somewhere else OR
2) delete them before deploying.

## Other useful notes

- If your Python Lambda function is NOT using any dependencies, either an empty `requirements.txt`
  or `pyproject.toml` file is still **REQUIRED**