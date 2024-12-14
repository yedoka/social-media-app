## Review
0. create new branch to fix all these comments, push this branch and open Pull request
1. move components below from pages to components folder:
  auth/forms/**
2. create components for pages for signIn and signUp
3. remove console.logs when you are pushing something into master or giving it to review
4. move protected routes component from constants to components
5. go through all files names and use single naming convention
6. Add configuration for eslint so that examples below would go in the way as it is shown
  From:
  name={"John Smith"}
  To:
  name="John Smith"
7. extract pages from the folder pages/root to pages/
8. extract all interactions with the firebase to separate folder/file.ts
9. feed.tsx: line 32
  you shouldn't make mutations on the data which you received from the backend, just pull, store and use. If you need any kind of manipulations, then you have to change the way how you are storing the data in the backend(schema).
10. variables.scss:
  remove all unnecessary comments
11. global.scss, do not style the body tag, create layout instead
12. add aliases in the application so that you could import any component like:
  "@/components/ComponentName.tsx"
  instead of:
  "../../components/ComponentName.tsx"
13. review the naming conventions for the variables, function and etc. in the application so that you have consistent naming conventions:
unauthenticate -> unAuthenticate
14. review the files and fix the typescript errors in all files
15. do not make computations in the template like in the signUp.tsx:
  {...register("passwordConfirmation", {
            required: "Password confirmation is required",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
16. (Optional): add key into element of the route auth: boolean and do not wrap the components manually, but do it automatically
17. when you are giving something to review do not leave console.logs and commented code like in ProtectedRoute
18. Button.tsx check if everything is correct:
@use '../../styles//variables.scss';
19. UserData.tsx:
{`Current user: ${auth.currentUser?.email}`} -> Current user: {auth.currentUser?.email}
