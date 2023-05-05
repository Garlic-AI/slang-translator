import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import { ipAddress } from '@vercel/edge';


export const config = {
  runtime: "edge",
};


if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

if (!process.env.UPSTASH_URL) {
  throw new Error("Missing env var from Upstash");
}

if (!process.env.UPSTASH_TOKEN) {
  throw new Error("Missing env var from Upstash");
}

const redis = new Redis({
  url: process.env.UPSTASH_URL,
  token: process.env.UPSTASH_TOKEN,
});







// Create a new ratelimiter, that allows 20 requests per day, which has this many seconds: 86400
const ratelimit = redis
    ? new Ratelimit({
        redis: redis,
        limiter: Ratelimit.fixedWindow(17, "1 d"),
        analytics: true,
    })
    : undefined;


const handler = async (req: Request): Promise<Response> => {

  if (ratelimit) {
    // console.log(req);
    // const identifier = requestIp.getClientIp(req);
    const identifier = ipAddress(req) || 'unknown';
    
    console.log('identifier:', identifier)
    if (identifier) {
        const result = await ratelimit.limit(identifier!);
        console.log('result:', result)

        if (!result.success) {
            return new Response("🙏🙏 Too many requests, you get 17 per day");
        }
    }
}



  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
