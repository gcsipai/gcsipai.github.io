document.addEventListener('DOMContentLoaded', () => {
    const username = 'gcsipai'; 
    const repoListElement = document.getElementById('repo-list');
    const loadingMessage = document.getElementById('loading-message');
    const apiURL = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=9`; // Csak a legfrissebb 9

    // Színleképezés a Tailwind osztályokkal
    const languageColorMap = {
        'JavaScript': 'bg-yellow-600',
        'Python': 'bg-blue-600',
        'HTML': 'bg-red-600',
        'CSS': 'bg-indigo-600',
        'TypeScript': 'bg-sky-600',
        'C#': 'bg-purple-600',
        'Java': 'bg-orange-600',
        'default': 'bg-gray-600'
    };

    function createRepoCard(repo) {
        const repoCard = document.createElement('div');
        // Tailwind osztályok a letisztult, emelkedő kártya effektushoz
        repoCard.className = 'bg-gray-800 rounded-xl shadow-2xl p-6 transition duration-300 ease-in-out hover:shadow-accent-color/50 hover:-translate-y-1 flex flex-col justify-between border-t-4 border-accent-color';

        const description = repo.description || 'Nincs részletes leírás ehhez a repository-hoz.';
        const lastUpdated = new Date(repo.updated_at).toLocaleDateString('hu-HU', { year: 'numeric', month: 'short', day: 'numeric' });
        const language = repo.language || 'N/A';
        const langColorClass = languageColorMap[language] || languageColorMap['default'];

        repoCard.innerHTML = `
            <div>
                <h3 class="text-2xl font-semibold mb-3">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="text-accent-color hover:text-white transition duration-200">
                        ${repo.name}
                    </a>
                </h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-3">${description}</p>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center text-sm">
                <span class="px-3 py-1 rounded-full font-medium text-white ${langColorClass}">
                    ${language}
                </span>
                
                <div class="space-x-4 text-gray-400">
                    <span title="Csillagok száma">
                        <i class="fas fa-star mr-1 text-yellow-400"></i> ${repo.stargazers_count}
                    </span>
                    <span title="Utolsó frissítés">
                        <i class="fas fa-calendar-alt mr-1"></i> ${lastUpdated}
                    </span>
                </div>
            </div>
        `;

        return repoCard;
    }

    fetch(apiURL)
        .then(response => {
            if (!response.ok) throw new Error(`API Hiba: ${response.status}`);
            return response.json();
        })
        .then(repositories => {
            if (loadingMessage) loadingMessage.remove();

            if (repositories.length === 0) {
                repoListElement.innerHTML = '<p class="col-span-full text-center text-gray-400">Nincsenek publikus repository-k a megjelenítéshez.</p>';
                return;
            }

            repositories.forEach(repo => {
                repoListElement.appendChild(createRepoCard(repo));
            });
        })
        .catch(error => {
            console.error('Hiba történt a repository-k betöltésekor:', error);
            if (loadingMessage) loadingMessage.remove();
            repoListElement.innerHTML = `<p class="col-span-full text-center p-10 text-red-500">Hiba a betöltés közben. Ellenőrizd a konzolt! (${error.message})</p>`;
        });
});
