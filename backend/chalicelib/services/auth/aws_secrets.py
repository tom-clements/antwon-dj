import json
from functools import partial, wraps

import boto3
from aws_secretsmanager_caching import SecretCache, SecretCacheConfig, InjectKeywordedSecretString


def get_secret_manager_client():
    return boto3.session.Session().client(service_name="secretsmanager", region_name="eu-west-2")


def get_secret_cache():
    client = get_secret_manager_client()
    return SecretCache(SecretCacheConfig(), client)


# creating new class to add the @wraps functionality to access wrapped function in testing.
class AWSSecretWrapper(InjectKeywordedSecretString):
    def __call__(self, func):
        """
        Return a function with injected keyword arguments from a cached secret.

        :type func: object
        :param func: function for injecting keyword arguments.
        :return The original function with injected keyword arguments
        """

        try:
            secret = json.loads(self.cache.get_secret_string(secret_id=self.secret_id))
        except json.decoder.JSONDecodeError:
            raise RuntimeError("Cached secret is not valid JSON") from None

        resolved_kwargs = dict()
        for orig_kwarg in self.kwarg_map:
            secret_key = self.kwarg_map[orig_kwarg]
            try:
                resolved_kwargs[orig_kwarg] = secret[secret_key]
            except KeyError:
                raise RuntimeError("Cached secret does not contain key {0}".format(secret_key)) from None

        @wraps(func)
        def _wrapped_func(*args, **kwargs):
            """
            Internal function to execute wrapped function
            """
            return func(*args, **resolved_kwargs, **kwargs)

        return _wrapped_func


AwsSecretRetrieval = partial(AWSSecretWrapper, cache=get_secret_cache())
