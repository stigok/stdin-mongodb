# stdin-mongodb

Pipe data to a mongoose document. Using a
[very simple document model](log-item.model.js)

## Usage

    stdin-mongodb <tag> <connection_string>

- `tag` is a string
- `connection_string` is a mongodb connection string in format
  `mongodb://[user:pass@]<host>[:<port>]`

### Examples

Add simple strings.

    $ echo "I am adding a string" | stdin-mongodb foo-test 'mongodb://localhost'
    $ echo -e "This is split to\ntwo different documents" | stdin-mongodb foo-test 'mongodb://localhost'

Pipe JSON from `journalctl`

    $ journalctl --output=json --follow --lines=0 | stdin-mongodb journal 'mongodb://localhost'

## Notes

Today is a good day to enable authentication on your mongodb instance.
