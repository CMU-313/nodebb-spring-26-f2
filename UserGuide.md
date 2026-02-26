# User Story 5: Staff Flair for Course Staff Posts
As a staff member, I want to have a special flair on my responses, so that students can easily identify authoritative answers from course staff.

## Part 1: All the features in part 1 are only seen when you click into a specific topic/announcement/discussion 

### Acceptance Criteria 
1. Admin name display shows visual prefix - when admin posts/replies, their name when seen inside a topic has a 🔴 [STAFF] prefix so students can immediately identify staff
2. STAFF badge - red STAFF badge appears next to the admin name
3. VERIFIED badge - red VERIFIED badge appears next to the admin name
4. Profile picture background color changes to red 
5. Non-admin posts are unaffected
6. Admin profile picture is unaffected on other pages such as home page 

### How to Test
1. Log in as an admin and make a post/reply inside any topic.
2. Confirm the username shows 🔴 [STAFF], STAFF and VERIFIED badges are visible, and profile picture background is red (if the current pfp is the default one). 
3. Go to the home page as admin and confirm the profile color looks normal there.
4. Log in as a regular user, make a response, and confirm that post/reply have no badges or prefix.

### Automated Test
- Tests are in: `test/posts.js` AND Search for `describe('staff flair'` to find the specific tests I added
- Run this command in terminal to see that all 8 tests passing: `./node_modules/.bin/mocha test/posts.js --grep "staff flair"`
- 8 tests cover: admin username prefix, admin displayname prefix, red pfp color, STAFF badge, VERIFIED badge, non-admin username unaffected, non-admin badges unaffected, and guest unaffected. 
- Every acceptance criterion has at least one test, with negative cases confirming no unintended side effects, so testing is complete. 

## Part 2: Home screen [roger explain ur part here and below]

# User Story 10: 
# User Guide: Category-Specific Tag Counts

## Feature Overview
This feature enhances the Category page by providing context-aware tag statistics. Previously, tags displayed on a category page showed the "Global Count" (how many times that tag exists across the entire forum). 

With this update, when a user visits a specific category (e.g., "General Discussion"), the tags associated with those topics will display a count representing only the number of times that tag appears within that specific category.

## How to Test
Ensure you have at least two categories available (e.g.,General Discussion and Announcements).
Step A: Navigate to the Announcements category. Create 2 new topics and give them both the tag “important”.
Step B: Navigate to the General Discussion category. Create 1 new topic and give it the same tag “important”.

### 3. Verifying the Feature
View Announcements: Navigate to the Announcements category page. Click on tags to see that the “important” tag displays a count of 2.
View General Discussion: Navigate to the General Discussion category page. Click on tags to see that the “important” tag displays a count of 1.
Verify Global Logic: Navigate to the global Tags page (/tags). The “important” tag should still show its global total (3), confirming the new logic is correctly localized to the Category controller.

## Automated Test
Tests are in `test/categories.js` and search `describe('getTagTopicCountInCategory` to find the specific tests that were addded 
Tests cover: 
Category Data Attachment
Verifies that the categoryController correctly attaches countInCategory for each tag in a category. This ensures the API response includes per-category topic counts for tags.

Tag Isolation Across Categories
Creates topics with the same tag in two different categories and asserts that getTagTopicCountInCategory returns distinct counts for each category. 

Case-Insensitivity Check
Confirms that tag counting is case-insensitive, so counts are accurate regardless of input case.

Empty State Handling
Ensures that if a tag exists globally but has no topics in the current category, getTagTopicCountInCategory returns 0 instead of an error or the total global count.

Single Topic Counting
Validates that the function correctly returns 1 when exactly one topic in a category has the tag.

Multiple Topic Counting
Verifies that multiple topics in the same category sharing a tag are counted correctly. 

### Why these tests are sufficient
These tests cover the full request to response lifecycle of the feature. By mocking multiple categories and verifying that the tag counts do not leak from one category to another, we ensure the filtering logic is robust. 