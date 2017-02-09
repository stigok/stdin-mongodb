# stdin-mongodb

Log data to mongodb database

## Example usage

    git clone <this repo>
    npm install --global
    journalctl --output=json --follow --lines=0 | stdin-mongodb
