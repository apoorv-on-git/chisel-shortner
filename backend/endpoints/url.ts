import { responseFromJson } from "@chiselstrike/api"
import { UrlSlug } from "../models/UrlSlug"

type Handler = (req: Request, res: Response) => Response | Promise<Response>

const handlePost: Handler = async req => {
  const payload = await req.json()
  const created = UrlSlug.build({
    ...payload,
    createdAt: new Date().toISOString(),
  })
  await created.save()
  return responseFromJson("inserted " + created.id)
}

const handleGet: Handler = async req => {
  const param = req.pathParams;
  if (param != "") {
    const url = await UrlSlug.findOne({slug: param})
    return Response.redirect(url.url)
  } else {
    const urls = await UrlSlug.findAll()
    return responseFromJson(urls)
  }
}

const handlers: Record<string, Handler> = {
  POST: handlePost,
  GET: handleGet,
}

export default async function chisel(req: Request, res: Response) {
  if (handlers[req.method] === undefined)
    return new Response(`Unsupported method ${req.method}`, { status: 405 })
  return handlers[req.method](req, res)
}