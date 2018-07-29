import * as express from 'express';

const app: express.App = express();

app.use(express.static('dist'));

// tslint:disable-next-line:no-multiline-string
const html: string = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">

  <script defer src="/bundle.js"></script>
  <title>WEBNES</title>
</head>
<body>
  <section class="application"></section>
</body>
</html>
`;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send(html);
});

app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log(`Start app at ${new Date().toString()}. http://localhost:3000`);
});
