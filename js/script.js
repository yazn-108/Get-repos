"use strict";
let
input = document.querySelector(".search input"),
button = document.querySelector(".search button"),
reposData = document.querySelector(".repos-data");
input.focus();
async function getRepos(){
    let api = await fetch(`https://api.github.com/users/${input.value}/repos`);
    let apiData = await api.json();
    if (input.value !== "" && apiData.message !== 'Not Found') {
        apiData.sort((a,b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        reposData.innerHTML = `<p>repos count <span>${apiData.length}</span></p>`;
        apiData.forEach(repo => {
            let repoBox = document.createElement("div");
            repoBox.className = "repo-box";
            let repoName = document.createElement("span");
            repoName.textContent = repo.name;
            repoBox.appendChild(repoName);
            let repoStars = document.createElement("p");
            repoStars.textContent = `stars ${repo.stargazers_count}`;
            repoBox.appendChild(repoStars);
            let repoViews = document.createElement("p");
            repoViews.textContent = `views ${repo.watchers_count}`;
            repoBox.appendChild(repoViews);
            let repoLink = document.createElement("a");
            repoLink.href = repo.html_url;
            repoLink.setAttribute("target", "_blank");
            let browseButton = document.createElement("button");
            browseButton.textContent = "browse";
            repoLink.appendChild(browseButton);
            repoBox.appendChild(repoLink);
            reposData.appendChild(repoBox);
        });
    }else{
        reposData.innerHTML = "<span>please write github user name</span>";
    };
};
button.addEventListener("click", (e) => {
    e.preventDefault();
    getRepos();
});