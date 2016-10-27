## Angular, Express, EJS, Single Page Application SEO Example.

#### dependancies:

angular, angular-route, express, ejs

#### run:
```npm install```, ```npm start```

#### Description
We want our single page application to look like a multi page web site to search engines, with each view providing it's own indexable metadata. We also want to use standard url format for links that can be indexed in search engines and provide platform mobility as well as backwards compatability with existing search index links, "http://mysite/profile" instead of "http://mysite/#profile".

Starting here <a href="http://bnlconsulting.com/blog/dynamic-metadata-in-angularjs">dynamic-metadata-in-angularjs</a>, the metaproperty directive is perfect for changing metadata within our application when views change on the client, which is good for bookmarking and link sharing, but when it comes to search indexing what matters is the initial meta properties of the HTML document even before the page renders in a browser, so we need a server side solution as well.

In this example I use Express and EJS to demonstrate the basic server side logic then JSON as a common source for our metadata that is shared between the client side view change handler and the server http request hander.
