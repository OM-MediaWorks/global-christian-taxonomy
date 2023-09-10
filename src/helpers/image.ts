export const image = (image: string, width: number, height?: number) => {
    if (!height) height = width
    return `https://wsrv.nl/?url=${image}&w=${width}&h=${height}&fit=cover&a=attention`
}