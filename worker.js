import { HTML_TEMPLATE } from './html.js';
import { SW_CONTENT } from './sw-content.js';

const FS_INDEX_KEY = 'personal_lms_fs_index_v1';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const appPassword = env.APP_PASSWORD || 'changeme';

    if (url.pathname === '/auth' && request.method === 'POST') {
      try {
        const body = await request.json();
        if (body.password === appPassword) {
          const token = 'token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
          return new Response(JSON.stringify({ success: true, token }), {
            headers: { 'content-type': 'application/json;charset=UTF-8' }
          });
        }
        return new Response(JSON.stringify({ success: false, error: 'Invalid password' }), {
          status: 401,
          headers: { 'content-type': 'application/json;charset=UTF-8' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), {
          status: 400,
          headers: { 'content-type': 'application/json;charset=UTF-8' }
        });
      }
    }

    return new Response(HTML_TEMPLATE, {
      headers: { 'content-type': 'text/html;charset=UTF-8' }
    });
  }
};
