const searchForm = document.querySelector("#search-form");
const usernameInput = document.querySelector("#username-input");
const loadingIndicator = document.querySelector("#loading");
const errorMsg = document.querySelector("#error-msg");
const profileContainer = document.querySelector("#profile-container");

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    
    if (!username) {
        alert("Silakan masukkan username GitHub terlebih dahulu!");
        return;
    }

    profileContainer.innerHTML = "";
    errorMsg.classList.add("hidden");
    loadingIndicator.classList.remove("hidden");

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("User GitHub tidak ditemukan! Periksa kembali username yang dimasukkan.");
            } else {
                throw new Error(`Terjadi kesalahan server! Status: ${response.status}`);
            }
        }

        const user = await response.json();

        const card = document.createElement("div");
        card.className = "profile-card";
        
        card.innerHTML = `
            <img src="${user.avatar_url}" alt="Avatar ${user.login}">
            <h3>${user.name ? user.name : user.login}</h3>
            <p>${user.bio ? user.bio : "Tidak ada bio yang tersedia."}</p>
            <div class="profile-stats">
                <span>📦 Repo Publik: ${user.public_repos}</span>
                <span>👥 Followers: ${user.followers}</span>
            </div>
            <a href="${user.html_url}" target="_blank">Kunjungi Profil GitHub</a>
        `;

        profileContainer.appendChild(card);

    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.classList.remove("hidden");
    } finally {
        loadingIndicator.classList.add("hidden");
    }
});