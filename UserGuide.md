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

## Part 2: Staff-answered threads (topic list / filters)

Staff-answered threads are only visible at the topic-list level: category pages, recent, and unread. A topic is “staff-answered” if an administrator created it or replied in it. If staff delete their reply (and no other staff post remains), the topic is no longer staff-answered. Students can see which topics have staff input and filter to only those.

### Acceptance Criteria
1. **Staff-answered flag** - When an admin creates a topic or replies/posts in any topic, that topic is marked staff-answered. Non-admin won't be able do trigger the flag.
2. **Persistence** – Once a topic is staff-answered, it remains so until an admin deletes their reply, and if that was the only staff post in the topic, the topic is no longer staff-answered. If the topic was created by an admin (or another staff post remains), it stays staff-answered. Restoring a staff reply makes the topic staff-answered again.
4. **Indicator in topic lists** – In category, recent, and unread lists, staff-answered topics show an orange “Staff Answered” badge/indicator so students can spot them at a glance.
5. **Category/unread filter** – On a category or unread page a “Staff Answered” filter is available; selecting it shows only staff-answered topics in that category.
7. **Non–staff-answered topics unchanged** – Topics that never had staff creation or reply have no indicator and are excluded when the staff-answered filter is applied.

### How to Test
1. Log in as an admin and create a new topic in a category. Open that category and confirm the topic shows the “Staff Answered” indicator.
2. Log in as a regular user and create a topic in the same category. Confirm it does **not** show the Staff Answered indicator.
3. As the regular user, reply in the topic they created. Confirm it still does not show the indicator. Log in as admin and reply in that same topic; confirm it **now** shows the indicator.
4. On the category page, use the filter dropdown and choose “Staff Answered”. Confirm only staff-answered topics are listed.
5. As a user with some unread topics (including at least one staff-answered and one not), go to the unread page and apply the “Staff Answered” filter. Confirm only staff-answered unread topics appear, and the count matches.
6. In a topic that became staff-answered by an admin reply, have the admin delete that reply; confirm the topic no longer shows the indicator. Have the admin restore the reply; confirm it shows again. If the topic was created by admin, delete only the admin’s reply (not the main post) and confirm the topic stays staff-answered.
7. Confirm that topics with no staff involvement look and behave as before (no badge, not included in the staff-answered filter).

### Automated Test
- Tests are in: `test/topics.js` and `test/user.js`. Search for `describe('staff-answered thread'` in `test/topics.js` to find the staff-answered tests.
- Run this command in the terminal to see all staff-answered topic tests pass: `./node_modules/.bin/mocha test/topics.js --grep "staff-answered thread"` (13 tests).
- Run the unread-counts test that includes staff-answered: `./node_modules/.bin/mocha test/user.js --grep "unread counts"`.
- The 13 topic tests cover: admin-created topic marked staff-answered, non-admin created not marked, admin reply sets staff-answered, non-admin reply does not, persistence after non-admin reply, unset when admin deletes their reply (only staff post), unset when admin deletes their reply (only staff post), stay staff-answered when admin deletes only their reply but topic was created by admin, set again when admin restores their deleted reply, `staffAnswered` in topic data from `getTopicsByTids`, global filter returns only staff-answered topics, category filter returns only staff-answered topic ids, and unread filter returns only staff-answered unread tids with correct count. The user test asserts `unreadCounts['staff-answered']` and `unreadStaffAnsweredTopicCount`. Every acceptance criterion has at least one corresponding test, including negative cases, so testing is complete.

# User Story 10:
[justin, aishani, mridula explain here delete this comment when u done]
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
