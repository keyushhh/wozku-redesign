import { next } from '@vercel/functions';

/**
 * Constant-time string comparison to prevent timing attacks.
 */
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export default function middleware(request: Request) {
  // TODO: STAGING-ONLY BYPASS — remove PSI_BYPASS_TOKEN logic and env var before/at production launch
  // 1. Check for secure PSI bypass token in the URL query parameters
  const url = new URL(request.url);
  const psiToken = url.searchParams.get('psi_token');
  const expectedPsiToken = process.env.PSI_BYPASS_TOKEN;

  if (psiToken && expectedPsiToken && safeCompare(psiToken, expectedPsiToken)) {
    return next();
  }

  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    try {
      const authValue = basicAuth.split(' ')[1];
      const [user, password] = atob(authValue).split(':');

      const expectedUser = process.env.SITE_AUTH_USER;
      const expectedPass = process.env.SITE_AUTH_PASS;

      if (user === expectedUser && password === expectedPass) {
        // Allow request to proceed to the actual origin/site
        return next();
      }
    } catch (e) {
      // If decoding fails (malformed base64), fall through to return 401
    }
  }

  // 2. Unconditionally return a proper HTML 401 page
  const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Unauthorized</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
        background-color: #f9fafb;
        color: #111827;
      }
      .card {
        text-align: center;
        padding: 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        max-width: 400px;
        width: 100%;
      }
      h1 { font-size: 1.5rem; margin-bottom: 1rem; }
      p { color: #6b7280; font-size: 0.875rem; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>401 Unauthorized</h1>
      <p>Please provide valid credentials to access this area.</p>
    </div>
  </body>
</html>`;

  return new Response(html, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"',
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/health (health check API endpoint)
     * - favicon.ico (favicon file)
     * - assets (static assets folder)
     * - static files with extensions (e.g. logo.png, styles.css)
     */
    '/((?!api/health|favicon.ico|assets/|.*\\..*$).*)',
  ],
};
