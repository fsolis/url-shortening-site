import { http } from "./http";

const apiUrl = 'https://rel.ink/api/links/';

type RelinkResponse = {
    readonly hashid: string
    readonly url: string
    readonly created_at: string
}

export async function getShortUrl(url: string): Promise<string> {
    const body = { url };
    try {
        const { hashid } = await http<RelinkResponse>(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        return `https://rel.ink/${hashid}`;
    } catch (e) {
        console.error(e);
        throw (e);
    }
}
