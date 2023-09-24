export function classNames(...classes: unknown[]): string {
	return classes.filter(Boolean).join(' ')
}

export const getUrlQueryFromObj = (obj: any) => {

	let query = '';
	
	for(const key in obj){
		if(obj[key]){
			if(query != '') query += '&';
			query += `${key}=${obj[key]}`;
		}
	}
	
	return (query.length) ? '?'+query : '';
}