// lib/pdfLoader.ts
// Chat/document loader removed — keep stub functions to avoid import errors.

export interface DocumentMetadata {
    filename: string;
    text: string;
    pages: number;
}

export async function loadAllDocuments(): Promise<DocumentMetadata[]> {
    return [];
}

export function retrieveRelevantContext(
    _query: string,
    _documents: DocumentMetadata[],
    _maxChunks: number = 3
): string {
    void _maxChunks;
    return "Document retrieval disabled.";
}

export async function getCachedDocuments(): Promise<DocumentMetadata[]> {
    return [];
}
