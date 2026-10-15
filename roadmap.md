# Roadmap

## What this is
A study task list for linguistics students, living on Nataniel Balantac's personal site. Each task is tagged with the linguistics subfield it belongs to, so I can see which subfield I have been avoiding.

## What Done means
A stranger opens the site, clicks Study tasks, creates an account with an email and a password, adds a task such as "Transcribe the market recording" tagged Phonetics, closes the tab, comes back the next day, logs in, and finds the task still there. Above the list they see how many open tasks each subfield has, and any subfield with none says "Nothing planned". Nobody else can see their tasks.

## Slices
1. Sign up and log in | done-criteria: On /login I enter a new email and a password, click Create account, and land on /tasks, which says "Signed in as" and that email. I click Log out and land on /login, and opening /tasks sends me back to /login. I log in with the same email and password and land on /tasks again. I log in with a wrong password and stay on /login with Supabase's error message shown on the page. | status: ACTIVE
2. Save tasks tagged by subfield | done-criteria: On /tasks I type "Read chapter 4 of the syntax textbook", choose Syntax, click Add task, and it appears at the top of the list with a Syntax label. I reload the page and the task is still there. I tick the task's checkbox, reload, and it is still ticked. In a private window I make a second account, and its /tasks list is empty. | status: pending
3. Which subfield am I avoiding | done-criteria: With two open Syntax tasks and one open Phonetics task, the strip above the list shows Syntax 2, Phonetics 1, and every other subfield 0 with the words Nothing planned. I tick off one Syntax task and Syntax drops to 1. I click Phonetics in the strip and only Phonetics tasks show; I click All and every task shows again. Should not: a second account's tasks never change my counts. | status: pending

Subfields are a fixed list: Phonetics, Phonology, Morphology, Syntax, Semantics, Pragmatics, Sociolinguistics, Fieldwork.

## Backlog
- Due dates, with overdue tasks marked Overdue
- Editing a task's text after it is saved
- Deleting tasks
- Adding my own subfields beyond the fixed list
- Password reset by email
- Email confirmation on sign-up (needs a paid email service)
- Priority: low, normal, high
- A page showing what I finished each week
