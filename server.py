from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    port = 8080
    server = HTTPServer(('localhost', port), NoCacheHandler)
    print(f'Serving at http://localhost:{port} with caching disabled')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down...')
        server.shutdown() 