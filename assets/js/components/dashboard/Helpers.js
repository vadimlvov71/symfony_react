/**
 * @param {string} url
 */
export function GetUri(url) {
    console.log(url);
    //const url = window.location.href;
    const arr = url.split("?");
    console.log(arr);
    console.log('arr');
    console.log(arr);
    const tempUrl = arr[1];
    const newUrl = tempUrl.split("=");
    let pageUrl = {'url':newUrl[0], 'name':newUrl[1]};

    console.log('pageUrl');
    console.log(pageUrl);
    
    return pageUrl;
}