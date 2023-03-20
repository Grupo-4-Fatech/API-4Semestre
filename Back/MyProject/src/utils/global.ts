export function IsUndefined(isnull: any){
    if (isnull == null) {
        return true;
    }

    if (isnull === null) {
        return true;
    }

    if (typeof isnull === 'undefined') {
        return true;
    }
    return false;
}

export function GlobalCallQuery(id?: number, type?: string, title?: string, status?: string): string{
    var
    
    return '';
}