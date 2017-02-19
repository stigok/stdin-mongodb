# stdin-mongodb

Log data to mongodb database

## Example usage

    $ git clone <this repo>
    $ npm install --global
    $ journalctl --output=json --follow --lines=0 | stdin-mongodb journal 'mongodb://localhost'

`processName` can be seen as a kind of *tag* for the entry, e.g. what process
is the entry coming from?

`mongodb-connection-string` expects format 'mongodb://[user:pass@]<host>[:<port>]'

## Notes

Today is a good day to enable authentication on your mongodb instance.
