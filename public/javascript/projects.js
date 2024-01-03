window.onload = function () {
  fetch("/api/projects")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((projects) => {
      const projectsContainer = document.getElementById("projectsContainer");

      projects.forEach((project) => {
        const projectCard = `
            <div class="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-bold mb-4">${project.title}</h3>
                    <div class="w-full h-56 animate-pulse rounded mb-4 image-loader gradient-iron" data-image="${
                      project.image
                    }"></div>
                    <p>${project.description}</p>
                    <ul class="mt-2 mb-4">
                        ${project.techStack
                          .map(
                            (tech) =>
                              `<li class="inline-block text-white px-2 py-1 rounded mr-2 mt-2 tag">${tech}</li>`
                          )
                          .join("")}
                    </ul>
                </div>
                <div class="mt-4 flex justify-between">
                    <a href="${
                      project.github
                    }" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Github</a>
                    <a href="${
                      project.deployed
                    }" class="text-green-500 hover:underline" target="_blank" rel="noopener noreferrer">Live Version</a>
                </div>
            </div>
            `;
        projectsContainer.innerHTML += projectCard;
      });

      document.querySelectorAll(".image-loader").forEach((loader) => {
        const imgSrc = loader.getAttribute("data-image");
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
          loader.style.background = `url('${imgSrc}') no-repeat center/cover`;
          loader.classList.remove("bg-gray-300", "animate-pulse");
        };
      });
    })
    .catch((error) => {
      console.error("Failed to load projects:", error);
      const projectsContainer = document.getElementById("projectsContainer");
      projectsContainer.innerHTML = `
            <div class="text-center py-4 lg:px-4">
                <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">Error</span>
                    <span class="font-semibold mr-2 text-left flex-auto">Failed to load projects, please try again later.</span>
                </div>
            </div>
        `;
    });
};
