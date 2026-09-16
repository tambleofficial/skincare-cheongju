export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // 1) robots.txt는 네이버 검색로봇이 접근할 수 있도록 정상 응답
  if (pathname === "/robots.txt") {
    return new Response(
`User-agent: *
Allow: /`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=UTF-8",
          "Cache-Control": "no-cache"
        }
      }
    );
  }

  // 2) 네이버 사이트 소유확인 HTML 파일은 그대로 통과
  // 예: /naver1234567890abcdef.html
  // 실제 파일이 GitHub 저장소 루트에 존재해야 합니다.
  if (/^\/naver[a-zA-Z0-9_-]+\.html$/i.test(pathname)) {
    return context.next();
  }

  // 3) 나머지 모든 URL은 실제 HTTP 404 반환
  return new Response("404 Not Found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}
