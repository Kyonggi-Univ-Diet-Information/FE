// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang='ko'>
        <head>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>기룡아 밥먹자는 잠시 쉬어가요!</title>
          <meta name='description' content='기룡아 밥먹자는 잠시 쉬어가요!' />
          <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
          <link rel='manifest' href='/config/manifest.json' />
          <meta property='og:title' content='기룡아 밥먹자는 잠시 쉬어가요!' />
          <meta
            property='og:description'
            content='기룡아 밥먹자는 잠시 쉬어가요!'
          />
          <meta property='og:image' content='/thumbnail/thumbnail.png' />
          <meta property='og:url' content='https://www.kiryong.kr/' />
          <meta property='og:type' content='website' />
          {assets}
        </head>
        <body class='antialiased'>
          <div id='app'>{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
