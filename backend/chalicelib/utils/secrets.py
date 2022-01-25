from functools import partial

import boto3
from aws_secretsmanager_caching import SecretCache, SecretCacheConfig, InjectKeywordedSecretString


def get_secret_manager_client():
    return boto3.session.Session().client(service_name="secretsmanager", region_name="eu-west-2")


def get_secret_cache():
    client = get_secret_manager_client()
    return SecretCache(SecretCacheConfig(), client)


AwsSecretRetrieval = partial(InjectKeywordedSecretString, cache=get_secret_cache())
