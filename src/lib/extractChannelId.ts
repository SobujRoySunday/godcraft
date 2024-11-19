async function extractChannelId(url: string): Promise<string> {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const username = pathParts.includes("user") ? pathParts[pathParts.indexOf("user") + 1] : pathParts[1].substring(1);
    return username;
}

export default extractChannelId