// Cloudflare Pages Function
// 路由：POST /api/verify
// 请求体：{ code: "ZCL-XXXXXXXX" }
// 返回：{ valid: true/false }

// 有效验证码列表（发码时手动往这里加）
// 格式：ZCL- + 8 位大写字母数字
const VALID_CODES = [
  "ZCL-A7K3M9Q2",
  "ZCL-B8L4N1R3",
  "ZCL-C9M5P2S4",
  // 在这里继续添加...
];

export async function onRequestPost(context) {
  const { request } = context;
  try {
    const body = await request.json();
    const code = (body.code || "").trim().toUpperCase();
    if (!code) {
      return new Response(JSON.stringify({ valid: false, reason: "empty" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const valid = VALID_CODES.includes(code);
    return new Response(JSON.stringify({ valid }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ valid: false, reason: "bad_request" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
}