import { next } from '@vercel/functions';

/**
 * To configure these environment variables in Vercel:
 * 1. Go to your project dashboard on Vercel.
 * 2. Navigate to Settings > Environment Variables.
 * 3. Add SITE_AUTH_USER with the desired username value.
 * 4. Add SITE_AUTH_PASS with the desired password value.
 * 5. Click Save, and redeploy your project for the changes to take effect.
 */

export default function middleware(request: Request) {
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

  // Deny access and trigger browser login prompt
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"',
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
