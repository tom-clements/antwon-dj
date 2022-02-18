from chalicelib.utils.chalice import get_base_url


def test_get_base_url():
    expected = "https://3mnr9rzo8e.execute-api.eu-west-2.amazonaws.com/dev"
    actual = get_base_url()
    assert actual == expected
