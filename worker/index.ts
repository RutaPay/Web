interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
  API_ORIGIN: string
}

const API_PREFIX = '/api/'

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // Cualquier ruta que no sea de la API se sirve como asset estático.
    if (url.pathname !== '/api' && !url.pathname.startsWith(API_PREFIX)) {
      return env.ASSETS.fetch(request)
    }

    // Reescribe el destino hacia el backend conservando método, cabeceras y cuerpo.
    const target = new URL(request.url)
    const origin = new URL(env.API_ORIGIN)
    target.protocol = origin.protocol
    target.hostname = origin.hostname
    target.port = origin.port

    let response: Response
    try {
      response = await fetch(new Request(target, request))
    } catch (error) {
      console.error('Error al proxear la petición a la API', error)
      return Response.json(
        { message: 'No se pudo contactar el servidor de la API.' },
        { status: 502 },
      )
    }

    // Propaga Set-Cookie tal cual y evita que la API se cachee en el edge.
    const headers = new Headers(response.headers)
    headers.set('Cache-Control', 'no-store')

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
}
