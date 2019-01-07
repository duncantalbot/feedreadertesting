/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    //RSS Feeds test suite
    describe('RSS Feeds', function() {

        // Tests to make sure that the allFeeds variable has been defined and that it is not empty.=
        it('Feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test each rss feed element to ensure has a url and not empty
        it('Feeds urls are defined', function() {
            //Checks all feeds have a url based on length
            for (let feedURLS of allFeeds) {
                expect(feedURLS.url).toBeDefined();
                expect(feedURLS.url.length).not.toBe(0);
            }
        });

        // Test each rss feed element to ensure has a name and not empty
        it('Feeds names are defined', function() {
            //Checks all feeds have a name based on length
            for (let feedNames of allFeeds) {
                expect(feedNames.name).toBeDefined();
                expect(feedNames.name.length).not.toBe(0);
            }
        });
    });

    // Menu test suite
    describe('The menu', function() {

        // Test ensures the menu element is hidden by default.
        it('Menu hidden by default', function() {
            let feedBody = document.querySelector('body');
            //Checks for menu-hidden class applied to body by default
            expect(feedBody.classList.contains('menu-hidden')).toBe(true);
        });

        // Test ensures the menu changes visibility when the menu icon is clicked.
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

    // Initial Entries test suite
    describe('Initial Entries', function() {

        //Test ensures there is at least one feed (entry) loaded
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('Completes load feed. Has at least single entry', function() {
            //Gets feedlist and checks more than 1 feed loaded
            const feedList = $('.feed .entry');
            expect(feedList.length).toBeGreaterThan(0);
        });
    });

    // New Feed Selection test suite
    describe('New Feed Selection', function() {

        // Test ensures when feed loads new content actually changes
        const newFeed = document.querySelector('.feed');
        let feedLoad1, feedLoad2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                //Gets first feed list
                feedLoad1 = newFeed.innerHTML;
                loadFeed(1, function() {
                    //Gets second feed change list
                    feedLoad2 = newFeed.innerHTML;
                    done();
                });
            });
        });

        it('Feed load changes', function() {
            //Checks lists different to confirm change
            expect(feedLoad1 === feedLoad2).toBe(false);
        });
    });

}());
