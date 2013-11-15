## Kodama

An Express framework and streaming API proxy for Backbone

### Installation

1. $ brew install node
2. $ git clone git@github.com:204NoContent/kodama.git
3. $ cd kodama
4. $ npm install
5. $ node app.js

### Running tests

$ test/run

### Embedded JavaScript
#### Server side
Server side embedded JavaScript (ejs) can be used in the following locations:
* views/
* client/javascripts/templates/
* client/stylesheets/

Open: <%  
Close: %>

Evaluate: <%  
Interpolate: <%-  
Html Escape: <%=  

Newline slurp: -%>

#### Client side
Client side embedded JavaScript (_.template) can be used in the following location:
* client/javascripts/templates/

Open: [[  
Close: ]]

Evaluate: [[  
Interpolate: [[-  
Html Escape: [[=  

### Philosophy

Kodama was created to efficiently bootstrap Backbone apps.  Baked into backbone is the notion of data synchronization with a CRUD API using standard HTTP verbs. Once a Backbone app is up and running, communicating with this API is dead simple using Backbone's built in model and collection methods. Once Backbone is sending and receiving data from the API, Backbone is a capable client side framework for routing, creating views, and manipulating client side data. The issue, then, is how to get the Backbone app off the ground in the first place.

Kodama aims to solve Backbone bootstrapping while maintaining a high performance API reverse proxy.

### HTML Requests

* Kodama renders and returns to the client a valid HTML document.
* Kodama queries the remote API and embeds any initial data in the  data attribute of the body tag, which allows Backbone to immediately render its templates upon page load without the need for a second request.
* Kodama includes a script tag for each javascript specified in config/client.json.
* Kodama renders javascript templates on the server and ships them to the client as invokable functions.
* Kodama compiles scss into css and links to the compiled stylesheet in the head.
* Kodama allows for server side html with embedded javascript.

### API Requests

* Kodama acts as a reverse proxy for the remote API, streaming both the request to the API and the response from the API directly to the client.
* Kodama authenticates itself by inserting credentials in the request header.

### Environments
#### Development (default): $ node app.js

* Changes to any file in the "client" directory will be reflected on browser refresh.
* Javascript templates and scss stylesheets are recompiled on each HTML request.

#### Production: $ NODE_ENV=production node app.js

* Javascripts, including templates, are compiled and minified
* Stylesheets are compiled and minified
* Images, minified application stylesheet, and minified application javascript file all receive md5 hashed names which allows for far future expiry cache headers.
* Both server side and client side javascript templates automatically convert images created with imageTag() to their md5 equivalent names before rendering.
* Server side views are cached.

### Request Response Path

1. Client initiates request
2. kodama/app.js calls kodama/routes.js and passes the server
3. route() matches the request path and calls the appropriate controller, e.g. "pages.index" which references kodama/controllers/pages.js
4. The controller handles the request by retrieving any necessary data from the API and subsequently renders the appropriate server side view, e.g. kodama/views/pages/index.ejs.  Note: that the controller must specify "title", "controller", and "action" as options.
5. The view template is then rendered and any embedded javascript is evaluated. Note: the view must contain a layout in order to be a valid html document, e.g. <% layout('../layouts/application') -%>, which references kodama/layouts/application.
6. The response is sent back to the client
7. On the client side, init.js will kick things off for backbone

### Examples
#### Server side view rendering and client templating (http://localhost:8888)

1. kodama/routes.js matches '/' and calls pages.index
2. kodama/controllers/pages.js index() renders kodama/views/pages/about.ejs passing the mandatory options, title, controller, and action. Also, passed to the view is some data called "greetings".
3. kodama/views/pages/index.ejs includes the application layout in order to produce the valid html scaffold and also include the header and footer on the server side. The view also creates an image tag, uses ejs to iterate over the greetings, calling the greeting partial for each. Finally, the view creates a tag called '.dynamic-content' in order to give backbone a place to put its content. The view is then sent to the client.
4. The backbone router matches '/' and creates a new PagesIndexView
5. The index view renders the 'pages/index' template which has [[ ]] style embedded client side javascript, as well as <% %> style embedded server side javascript.

#### Minimal server side view rendering (http://localhost:8888/about)

1. kodama/routes.js matches '/about' and calls pages.about
2. kodama/controllers/pages.js about() renders kodama/views/pages/about.ejs passing the mandatory options, title, controller, and action.
3. The server side view includes only the minimal layout and the response is sent to the client.
4. The backbone router matches '/about' and creates a new application layout, kodama/client/javascripts/views/layouts/application-view.js, which is a convenience view that renders the application header before the page content, and the application footer after the page content.
5. The application layout view automatically creates a new view corresponding to "ControllerActionView", which in this case is "PagesAboutView".
6. The pages about view renders its template "pages/about" found at kodama/javascripts/templates/pages/about.jst, and the result is used as the html for the view's $el.  Note: when using the application layout, the view's $el will be the tag corresponding to the main section with class .controller-action-container, which in this case is $('.pages-about-container').

#### Preloaded file data (http://localhost:8888/trains)

1. kodama/routes.js matches '/trains' and calls pages.trains
2. kodama/controllers/pages.js initializes and reads in the trains data from a filwe. trains() then renders kodama/views/pages/trains.ejs passing the mandatory options, title, controller, and action. In addition, the trains data is passed to the view. 
3. The server side view includes only the minimal layout, which automatically attaches the data to the body, and the response is sent to the client.
4. The backbone router matches '/trains' and creates a new application layout.
5. The application layout view automatically creates a new PagesTrainsView.
6. The pages trains view reads in the data from the body using $('#data').data('response'), and the renders its template "pages/trains" in the view's $el, which was set by the application layout to be $('.pages-trains-container').

#### Preloaded API data (http://localhost:8888/listings/123)

1. kodama/routes.js matches '/listings/:id' and calls listings.show
2. kodama/controllers/listings.js show() first issues a request to the API to fetch the appropriate listing data. When the request is fulfilled by the API, the view kodama/views/listings/show.ejs is rendered, passing the mandatory options, title, controller, and action. In addition the API response data is passed to the view.
3. The server side view includes only the minimal layout, which automatically attaches the data to the body, and the response is sent to the client.
4. The backbone router matches 'listings/:id' and creates a new application layout.
5. The application layout view automatically creates a new ListingsShowView.
6. The listings show view reads in the data, and the renders its template "listings/show" in the view's $el, which was set by the application layout to be $('.listings-show-container').

#### Preloaded API data and API pagination calls (http://localhost:8888/listings)
1. kodama/routes.js matches '/listings' and calls listings.index
2. kodama/controllers/listings.js index() first issues a request to the API to fetch the appropriate listings index data. When the request is fulfilled by the API index() renders kodama/views/listings/index.ejs passing the mandatory options, title, controller, and action. In addition the API response data is passed to the view.
3. The server side view includes only the minimal layout, which automatically attaches the data to the body, and the response is sent to the client.
4. The backbone router matches 'listings' and creates a new application layout.
5. The application layout view automatically creates a new ListingsIndexView.
6. The listings index view reads in the data and renders its template "listings/index" in the view's $el, which was set by the application layout to be $('.listings-index-container'). In addition, the listings index view creates two subviews, ListingsListView and PaginationView, passing a reference to the listings collection to each subview.  The ListingsListView then creates a new ListingView for every listing in the listings collection, and attaches the rendered html to its own $el. Likewise, the PaginationView renders itself and sets up events that will trigger changes to the collection that was passed to it.

