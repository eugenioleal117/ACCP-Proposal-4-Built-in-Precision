"""Local static preview with byte ranges for Safari video seeking."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os,re,sys

class PreviewHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        self.byte_range = None
        path = self.translate_path(self.path)
        range_header = self.headers.get('Range')
        if not range_header or not os.path.isfile(path):
            return super().send_head()
        file = open(path, 'rb')
        size = os.fstat(file.fileno()).st_size
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', range_header)
        if not match or size == 0:
            file.close()
            self.send_error(416, 'Range not satisfiable')
            return None
        left,right = match.groups()
        if left:
            start = int(left)
            end = min(int(right),size-1) if right else size-1
        elif right:
            start,end = max(0,size-int(right)),size-1
        else:
            start,end = 0,size-1
        if start > end or start >= size:
            file.close()
            self.send_response(416)
            self.send_header('Content-Range',f'bytes */{size}')
            self.send_header('Content-Length','0')
            self.end_headers()
            return None
        self.send_response(206)
        self.send_header('Content-Type',self.guess_type(path))
        self.send_header('Content-Length',str(end-start+1))
        self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
        self.send_header('Accept-Ranges','bytes')
        self.end_headers()
        file.seek(start)
        self.byte_range=(start,end)
        return file

    def copyfile(self,source,outputfile):
        if not self.byte_range:
            return super().copyfile(source,outputfile)
        remaining=self.byte_range[1]-self.byte_range[0]+1
        while remaining:
            block=source.read(min(65536,remaining))
            if not block:break
            outputfile.write(block)
            remaining-=len(block)

if __name__=='__main__':
    os.chdir(Path(__file__).resolve().parents[1])
    port=int(sys.argv[1]) if len(sys.argv)>1 else 8784
    print(f'Preview: http://127.0.0.1:{port}/',flush=True)
    ThreadingHTTPServer(('127.0.0.1',port),PreviewHandler).serve_forever()
