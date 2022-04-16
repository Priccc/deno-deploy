import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

const app = new Application();
const router = new Router();
const decoder = new TextDecoder("utf-8");
const body = decoder.decode(await Deno.readFile("./static/index.html"));

router
  .get("/", ({ response }) => {
    response.body = body;
  })
  .post("/chat/send", async ({ response, request }) => {
    const result = request.body({ type: "json" });
    const value = await result.value;
    const message = value.message.replace(/(吗|我|？|\?)/gi, (str: string) => {
      if (/(吗|么)/.test(str)) {
        return "";
      } else if (/(？|\?)/.test(str)) {
        return "！";
      } else if (str === "我") {
        return "你";
      }
    });
    const time = Date.now();
    const req = { message, time };

    response.body = JSON.stringify(req);
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });