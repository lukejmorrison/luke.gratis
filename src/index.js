export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.luke.gratis") {
      url.hostname = "luke.gratis";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
