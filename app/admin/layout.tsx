export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin — My Stay in Madinah</title>
      </head>
      <body style={{ margin: 0, padding: 0, background: '#F9F8F4', fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
