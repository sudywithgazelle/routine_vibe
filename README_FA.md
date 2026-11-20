# routine_vibe — Study With Gazelle

This build adds the avatar system to the starter app:
- First login requires choosing one of the two starter avatars (girl or boy).
- The supplied avatar designs are split into eight individual image files.
- Day 3 and day 5 avatars are grayscale until unlocked and show progress bars.
- The Day 7 crown avatar shows the small gold lock while unavailable.
- A study day is recorded once per UTC date when a focus timer completes.
- Burgundy and Old Money/Navy appearance swatches are visible but locked/disabled.

## Before publishing
1. In the NEW Supabase project, run `supabase/avatar_upgrade.sql` once in SQL Editor.
2. In `index.html`, replace `YOUR_NEW_SUPABASE_PROJECT_URL` and `YOUR_NEW_SUPABASE_PUBLISHABLE_KEY` with the new Project URL and Publishable key.
3. Deploy `supabase/functions/auth-username-login` to this same new Supabase project if username login is needed.
4. Upload `index.html`, the entire `assets` folder, and the `supabase` folder to the root of the `routine_vibe` GitHub repository.

Do not rerun the original setup SQL. Never put a service-role key in the frontend. Do not change the old Supabase project or old repository.
