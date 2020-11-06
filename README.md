# Songs By Artist

A small webapp that displays all songs for a given artist.

![Songs By Artist](https://raw.githubusercontent.com/nafeu/songs-by-artist/main/preview.gif)

Live preview is available [here](http://songs-by-artist.herokuapp.com).

## Requirements

*Technical Requirements*
- `Node.js >= v14`

*Operational*
- Genius API Access Token (Requires registered application with Genius API)

## Development

### API Access
- Go [here](https://genius.com/api-clients) to register an application with Genius API.
- Upon registering your client, click `Generate Access Token` to generate a new `CLIENT ACCESS TOKEN`, save this value somewhere private for later.

### Installation

```
git clone https://github.com/nafeu/songs-by-artist.git
cd songs-by-artist
npm install
cd client
npm install
cd ..
cp .example-env .env
```

Open the `.env` file in your text editor of choice and fill in the `GENIUS_CLIENT_ACCESS_TOKEN` value with the token generated from their website.

### Server

```
npm run dev
```

### Client

Create a new terminal tab/session and do the following:

```
cd client
npm start
```

View development app at `http://localhost:3000`

### Testing

```
npm run test
```

## Deployment

_* This application is configured to run on heroku_

```
heroku config:set GENIUS_CLIENT_ACCESS_TOKEN=[enter your access token]
git push heroku main
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
