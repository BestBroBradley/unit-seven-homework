var generateHTML = {
  colors: {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
},

makeMyHTML: function makeMyHTML (data, color, stars) {
  color = color.toLowerCase();
  return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
      <script src="https://kit.fontawesome.com/8199e8ad2b.js" crossorigin="anonymous"></script>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${this.colors[color].wrapperBackground};
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 80px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         text-align: center;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${this.colors[color].headerBackground};
         color: ${this.colors[color].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${this.colors[color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 7px 50px 50px 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${this.colors[color].headerBackground};
           color: ${this.colors[color].headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
         footer {
          background-color: #E9EDEE;
          height: auto;
          padding-top: 200px;
         }
      </style>
      </head>
      <body>
    <main>
        <div>
            <div class="photo-header">
                <img src=${data.data.avatar_url}>
                <h1>Hi!</h1>
                <h2>My name is ${data.data.name}!</h2>
                <div class="links-nav">
                    <h5><i class="far fa-building"></i> Currently @ ${data.data.company}</h5>
                    <h6 class="nav-link"><i class="fas fa-compass"></i> ${data.data.location}</h6>
                    <a href="${data.data.html_url}"><h6 class="nav-link"><i class="fab fa-github"></i> GitHub</h6></a>
                    <a href="${data.data.blog}"><h6 class="nav-link"><i class="fas fa-rss"></i> Blog</h6></a>
                </div>
            </div>
            <div class="wrapper">
                <h3>${data.data.bio}</h3>
                <div class="container">
                <div class="row">
                <div class="col">
                    <h3 class="card">Public Repositories<br><span id="pubRepos">${data.data.public_repos}</span></h3>
                </div>
                <div class="col">
                    <h3 class="card">Followers<br><span id="followers">${data.data.followers}</span></h3>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <h3 class="card">GitHub Stars<br><span id="ghStars">${stars}</span></h3>
                </div>
                <div class="col">
                    <h3 class="card">Following<br><span id="following">${data.data.following}</span></h3>
                </div>
            </div>
                </div>
            </div>
        </div>
    </main>
    <footer>
    </footer>
</body>
</html`
}
}

module.exports = generateHTML
