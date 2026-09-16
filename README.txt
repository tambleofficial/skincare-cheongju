네이버 전체 색인 제거용 - Cloudflare Pages + GitHub

[구성]
functions/_middleware.js
robots.txt

[동작]
1. /robots.txt
   - HTTP 200
   - 모든 검색로봇 접근 허용

2. /naverXXXXXXXX.html 형태의 네이버 소유확인 파일
   - 기존 정적 파일을 그대로 제공
   - GitHub 저장소 루트에 실제 네이버 인증 파일을 그대로 남겨두세요.

3. 그 외 모든 URL
   - HTTP 404 Not Found
   - X-Robots-Tag: noindex, nofollow
   - Cache-Control: no-store

[적용 방법]
1. ZIP 압축을 풉니다.
2. functions 폴더와 robots.txt를 GitHub 프로젝트 루트에 넣습니다.
3. 기존 네이버 소유확인 파일(naverXXXXXXXX.html)이 있다면 삭제하지 마세요.
4. GitHub에 commit / push 합니다.
5. Cloudflare Pages 자동 배포가 완료되면 아래처럼 확인합니다.

Windows CMD / PowerShell:
curl -I https://내도메인.com/
curl -I https://내도메인.com/기존페이지/
curl -I https://내도메인.com/robots.txt

정상 결과:
- 메인/기존 페이지: HTTP 404
- robots.txt: HTTP 200
- 네이버 소유확인 파일: HTTP 200 (실제 파일이 존재하는 경우)

[중요]
- robots.txt에서 Yeti 또는 전체 검색로봇을 Disallow 하지 마세요.
- Cloudflare Pages 프로젝트/DNS를 먼저 삭제하지 마세요.
- 네이버 검색로봇이 기존 URL에 재방문해서 404를 확인할 수 있어야 합니다.
- 네이버 서치어드바이저의 '검색 제외' 요청도 함께 사용하면 좋습니다.
