/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('Feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Feeds urls are defined', function() {
            //Checks all feeds have a url based on length
            for (let feedURLS of allFeeds) {
                expect(feedURLS.url).toBeDefined();
                expect(feedURLS.url.length).not.toBe(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('Feeds names are defined', function() {
            //Checks all feeds have a name based on length
            for (let feedNames of allFeeds) {
                expect(feedNames.name).toBeDefined();
                expect(feedNames.name.length).not.toBe(0);
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Menu hidden by default', function() {
            let feedBody = document.querySelector('body');
            //Checks for menu-hidden class applied to body by default
            expect(feedBody.classList.contains('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('Menu click event toggles visibility', function() {
            //Gets body
            let feedBody = document.querySelector('body');
            //Gets menu icon by class
            let menuIconButton = document.querySelector('a.menu-icon-link');
            //First click checks visible
            menuIconButton.click();
            expect(feedBody.classList.contains('menu-hidden')).toBe(false);
            //Second click checks hidden
            menuIconButton.click();
            expect(feedBody.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('Completes load feed. Has at least single entry', function() {
            //Gets feedlist and checks more than 1 feed loaded
            const feedList = document.querySelector('.feed');
            expect(feedList.children.length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        const newFeed = document.querySelector('.feed');
        let feedLoad1, feedLoad2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                //Gets first feed list
                feedLoad1 = newFeed.innerHTML;
                done();
            });

            loadFeed(1, function(){
                //Gets second feed change list
                feedLoad2 = newFeed.innerHTML;
                done();
            });
        });

        it('Feed load changes', function() {
            //Checks lists different to confirm change
            expect(feedLoad1 === feedLoad2).toBe(false);
        });
    });

}());
