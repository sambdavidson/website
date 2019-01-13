let faceBucketBaseURL = 'https://storage.googleapis.com/paper-portraits-faces/';
let faceNames: Array<string> = undefined;
let appendedIndex = 0;
let contentDiv: HTMLElement = undefined;
let facesWrapper: HTMLElement = undefined;

function LoadFaceData() {
    const xhr = new XMLHttpRequest();
    xhr.onload = ProcessFaceData;
    xhr.onerror = function() {
        console.error("Error while getting XML for face data.");
    };
    xhr.open("GET", '/face_data.xml');
    xhr.responseType = "document";
    xhr.send();
}

function ProcessFaceData(this: XMLHttpRequest, ev: Event): any {
    if (this.status > 299) {
        console.error(`Error loading face data: ${this.status}`, this);
        return
    }
    const children = Array.from(this.responseXML.children[0].getElementsByTagName('Contents')).reverse();
    faceNames = children.map((child) => {
        return child.getElementsByTagName('Key')[0].innerHTML;
    });
    window.requestAnimationFrame(AddFaceToWindowIfPossible);
}

function AddFaceToWindowIfPossible():void {
    if(faceNames !== undefined && facesWrapper !== undefined && appendedIndex < faceNames.length) {
        const availableScroll = facesWrapper.scrollHeight - facesWrapper.clientHeight - facesWrapper.scrollTop;
        if (availableScroll < 300) {
            const face = faceNames[appendedIndex];
            facesWrapper.appendChild(AnchorImageFromURL(face, faceBucketBaseURL + face));
            appendedIndex++;
        }
        window.requestAnimationFrame(AddFaceToWindowIfPossible);
    }
}


function CleanPageContent(): void {
    if (contentDiv === undefined) {
        return;
    }
    while(contentDiv.firstElementChild) {
        contentDiv.removeChild(contentDiv.firstElementChild)
    }
    document.title = 'The Faces';
    const header = document.createElement('h1');
    header.innerText = 'Paper Portraits\' Faces';
    contentDiv.appendChild(header);
    const subheader = document.createElement('h2');
    subheader.innerHTML = `
<a href="/"
   title="Samuel Davidson's main website">Home</a> - 
<a href="https://github.com/samdamana/paper-portraits" 
   title="GitHub page for Paper Portraits"
   target="_blank">GitHub</a> - 
<a href="https://console.cloud.google.com/storage/browser/paper-portraits-faces"
   title="Google Cloud Storage bucket holding all these face images"
   target="_blank">GCS Bucket</a>`;
    contentDiv.appendChild(subheader);

    facesWrapper = document.createElement('div');
    facesWrapper.className = 'faces-wrapper';
    contentDiv.appendChild(facesWrapper);
}

function AnchorImageFromURL(name:string, url:string): HTMLAnchorElement {
    let img = document.createElement('img');
    img.className = 'face';
    img.src = url;
    // TODO: Consider adding click linking.
    let a = document.createElement('a');
    a.title = name;
    a.target = '__blank';
    a.href = url;
    a.appendChild(img);
    return a;
}

export function InitializeFaces() {
    contentDiv = document.getElementById('ContentContainer');

    if (document.location.pathname === '/faces') {
        CleanPageContent();
        LoadFaceData();
    }
}