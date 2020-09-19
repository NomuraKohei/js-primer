function main() {
    fetchUserInfo("js-primer-example")
        .then((userInfo) => createView(userInfo))
        .then((view) => displayView(view))
        .catch((error) => {
            console.error(`エラーが発生しました(${error})`);
        });
}

function fetchUserInfo(userId){
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if(!response.ok){
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                return response.json();
            }
        });
}

function createView(userInfo) {
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view) {
    const result = document.getElementById("result");
    result.innerHTML = view;
}

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
    console.log(strings);
    console.log(values);
    return strings.reduce((result, str, i) => {
        const value = values[i-1];
        if(typeof value === "string") {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    });
}