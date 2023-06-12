const urlPageTitle = "JS SPA Routing";

document.addEventListener('click', (event) => {
    const {target} = event;
    if(!target.matches('nav a')) {
        return;
    }
    event.preventDefault();
    urlRoute();
});

const urlRoutes = {
    "/": {
        template: "/templates/home.html",
        title: "home | " + urlPageTitle,
        description: 'This is the home page'
    },
    "/about": {
        template: "/templates/about.html",
        title: "about | " + urlPageTitle,
        description: 'This is the about page'
    },
    "/contact": {
        template: "/templates/contact.html",
        title: "contact | " + urlPageTitle,
        description: 'This is the contact page'
    },
    404: {
        template: "/templates/404.html",
        title: "404 | " + urlPageTitle,
        description: 'Page not found'
    }
}

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
}

const urlLocationHandler = async () => {
    const location = window.location.pathname;
    // sets default page to home 
    if(location.length == 0) {
        location = "/"
    }

    const route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById('content').innerHTML = html;
    document.title = route.title;
    document
        .querySelector('meta[name="description"]')
        .setAttribute('content', route.description);
};

window.onpopstate = urlLocationHandler();
window.route = urlRoute;

urlLocationHandler();