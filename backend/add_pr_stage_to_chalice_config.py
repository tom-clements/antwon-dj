import json
from copy import deepcopy
from pprint import pprint
from typing import Dict, Any

import click


def open_config() -> Dict[str, Any]:
    with open(".chalice/config.json", "r") as f:
        return json.load(f)


def write_config(config: Dict[str, Any]):
    with open(".chalice/config.json", "w") as f:
        json.dump(config, f, indent=4)


def add_pr_stage_to_config(config: Dict[str, Any], pr_stage: str):
    config["stages"][pr_stage] = deepcopy(config["stages"]["dev"])
    config["stages"][pr_stage]["api_gateway_stage"] = pr_stage
    config["stages"][pr_stage]["api_gateway_custom_domain"]["url_prefix"] = pr_stage
    return config


def configure_config(pr_stage):
    config = open_config()
    config = add_pr_stage_to_config(config, pr_stage)
    pprint(config)
    write_config(config)


@click.command()
@click.option("--pr-stage", help="The name of the stage to create in the chalice deploy file")
def main(pr_stage):
    configure_config(pr_stage)


if __name__ == "__main__":
    main()
