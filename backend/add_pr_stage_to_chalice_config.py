import json
from copy import deepcopy
from pprint import pprint
from typing import Dict, Any

import click


def open_config() -> Dict[str, Any]:
    with open(".chalice/config.json", "r") as f:
        return json.load(f)


def write_config(config: Dict[str, Any]) -> None:
    with open(".chalice/config.json", "w") as f:
        json.dump(config, f, indent=4)


def add_pr_stage_to_config(config: Dict[str, Any], pr_stage: str) -> Dict[str, Any]:
    config["stages"][pr_stage] = deepcopy(config["stages"]["dev"])
    config["stages"][pr_stage]["api_gateway_stage"] = pr_stage
    config["stages"][pr_stage]["api_gateway_custom_domain"]["url_prefix"] = pr_stage
    return config


def add_pr_stage_to_deployed(deployed: Dict[str, Any], pr_stage: str) -> Dict[str, Any]:
    new_deployed = deepcopy(deployed)
    for resource in new_deployed["resources"]:
        for k, v in resource.items():
            resource[k] = v.replace("dev", pr_stage)
    return new_deployed


def configure_config(pr_stage: str) -> None:
    config = open_config()
    config = add_pr_stage_to_config(config, pr_stage)
    pprint(config)
    write_config(config)


@click.command()
@click.option("--pr-stage", help="The name of the stage to create in the chalice deploy file")
def main(pr_stage: str) -> None:
    configure_config(pr_stage)


if __name__ == "__main__":
    main()
