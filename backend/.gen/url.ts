import { responseFromJson } from "@chiselstrike/api";
import { UrlSlug } from "../models/UrlSlug";
const handlePost = async (req)=>{
    const payload = await req.json();
    const created = UrlSlug.build({
        ...payload,
        createdAt: new Date().toISOString()
    });
    await created.save();
    return responseFromJson("inserted " + created.id);
};
const handleGet = async (req)=>{
    const param = req.pathParams;
    if (param != "") {
        const url = await UrlSlug.findOne({
            slug: param
        });
        return Response.redirect(url.url);
    } else {
        const urls = await UrlSlug.findAll();
        return responseFromJson(urls);
    }
};
const handleDelete = async (req)=>{
    const payload = await req.json();
    await UrlSlug.delete({
        id: payload.id
    });
    return responseFromJson("deleted " + payload.id);
};
const handlers = {
    POST: handlePost,
    GET: handleGet,
    DELETE: handleDelete
};
export default async function chisel(req, res) {
    if (handlers[req.method] === undefined) return new Response(`Unsupported method ${req.method}`, {
        status: 405
    });
    return handlers[req.method](req, res);
};
