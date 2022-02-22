import json
from copy import deepcopy
from pprint import pprint
from typing import Dict, Any

import click


def open_config() -> Dict[str, Any]:
    with open(".chalice/config.json", "r") as f:
        return json.load(f)


def open_deployed() -> Dict[str, Any]:
    with open(".chalice/deployed/dev.json", "r") as f:
        return json.load(f)


def write_config(config: Dict[str, Any]):
    with open(".chalice/config.json", "w") as f:
        json.dump(config, f, indent=4)


def write_deployed(pr_stage, deployed: Dict[str, Any]) -> Dict[str, Any]:
    with open(f".chalice/deployed/{pr_stage}.json", "w") as f:
        json.dump(deployed, f, indent=4)


def add_pr_stage_to_config(config: Dict[str, Any], pr_stage: str):
    config["stages"][pr_stage] = deepcopy(config["stages"]["dev"])
    config["stages"][pr_stage]["api_gateway_stage"] = pr_stage
    return config


def add_pr_stage_to_deployed(deployed: Dict[str, Any], pr_stage: str):
    new_deployed = deepcopy(deployed)
    for resource in new_deployed["resources"]:
        for k, v in resource.items():
            resource[k] = v.replace("dev", pr_stage)
    return new_deployed


def configure_config(pr_stage):
    config = open_config()
    config = add_pr_stage_to_config(config, pr_stage)
    pprint(config)
    write_config(config)


def configure_deployed(pr_stage):
    deployed = open_deployed()
    deployed = add_pr_stage_to_deployed(deployed, pr_stage)
    pprint(deployed)
    write_deployed(pr_stage, deployed)


@click.command()
@click.option("--pr-stage", help="The name of the stage to create in the chalice deploy file")
def main(pr_stage):
    configure_config(pr_stage)
    configure_deployed(pr_stage)


if __name__ == "__main__":
    main()
