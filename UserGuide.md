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
[justin, aishani, mridula explain here delete this comment when u done]